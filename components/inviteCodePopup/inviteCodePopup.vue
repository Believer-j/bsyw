<template>
	<view>
		<!-- :show="$store.state.invitePopupShow" -->
		<u-popup :show="$store.state.invitePopupShow" round="10px" :closeOnClickOverlay="false" mode="center"
			class="my-popup">
			<view class="popup r-flex-column">
				<view class="invite-popup-title">
					<text>Bind Relationships</text>
				</view>
				<view class="input-amount" style="padding: 0 18px;">

					<u--input class="invite-code night-input" placeholder="Invitation Code" v-model="invitationCode" border="none"></u--input>

				</view>
				<view class="btns">
					<view class="my-btn-1" style="width: 100px;" @click="addInvitationCode">
						confirm
					</view>
				</view>

			</view>

		</u-popup>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	export default {
		name: "inviteCodePopup",
		data() {
			return {
				invitationCode: this.$store.state.invitationCode
			};
		},
		methods: {
			addInvitationCode() {
				if (!this.invitationCode) {
					this.$refs.uToast.show({
						message: 'Enter Invitation Code'
					})
					return false
				}
				this.$store.dispatch('bindInvitationCode', this.invitationCode)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.popup {
		border-radius: 10px;
		overflow: hidden;
		width: calc(100vw - 34px);
		background-size: 100% 100%;
		opacity: .9;
		padding: 16px 16px 20px 16px;

		.invite-popup-title {
			padding-bottom: 12px;
		}

		.invite-code {
			height: 44px;
		}

		.btns {
			display: flex;
			justify-content: center;
			padding-top: 16px;
		}
	}
</style>