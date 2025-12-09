<template>
	<view class="page-wrap page-gradient-bg" style="height: 100vh;">
		<u-navbar :fixed="true" title="" :placeholder="true" bgColor="rgba(255, 255, 255, 0)" :autoBack="true">
			<view slot='center' class="font-18 font-weight-medium" style="color: #000;">
				聊天大厅
			</view>
		</u-navbar>
		<view class="" style="overflow: hidden;" :style="{ height:  scrollHeight + 'px'}">
			<scroll-view scroll-y="true" :scroll-into-view="scrollIntoViewId" :style="{height: scrollHeight + 'px'}" @scrolltolower="scrolltolower" @scroll="scroll">
				<view v-for="(item,index) in datas" :key="index" style="width: 100vw;" :id="`segmentItem${index}`">
					<!-- 时间 -->
					<view v-if="index % 5 == 0" class="flex-row-center" style="width: 100%;">
						<view class="" style="color: #529742; font-size: 12px;">
							{{ '2012-12-12 12:12:12' }}
						</view>
					</view>
					<view class="flex-row" :class="[index % 2 == 0 && 'flex-row-reverse']" style="margin: 10px;">
						<view class="">
							<image src="/static/success_icon.png" style="width: 30px; height: 30px; min-width: 30px; min-height: 30px;"></image>
						</view>
						<view  class="" style="max-width: calc(100% - 100px); padding: 10px; background-color: #fff;   margin-top: 5px;" :style="{
							marginLeft: index % 2 == 0 ? '' : '15px',
							marginRight: index % 2 == 0 ? '15px' : '',
							borderRadius: index % 2 == 0 ? '10px 0px 10px 10px' : '0px 10px 10px 10px',
							boxShadow: index % 2 == 0 ? '-4px 3px 2px -1px rgba(0,0,0,0.1)' : '4px 3px 2px -1px rgba(0,0,0,0.1)'
						}">
							{{ item }}
						</view>
					</view>
				</view>
				<view class="width-100vw" style="height: 15px;">
					
				</view>
			</scroll-view>
			
		</view>
		<view class="flex-column " style="box-shadow: 0px -3px 2px -1px rgba(82,151,66,0.1); background-color: #ECF2F0; position: fixed; left: 0; bottom: 0; right: 0;" :style="{height: inputBoxHeight + 'px'}">
			<view class="flex-row flex-items-end flex-between" style=" width: 100%; ">
				<textarea v-model="msg" style="margin: 10px; background-color: white; padding: 10px;  border-radius: 5px;" placeholder="请输入"
					placeholder-style="color: #529742; font-weight: 500;" :auto-height="true" :maxlength="-1"
					@linechange="linechange" />
				<view class="flex-row-center" style="margin-right: 10px; margin-bottom: 15px; height: 30px; border-radius: 4px; background-color: #529742; color: white; font-size: 14px; width: 50px;">
					发送
				</view>
			</view>
			<view class="" style="width: 100%;" :style="{height: safeBottomHeight + 'px'}">
			
			</view>
		</view>
	</view>
</template>

<script>
	import base from '@/mixins/base'
	export default {
		mixins: [base],
		data() {
			return {
				msg: '',
				textAreaHeight: 43,
				datas: [],
				timer: null,
				scrollIntoViewId: '',
				isBottom: false,
			}
		},
		computed: {
			safeBottomHeight() {
				const sys = uni.$u.sys()
				return sys.safeAreaInsets.bottom
			},
			inputBoxHeight() {
				return this.safeBottomHeight + 20 + this.textAreaHeight + 20
			},
			scrollHeight() {
				return this.pageHeight - this.inputBoxHeight
			}
		},
		onLoad() {
			
		},
		
		onShow() {
			this.getChatList()
			if (!this.timer) {
				this.timer = setInterval(() => {
					this.getChatList()
				}, 3000)
			}
			
		},
		
		onHide() {
			clearInterval(this.timer)
			this.timer = null
		},
		
		onUnload() {
			clearInterval(this.timer)
			this.timer = null
		},
		
		methods: {
			scrolltolower() {
				// console.log('xxxxxxxx')
				this.isBottom = true
			},
			scroll(event) {
				// 获取scroll-view的总高度
				const scrollViewHeight = event.detail.height;
				// 获取scroll-view的当前滚动位置
				const scrollTop = event.detail.scrollTop;
				// 获取scroll-view的内容高度
				const contentHeight = event.detail.scrollHeight;
			
				// 判断是否滚动到底部
				const isBottom = scrollTop + this.scrollHeight >= contentHeight;
				// console.log(event.detail)
				// console.log(this.contentHeight)
				// console.log('是否滚动到底部:', isBottom);
				this.isBottom = isBottom
			},
			getChatList() {
				const tempList = ['fh', 'ajdlkajdlkajd', '房间里看技术开发建设的', 'afkjlkjdj', '房间里看技术开发建设的房间里看技术开发建设的房间里看技术开发建设的',
				'房间里看技术开发建设的房间里看技术开发建设的房间里看技术开发建设的房间里看技术开发建设的房间里看技术开发建设的房间里看技术开发建设的房间里看技术开发建设的房间里看技术开发建设的',
				'as', '12', 'fh', 'ajdlkajdlkajd', '房间里看技术开发建设的', 'afkjlkjdj', '房间里看技术开发建设的房间里看技术开发建设的房间里看技术开发建设的',
				'房间里看技术开发建设的房间里看技术开发建设的房间里看技术开发建设的房间里看技术开发建设的房间里看技术开发建设的房间里看技术开发建设的房间里看技术开发建设的房间里看技术开发建设的',
				'as', '12']
				let isScroll = this.datas.length == 0
				this.datas = this.datas.concat(tempList).concat(tempList)
				let that = this
				if (this.isBottom || isScroll) {
					this.$nextTick(() => {
						that.scrollIntoViewId = `segmentItem${that.datas.length - 1}`
						console.log('add')
					})
				}
			},
			linechange(e){
				this.textAreaHeight = e.detail.height
			}
		}
	}
</script>

<style scoped>

.left {
	position: relative;
}	


.left::before {
	content: '';
	position: absolute;
	left: -6px;
	top: 0px;
	width: 0px;
	height: 0px;
	/* background-color: red; */
	 border-style: solid;
	  /* 三角大小：边框宽度决定（8px） */
	  border-width: 10px 0px 10px 10px;
	  /* 三角颜色匹配提示框背景 */
	  border-color: #529742 transparent transparent transparent;
	  
}
	

</style>