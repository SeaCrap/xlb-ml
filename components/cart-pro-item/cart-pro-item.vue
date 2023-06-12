<template>
	<view class="cart-pro-item">
		<view class="product-pic">
			<image class="proimg" src="../../static/images/bg.jpg" mode="aspectFill"></image>
		</view>
		<view class="product-info">
			<view class="product-title">卫龙小面筋卫龙小面筋卫龙小面筋卫龙小面筋卫龙小面筋卫龙小面筋卫龙小面筋卫龙小面筋卫龙小面筋</view>
			<view class="product-sku">微辣/10包</view>
			<view class="product-price">
				<view class="discount-price">￥10.5</view>
				<view class="original-price">￥22.3</view>
			</view>
			<view class="specification">
				<view class="uiNumber">
					<product-stepper />
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"product-item"
	}
</script>

<style lang="scss" scoped>
	.cart-pro-item {
		width: 100%;
		@include flex-box()
		padding: 20rpx 0;
		border-bottom: 1px solid $border-color-light;
		.product-pic {
			width: 160rpx;
			height: 160rpx;
			.proimg {
				width: 100%;
				height: 100%;
			}
		}
		.product-info {
			flex: 1;
			padding-left: 20rpx;
			position: relative;
			.product-title {
				font-size: 28rpx;
				@include ellipsis(2);
			}
			.product-sku {
				font-size: 22rpx;
				color: #999;
				padding: 5rpx 0;
			}
			.product-price {
				@include flex-box-set(start);
				line-height: 40rpx;
				.discount-price {
					font-size: 28rpx;
					font-weight: bold;
					color: $brand-theme-color;
				}
				.original-price {
					font-size: 26rpx;
					color: $text-font-color-3;
					opacity: 0.4;
					text-decoration: line-through;
					padding-left: 10rpx;
				}
			}

			.specification {
				position: absolute;
				right: 0;
				bottom: 0;
				font-size: 28rpx;
				.uiNumber {
					
				}
			}
		}
	}
</style>