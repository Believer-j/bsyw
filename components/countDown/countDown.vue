<template>
	<view class="">
		<view class="circle" :style="[circle]">
			<view class="left" :style="[size]">
				<view class="left-circle" :style="[
						{'transform': rotatea},
						{'animation':is_reversal?stycircle2:stycircle1},
						{'transform': rotatea},
						{'animation-delay':is_reversal?0:animationDelay },
						{'animation-play-state':pause_text},
						{'-webkit-animation-play-state': pause_text},
						size,
						leftCircle,
						]">
				</view>
			</view>
			<view class="right" :style="[size]">
				<view class="right-circle" :style="[
						{'transform':is_reversal?rotatea:rotateb},
						{'animation':stycircle2},
						{'animation-delay': is_reversal?animationDelay:0},
						{'animation-play-state':pause_text},
						{'-webkit-animation-play-state': pause_text},
						size,
						rightcircle,]">
				</view>
			</view>
			<view class="inner" :style="[inner]">
				<slot></slot>
			</view>
			<view class="circle_line" :style="[scale]" v-if="isScale"></view>
		</view>
	</view>
</template>

<!-- #ifdef VUE3 -->
<!-- vue3 -->
<script lang="ts" setup>
	/*
		 * countDown 圆环计时器，不使用canvas,仅css实现,圆环中间支持自定义添加内容
		 *  @property {Number} times 时间 (单位毫秒)
		 * @property {Number} widths 圆环的总体大小 (单位upx)
		 * @property {Number} breadth 圆环中间区域的大小 (单位upx)
		 * @property {String} activeColor 圆环中间区域的背景色
		 * @property {String} defaultColor 圆环中间区域默认的背景颜色
		 * @property {Boolean} isScale 是否显示圆环刻度
		 * @property {Number} scaleNun 圆环刻度个数
		 * @property {Number} scaleAngle 圆环刻度角度值
		 * @property {Boolean} is_reversal 是否反转
		 */
	import { computed, nextTick, ref, onBeforeMount, defineProps, onMounted } from 'vue'

	const props = defineProps({
		times: {
			type: Number,
			default: () => 10000
		},
		widths: {
			type: Number,
			default: () => 200
		},
		breadth: {
			type: Number,
			default: () => 30
		},
		activeColor: {
			type: String,
			default: () => '#01B862'
		},
		defaultColor: {
			type: String,
			default: () => '#EDF0F0'
		},
		isScale: {
			type: Boolean,
			default: () => false,
		},
		scaleNun: {
			type: Number,
			default: () => 40
		},
		scaleAngle: {
			type: Number,
			default: () => 6
		},
		is_reversal: {
			type: Boolean,
			default: () => false
		},
	});

	const stycircle1 = ref({})
	const stycircle2 = ref({})
	const animationDelay = ref('0ms')
	const timer = ref(null)
	const timeAll = ref(0) //时间
	const pause_text = ref('paused') //暂停
	const finish = ref(false) //结束标识 true结束 false未开始
	const is_continue = ref(true) //结束标识 true可以继续 false已继续
	const rotatea = ref('rotate(180deg)')
	const rotateb = ref('rotate(-180deg)')

	const emit = defineEmits(['update:times', 'endTime', 'pauseNum']);

	onBeforeMount(() => { //销毁后
		clearInterval(timer.value)
	})
	onMounted(() => {
		timeAll.value = JSON.parse(JSON.stringify(props.times))
	})

	//开始事件
	const start = () => {
		console.log(finish.value);
		if (finish.value) {
			return
		}
		finish.value = true
		nextTick(() => {
			if (props.times < 1000) {
				uni.showToast({
					title: '时间最少1s',
					icon: 'none',
					duration: 1500,
					mask: true
				});
			} else {
				clearInterval(timer.value)
				let time = Number((props.times / 2).toFixed(2))
				stycircle2.value = `progross2 ${time}ms linear forwards`
				animationDelay.value = `${time}ms`
				stycircle1.value = `progross1 ${time}ms linear forwards`
				pause_text.value = 'running'
				setIn()
			}
		})
	};
	//计时器
	const setIn = (e ?: Boolean) => {
		timer.value = setInterval(() => {
			let times_num = props.times - 100
			emit('update:times', times_num)
			if (e) {
				pause_text.value = 'running'
			}
			if (props.times <= 100) {
				finish.value = true
				setTimeout(() => {
					emit('endTime');
					emit('update:times', timeAll.value)
				}, 100)
				clearInterval(timer.value)
			}
		}, 100)
	}

	//暂停
	const pause = () => {
		if (!finish.value) {
			return
		}
		pause_text.value = 'paused'
		is_continue.value = false

		clearInterval(timer.value)
		emit('pauseNum', props.times)
	}

	//继续
	const goOn = () => {
		if (is_continue.value) {
			return
		}
		is_continue.value = true
		setIn(true)
	}

	//重置
	const reset = () => {
		// console.log('重置');
		stycircle2.value = `progross 0s linear forwards`
		stycircle1.value = `progross 0s linear forwards`
		animationDelay.value = '0ms'
		clearInterval(timer.value)
		finish.value = false
		is_continue.value = true
		emit('update:times', timeAll.value)
	}

	//计算属性
	const circle = computed(() => {
		const { widths, defaultColor } = props
		return {
			width: `${widths}rpx`,
			height: `${widths}rpx`,
			background: defaultColor
		}
	})

	const size = computed(() => {
		const { widths } = props
		return {
			width: `${widths / 2 + 2}rpx`,
			height: `${widths + 2}rpx`
		}
	})

	const leftCircle = computed(() => {
		const { widths, activeColor } = props
		return {
			borderTopLeftRadius: `${widths}rpx`,
			borderBottomLeftRadius: `${widths}rpx`,
			background: activeColor
		}
	})

	const rightcircle = computed(() => {
		const { widths, activeColor } = props
		return {
			borderTopRightRadius: `${widths}rpx`,
			borderBottomRightRadius: `${widths}rpx`,
			background: activeColor
		}
	})

	const inner = computed(() => {
		const { widths, breadth } = props
		return {
			width: `${widths - breadth}rpx`,
			height: `${widths - breadth}rpx`,
		}
	})

	const scale = computed(() => {
		const { defaultColor, scaleNun, scaleAngle } = props
		return {
			background: `repeating-conic-gradient(${defaultColor} 0 ${scaleAngle}deg, rgba(0, 0, 0, 0) 0deg ${360 / scaleNun}deg)`
		}
	})

	defineExpose({
		start,
		pause,
		goOn,
		reset,
	})
</script>
<!-- #endif -->

<!-- #ifdef VUE2 -->
<!-- vue2 -->
<script>
	/*
	 * countDown 圆环计时器，不使用canvas,仅css实现,圆环中间支持自定义添加内容
	 *  @property {Number} times 时间 (单位毫秒)
	 * @property {Number} widths 圆环的总体大小 (单位upx)
	 * @property {Number} breadth 圆环中间区域的大小 (单位upx)
	 * @property {String} activeColor 圆环中间区域的背景色
	 * @property {String} defaultColor 圆环中间区域默认的背景颜色
	 * @property {Boolean} isScale 是否显示圆环刻度
	 * @property {Number} scaleNun 圆环刻度个数
	 * @property {Number} scaleAngle 圆环刻度角度值
	 * @property {Boolean} is_reversal 是否反转
	 */
	export default {
		props: {
			times: {
				type: Number,
				default: () => 10000
			},
			widths: {
				type: Number,
				default: () => 200
			},
			breadth: {
				type: Number,
				default: () => 30
			},
			activeColor: {
				type: String,
				default: () => '#01B862'
			},
			defaultColor: {
				type: String,
				default: () => '#EDF0F0'
			},
			isScale: {
				type: Boolean,
				default: () => false,
			},
			scaleNun: {
				type: Number,
				default: () => 40
			},
			scaleAngle: {
				type: Number,
				default: () => 6
			},
			is_reversal: {
				type: Boolean,
				default: () => false
			},
		},
		data() {
			return {
				stycircle1: {},
				stycircle2: {},
				animationDelay: 0,
				timer: null,
				timeAll: 0, //时间
				pause_text: 'paused', //暂停
				finish: false, //结束标识 true结束 false未开始
				is_continue: true, //结束标识 true可以继续 false已继续
				rotatea: 'rotate(180deg)',
				rotateb: 'rotate(-180deg)'
			}
		},
		beforeDestroy() { //销毁后
			clearInterval(this.timer)
		},
		mounted() {
			this.timeAll = JSON.parse(JSON.stringify(this.times))
		},

		methods: {
			start() { //开始事件
				if (this.finish) {
					return
				}
				this.finish = true
				this.$nextTick(() => {
					if (this.times < 1000) {
						uni.showToast({
							title: '时间最少1s',
							icon: 'none',
							duration: 1500,
							mask: true
						});
					} else {
						clearInterval(this.timer)
						let time = Number((this.times / 2).toFixed(2))
						this.stycircle2 = `progross2 ${time}ms linear forwards`
						this.animationDelay = `${time}ms`
						this.stycircle1 = `progross1 ${time}ms linear forwards`
						this.pause_text = 'running'
						this.setIn()
					}
				})
			},
			setIn(e) { //计时器
				this.timer = setInterval(() => {
					let times_num = this.times - 100
					const percent = times_num / this.times
					this.$emit('update:times', times_num)
					if (e) {
						this.pause_text = 'running'
					}
					if (this.times <= 100) {
						this.finish = true
						setTimeout(() => {
							console.log('===endTime===');
							this.$emit('endTime')
							this.$emit('update:times', this.timeAll)
						}, 100)
						clearInterval(this.timer)
					}
				}, 100)
			},
			pause() { //暂停
				if (!this.finish) {
					return
				}
				this.pause_text = 'paused'
				this.is_continue = false
				clearInterval(this.timer)
				this.$emit('pauseNum', this.times)
			},
			goOn() { //继续
				if (this.is_continue) {
					return
				}
				this.is_continue = true
				this.setIn(true)
			},
			reset() { //重置
				this.stycircle2 = `progross 0s linear forwards`
				this.stycircle1 = `progross 0s linear forwards`
				this.animationDelay = 0
				clearInterval(this.timer)
				this.finish = false
				this.is_continue = true
				this.$emit('update:times', this.timeAll)
			},
		},
		computed: {
			circle() {
				const {
					widths,
					defaultColor
				} = this
				return {
					width: `${widths}rpx`,
					height: `${widths}rpx`,
					background: defaultColor
				}
			},
			size() {
				const {
					widths
				} = this
				return {
					width: `${widths/2 + 2}rpx`,
					height: `${widths + 2}rpx`
				}
			},
			leftCircle() {
				const {
					widths,
					activeColor
				} = this
				return {
					borderTopLeftRadius: `${widths}rpx`,
					borderBottomLeftRadius: `${widths}rpx`,
					background: activeColor
				}
			},
			rightcircle() {
				const {
					widths,
					activeColor
				} = this
				return {
					borderTopRightRadius: `${widths}rpx`,
					borderBottomRightRadius: `${widths}rpx`,
					background: activeColor
				}
			},
			inner() {
				const {
					widths,
					breadth
				} = this
				return {
					width: `${widths - breadth  }rpx`,
					height: `${widths - breadth }rpx`,
				}
			},
			scale() {
				const {
					defaultColor,
					scaleNun,
					scaleAngle
				} = this
				return {
					background: `repeating-conic-gradient(${defaultColor} 0 ${scaleAngle}deg, rgba(0, 0, 0, 0) 0deg ${360 / scaleNun}deg)`
				}
			}
		}
	}
</script>
<!-- #endif -->

<style>
	.circle {
		border-radius: 50%;
		position: relative;
	}

	.circle_line {
		width: 100%;
		height: 100%;
		border-radius: 50%;
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		overflow: hidden;
	}

	.left,
	.right {
		position: absolute;
		overflow: hidden;
	}

	.left-circle {
		transition: all .5s;
		transform-origin: right center;
	}

	.right-circle {
		transition: all .5s;
		transform-origin: left center;
	}

	@keyframes progross1 {
		to {
			transform: rotate(360deg);
		}
	}

	@keyframes progross2 {
		to {
			transform: rotate(0deg);
		}
	}

	.right {
		right: 0;
	}

	.inner {
		background: #fff;
		position: absolute;
		z-index: 999;
		border-radius: 50%;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		border: 2upx solid #fff;
		overflow: hidden;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>