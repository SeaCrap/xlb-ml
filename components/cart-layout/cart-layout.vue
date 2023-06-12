<template>
	<view class="card-wrapper">
		<view class="content">
			<view class="card-pic">
				<view class="icon" hover-class="iconhover" hover-start-time="50">
					<u-icon name="shopping-cart" color="#EC544F" size="34"></u-icon>
					<view class="num">1</view>
				</view>
				<view class="price">合计<text class="amount">￥10.90</text></view>
			</view>
			<view class="submit-button">
				<view class="btn disabled" v-if="true">选好了</view>
				<view class="btn" v-else>支付</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"cart-layout",
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss" scoped>
.card-wrapper {
	.content {
		@include flex-box();
		padding: 0 30rpx;
		height: 140rpx;
		background: #fff;
		.card-pic {
			@include flex-box();
			.icon {
				width: 80rpx;
				height: 80rpx;
				background: #eee;
				border-radius: 10rpx;
				@include flex-box-set();
				position: relative;
				margin-right: 30rpx;
				.shopping-cart {}
				.num {
					width: 36rpx;
					height: 36rpx;
					background: $brand-theme-color;
					border-radius: 50%;
					color: #fff;
					position: absolute;
					right: -18rpx;
					top: -18rpx;
					display: flex;
					@include flex-box-set();
					font-size: 22rpx;
				}
				.iconhover {
					transform: scale(0.9);
				}
			}
			.price {
				font-size: 28rpx;
				.amount {
					font-size: 32rpx;
					font-weight: bold;
				}
			}
		}
		.submit-button {
			.btn {
				width: 210rpx;
				height: 75rpx;
				background: $brand-theme-color;
				@include flex-box-set()
				color: #fff;
				border-radius: 10rpx;
				&.disabled {
					// opacity: 0.6;
				}
			}
		}
	}
}
</style>