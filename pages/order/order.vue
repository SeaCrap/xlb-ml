<template>
	<view class="orderPage">
		<view class="row" v-for="item in 5" @click="goDetail(item)">
			<view class="header">
				<view class="number">编号 88888<text class="way">商家外送</text></view>
				<view class="state">
					<u-icon name="weixin-fill" size="21" color="#04C15F"></u-icon>
					<text>已支付</text>
				</view>
			</view>
			<view class="body">卫龙大面筋</view>
			<view class="footer">
				<view class="time">2023-7-8 16:50</view>
				<view class="count">
					共两件商品，实付 <text class="price">￥88.8</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			goDetail(value){
				uni.navigateTo({
					url: "/pages/order/detail?item=" + value
				})
			} 
		}
	}
</script>

<style lang="scss">
	page {background: $page-bg-color;}
	.orderPage {
		padding: 30rpx;
		.row {
			background: #fff;
			padding: 40rpx 20rpx;
			border-radius: 20rpx;
			margin-bottom: 30rpx;
			.header {
				@include flex-box();
				font-size: 32rpx;
				line-height: 32rpx;
				.number {
					@include flex-box-set(start);
					.way {
						background: #19be6b;
						color: #fff;
						font-size: 22rpx;
						padding: 6rpx 20rpx;
						border-radius: 30rpx;
						margin-left: 10rpx;
					}
				}
				.state {
					color: $brand-theme-color-aux; 
					@include flex-box-set(start);
				}
			}
			.body {
				border:　1px solid $border-color;
				padding: 60rpx 20rpx;
				border-radius: 10rpx;
				background: #F9F9F9;
				font-size: 34rpx;
				margin: 30rpx 0;
			}
			.footer {
				@include flex-box()
				font-size: 26rpx;
				color: #a5a5a5;
				.time {}
				.count {
					.price {
						font-weight: bold;
						color: #000;
					}
				}
			}
		}
	}
</style>
