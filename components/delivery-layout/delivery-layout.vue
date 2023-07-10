<template>
	<view class="delivery">
		<view class="title">外送</view>
		<view class="container">
			<view class="address-info" @click="addAddress">
				<view class="address-title">收货地址</view>
				<view class="address-content">
					<view v-if="deliveryInfo.address">
						<view class="detail-address">{{deliveryInfo.address}}</view>
						<view class="user-info">
							{{deliveryInfo.username + '-' + deliveryInfo.mobile}}
						</view>
					</view>
					<view v-else class="add-address-text">请添加收货地址</view>
				</view>
				<view class="address-edit">
					<u-icon name="arrow-right" color="#999" size="18"></u-icon>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"delivery-layout",
		data() {
			return {
				deliveryInfo: {
					address: "河南省郑州市管城区xx路xx号",
					username: "李四",
					mobile: 18888888888
				}
			};
		},
		methods: {
			addAddress(){
				uni.navigateTo({
					url: "/pages/address/list"
				})
			}
		}
	}
</script>

<style lang="scss">
.delivery {
	.title {
		width: 100%;
		height: 78rpx;
		background: #fff;
		@include flex-box-set();
		color: $brand-theme-color;
		border-radius: 15rpx 15rpx 0 0;
	}
	.container {
		background: #fff;
		padding: 25rpx;
		.address-info {
			font-size: 30rpx;
			padding: 40rpx 20rpx;
			background: $page-bg-color;
			border-radius: 10rpx;
			@include flex-box();
			.address-title {}
			.address-content {
				flex: 1;
				padding: 0 30rpx;
				font-size: 30rpx;
				.user-info {padding-top: 10rpx;}
				.add-address-text {}
			}
		}
	}
	.address-edit {}
}
</style>