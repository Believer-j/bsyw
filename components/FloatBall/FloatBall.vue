<template>
  <view
    class="float-ball"
    :class="{'float-ball-adsorbed': isAdsorbed}"
    :style="{
      left: position.x + 'px',
      top: position.y + 'px',
      zIndex: zIndex
    }"
    @touchstart="onTouchStart"
    @touchmove="onTouchMove"
    @touchend="onTouchEnd"
    @click="handleClick"
  >
    <slot>
      <!-- 默认内容 -->
      <view class="default-content">
        <text>浮</text>
      </view>
    </slot>
  </view>
</template>

<script>
export default {
  name: 'FloatBall',
  props: {
    // 初始位置
    initialPosition: {
      type: Object,
      default: () => ({ x: 0, y: 200 })
    },
    // 吸附距离（距离屏幕边缘多少像素时吸附）
    adsorbDistance: {
      type: Number,
      default: 10
    },
    // 是否开启吸附功能
    enableAdsorb: {
      type: Boolean,
      default: true
    },
    // z-index
    zIndex: {
      type: Number,
      default: 9999
    }
  },
  data() {
    return {
      position: { x: 0, y: 200 },
      startPosition: { x: 0, y: 0 },
      touchStartTime: 0,
      isDragging: false,
      isAdsorbed: false,
      systemInfo: null,
      ballSize: { width: 50, height: 50 } // 悬浮球默认尺寸
    }
  },
  mounted() {
    this.initPosition()
    this.getSystemInfo()
    
    // 监听窗口变化
    uni.onWindowResize && uni.onWindowResize(() => {
      this.getSystemInfo()
      this.checkBoundary()
    })
  },
  beforeDestroy() {
    // 移除监听
    uni.offWindowResize && uni.offWindowResize()
  },
  methods: {
    initPosition() {
      this.position = {
        x: this.initialPosition.x || 0,
        y: this.initialPosition.y || 200
      }
    },
    
    // 获取系统信息
    getSystemInfo() {
      const systemInfo = uni.getSystemInfoSync()
      this.systemInfo = systemInfo
      // 如果组件挂载后，重新计算边界
      this.$nextTick(() => {
        this.getBallSize()
        this.checkBoundary()
      })
    },
    
    // 获取悬浮球实际尺寸
    getBallSize() {
      const query = uni.createSelectorQuery().in(this)
      query.select('.float-ball').boundingClientRect(res => {
        if (res) {
          this.ballSize = {
            width: res.width || 50,
            height: res.height || 50
          }
        }
      }).exec()
    },
    
    onTouchStart(e) {
      this.startPosition = {
        x: this.position.x,
        y: this.position.y
      }
      this.touchStartTime = Date.now()
      this.isDragging = false
      this.isAdsorbed = false
      
      // 记录触摸点位置
      this.touchStart = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY
      }
    },
    
    onTouchMove(e) {
      if (!this.systemInfo) return
      
      const touch = e.touches[0]
      const deltaX = touch.clientX - this.touchStart.x
      const deltaY = touch.clientY - this.touchStart.y
      
      // 如果移动距离大于5px，认为是拖动而不是点击
      if (Math.abs(deltaX) > 5 || Math.abs(deltaY) > 5) {
        this.isDragging = true
        e.preventDefault() // 阻止默认滚动行为
      }
      
      if (this.isDragging) {
        // 计算新位置
        let newX = this.startPosition.x + deltaX
        let newY = this.startPosition.y + deltaY
        
        // 边界检查
        newX = Math.max(0, Math.min(newX, this.systemInfo.windowWidth - this.ballSize.width))
        newY = Math.max(0, Math.min(newY, this.systemInfo.windowHeight - this.ballSize.height))
        
        this.position = {
          x: newX,
          y: newY
        }
      }
    },
    
    onTouchEnd(e) {
      if (this.isDragging && this.enableAdsorb) {
        this.autoAdsorb()
      }
      this.isDragging = false
    },
    
    // 自动吸附到最近的一侧
    autoAdsorb() {
      if (!this.systemInfo) return
      
      const screenWidth = this.systemInfo.windowWidth
      const ballWidth = this.ballSize.width
      const ballHeight = this.ballSize.height
      const screenHeight = this.systemInfo.windowHeight
      
      // 计算距离左右边缘的距离
      const distanceToLeft = this.position.x
      const distanceToRight = screenWidth - this.position.x - ballWidth
      
      // 计算垂直边界（保持在屏幕内）
      let newY = this.position.y
      newY = Math.max(0, Math.min(newY, screenHeight - ballHeight))
      
      // 判断吸附到哪一侧
      if (distanceToLeft <= distanceToRight) {
        // 吸附到左侧
        this.position = {
          x: this.adsorbDistance,
          y: newY
        }
        this.$emit('adsorb', 'left')
      } else {
        // 吸附到右侧
        this.position = {
          x: screenWidth - ballWidth - this.adsorbDistance,
          y: newY
        }
        this.$emit('adsorb', 'right')
      }
      
      this.isAdsorbed = true
    },
    
    // 点击事件
    handleClick() {
      // 如果是拖动结束后的点击，不触发点击事件
      if (this.isDragging) return
      
      const clickDuration = Date.now() - this.touchStartTime
      // 点击时间小于300ms认为是点击而不是长按
      if (clickDuration < 300) {
        this.$emit('click')
      }
    },
    
    // 检查边界，确保悬浮球在屏幕内
    checkBoundary() {
      if (!this.systemInfo) return
      
      const screenWidth = this.systemInfo.windowWidth
      const screenHeight = this.systemInfo.windowHeight
      const ballWidth = this.ballSize.width
      const ballHeight = this.ballSize.height
      
      this.position.x = Math.max(0, Math.min(this.position.x, screenWidth - ballWidth))
      this.position.y = Math.max(0, Math.min(this.position.y, screenHeight - ballHeight))
    },
    
    // 外部调用方法：移动到指定位置
    moveTo(x, y) {
      this.position = { x, y }
      this.checkBoundary()
    },
    
    // 外部调用方法：显示/隐藏
    show() {
      this.position = { ...this.position }
      this.isAdsorbed = false
    },
    
    hide() {
      this.position = { x: -100, y: -100 }
    }
  }
}
</script>

<style scoped>
.float-ball {
  position: fixed;
  width: 100rpx;
  height: 100rpx;
  border-radius: 50%;
  background-color: rgba(0, 122, 255, 0.8);
  box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  /* 确保可触摸 */
  touch-action: none;
  user-select: none;
}

.float-ball-adsorbed {
  transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.float-ball:active {
  opacity: 0.8;
  transform: scale(0.95);
}

.default-content {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 32rpx;
}

/* 添加拖拽时的视觉反馈 */
.float-ball.dragging {
  box-shadow: 0 8rpx 32rpx rgba(0, 0, 0, 0.3);
  opacity: 0.9;
}
</style>