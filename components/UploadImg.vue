<template>
	<u-upload :fileList="fileList1" @afterRead="afterRead" @delete="deletePic" name="1" :deletable="true"
		:maxCount="1" width="170" height="130">
		<image v-if="type==1" class="bg-1" src="@/static/img/my/sfz-1.png" mode=""></image>
		<image v-else-if="type==2" class="bg-1" src="@/static/img/my/sfz-2.png" mode=""></image>
		<!-- <image src="https://cdn.uviewui.com/uview/demo/upload/positive.png" 
			mode="widthFix" style="width: 250px;height: 150px;"></image> -->
		</u-upload>
</template>

<script>
	import {
		baseURL
	} from '@/config/base'
	import {
		pexUpload
	} from '@/config/api.js'
	export default {
		props: {
			type: {
				type: String,
				default: ''
			},
			uploadUrl: {
				type: String,
				default: ''
			}
		},
		data() {
			return {
				fileList1: []
			}
		},
		methods: {
			initFile(arr=[]){
				this.fileList1 = arr
			},
			// 删除图片
			deletePic(event) {
				this[`fileList${event.name}`].splice(event.index, 1)
				this.$emit('handleUpload', this.fileList1)
			},
			// 新增图片
			async afterRead(event) {
				// 当设置 multiple 为 true 时, file 为数组格式，否则为对象格式
				let lists = [].concat(event.file)
				let fileListLen = this[`fileList${event.name}`].length
				lists.map((item) => {
					this[`fileList${event.name}`].push({
						...item,
						status: 'uploading',
						message: '上传中'
					})
				})
				for (let i = 0; i < lists.length; i++) {
					const result = await this.uploadFilePromise(lists[i].url)
					console.log('==result==', result);
					let item = this[`fileList${event.name}`][fileListLen]
					this[`fileList${event.name}`].splice(fileListLen, 1, Object.assign(item, {
						status: 'success',
						message: '',
						url: result
					}))
					fileListLen++
				}
				console.log('====afterRead===', this.fileList1, event);
				this.$emit('handleUpload', this.fileList1)
			},
			uploadFilePromise(url) {
				return new Promise((resolve, reject) => {
					let a = uni.uploadFile({
						url: baseURL() + this.uploadUrl, // 仅为示例，非真实的接口地址
						filePath: url,
						name: 'file',
						formData: {
							user: 'test'
						},
						success: (res) => {
							const obj = JSON.parse(res.data)
							setTimeout(() => {
								resolve(obj.data)
							}, 1000)
						}
					});
				})
			},
		}

	}
</script>
<style lang="scss" scoped>
	.bg-1{
		width: 180px;
		height: 136px;
	}
</style>