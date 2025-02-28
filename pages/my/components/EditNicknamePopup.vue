<template>
	<u-popup :show="show" mode="center" @close="close" @open="open" :closeOnClickOverlay="false" :round="16"
		class="transfer-popup" closeable>
		<view class="title">
			修改昵称
		</view>
		<view class="form-box">
			<view class="form-item form-item-bg">
				<view class="tag">
					昵称
				</view>
				<view class="form-item-content">
					<u--input class="account-input" placeholder="请输入呢称" border="none" v-model="form.nick">
					</u--input>
				</view>
			</view>
			<view class="form-item form-item-bg">
				<view class="tag">
					登录密码
				</view>
				<view class="form-item-content">
					<u--input class="account-input" type="password" placeholder="请输入登录密码" border="none" v-model="form.password">
					</u--input>
				</view>
			</view>
		</view>
		<view class="btns">
			<u-button text="取消" class="btn-2" size="large" @click="close"></u-button>
			<u-button type="primary" class="btn-1" style="background-color: #389838;" :disabled="hasSave" text="确认" size="large" @click="confirm"></u-button>
		</view>
	</u-popup>
</template>
<script>
	import base from '@/mixins/base.js'
  import {editUser} from '@/config/api.js'
	export default {
		mixins: [base],
		computed: {
			hasSave(){
				return !this.form.nick || !this.form.password
			}
		},
		data() {
			return {
				show: false,
				form: {
          password: undefined,
					nick: undefined
				},
				
			}
		},
		methods: {
			open() {
				this.form.nick = this.userInfo.nick
				this.show = true
			},
			async confirm(){
        try{
          const res = await editUser({
            "type": 1,
            "nick": this.form.nick,
            "password": this.form.password
          });
          uni.showToast({
            title: '修改成功!'
          });
          this.$store.dispatch('getUserInfo')
          this.close()
        }catch(e){
          //TODO handle the exception
        }
			},
			close() {
        this.form.password = undefined
        this.show = false
			}
		}
	}
</script>