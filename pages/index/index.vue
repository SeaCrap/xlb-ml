<template>
	<view class="wrapper">
		<custom-hearder />
		<view class="content">
			<view class="infoModel">
				<view class="delivery">免费配送</view>
				<view class="my-order">
					<u-icon name="calendar" color="#576b95" size="23"></u-icon>
					我的订单
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
	
	}
</script>

<style lang="scss">
	.wrapper {
		height: 100vh;
		display: flex;
		flex-direction: column;
		.content {
			flex: 1;
			background: $border-color-light;
			border-radius: 20rpx 20rpx 0 0;
			margin-top: -20rpx;
			position: relative;
			z-index: 2;
			overflow: hidden;
			.infoModel {
				@include flex-box()
				color: $text-font-color-1;
				height: 100rpx;
				background: #fff;
				padding: 0 30rpx;
				.delivery {}
				.my-order {
					@include flex-box()
					color: $brand-theme-color-aux;
					.calendar {
						
					}
				}
			}
		}
	}
</style>
