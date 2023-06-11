<template>
	<view class="product-item">
		<view class="product-pic">
			<image class="proimg" src="../../static/logo.png" mode="aspectFill"></image>
		</view>
		<view class="product-info">
			<view class="product-title">商品标题商品标题商品标题商品标题商品标题</view>
			<view class="product-price">
				<view class="discount-price">￥10.5</view>
				<view class="original-price">￥22.3</view>
			</view>
			<view class="discount">3折</view>
			<view class="specification">
				<view class="skuSelect" v-if="true">选规格</view>
				<view class="uiNumber" v-else>
					<u-number-box v-model="value" min="0" max="99" @change="onChange">
						<view slot="minus" class="minus numbtn" :class="value<=0 ? 'none' : ''">
							  <u-icon name="minus" size="12" color="#ccc"></u-icon>
							</view>
							<text slot="input" class="input" :class="value<=0 ? 'none' : ''">
								{{value}}
							</text>
							<view slot="plus" class="plus numbtn">
							  <u-icon name="plus" size="12"></u-icon>
							</view>
					</u-number-box>	
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"product-item",
		data() {
			return {
				value: 1
			}
		},
		methods: {
			onChange(e){
				console.log(e)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.product-item {
		width: 100%;
		@include flex-box()
		padding: 25rpx 0;
		.product-pic {
			width: 180rpx;
			height: 180rpx;
			border-radius: 20rpx;
			overflow: hidden;
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
				font-size: 34rpx;
				font-weight: bold;
				@include ellipsis();
			}
			.product-price {
				@include flex-box-set(start,end);
				font-weight: bold;
				padding: 25rpx 0;
				.discount-price {
					font-size: 34rpx;
					color: $brand-theme-color;
				}
				.original-price {
					font-size: 26rpx;
					opacity: 0.4;
					text-decoration: line-through;
					padding-left: 10rpx;
				}
			}
			.discount {
				font-size: 22rpx;
				color: $brand-theme-color;
				padding: 3rpx 8rpx;
				border: 1rpx solid $brand-theme-color;
				display: inline-block;
				border-radius: 6rpx;
			}
			.specification {
				position: absolute;
				right: 0;
				bottom: 0;
				font-size: 28rpx;
				.skuSelect {
					height: 40rpx;
					padding: 0 10rpx;
					background: $brand-theme-color;
					color: #fff;
				}
				.uiNumber {
					.numbtn {
						width: 40rpx;
						height: 40rpx;
						@include flex-box-set()
					}
					.minus {border: 1px solid #ccc;}
					.input {
						width: 60rpx;
						height: 40rpx;
						font-size: 26rpx;
						color: #888;
						@include flex-box-set();
					}
					.plus {background: $brand-theme-color;}
					.none {display: none;}
				}
			}
		}
	}
</style>