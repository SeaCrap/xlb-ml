<template>
	<view class="product-item" @click="showDetail">
		<view class="product-pic">
			<image class="proimg" :src="pro.thumb[0].url" mode="aspectFill"></image>
		</view>
		<view class="product-info">
			<view class="product-title">{{pro.name}}</view>
			<view class="product-price">
				<view class="discount-price">￥{{priceFormat(pro.price)}}</view>
				<view 
					v-if="pro.before_price" 
					class="original-price">
					￥{{priceFormat(pro.before_price)}}
				</view>
			</view>
			<view 
				v-if="pro.before_price && discount(pro.price,pro.before_price)" 
				class="discount">
				{{discount(pro.price,pro.before_price)}}折
			</view>
			<view class="specification" v-if="btnState">
				<view 
					class="skuSelect" 
					v-if="Array.isArray(pro.sku_select) && pro.sku_select.length"
					@click.stop="selectSpecs">
					选规格
				</view>
				<view class="uiNumber" v-else>
					<product-stepper :item="pro"></product-stepper>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {mapMutations} from 'vuex'
	import {priceFormat, discount} from "../../utils/tools.js"
	export default {
		name:"product-item",
		props: {
			pro: {
				type: Object,
				default: () => {}
			},
			btnState: {
				type: Boolean,
				default: true
			}
		},
		methods: {
			priceFormat,
			discount,
			...mapMutations(["SET_DETAIL_START", "SET_DETAIL_DATA", "SET_PRO_SPECS"]),
			// 打开详情
			showDetail(){
				if(!this.btnState) return
				this.SET_DETAIL_START(true),
				this.SET_DETAIL_DATA(this.pro)
			},
			// 选规格
			selectSpecs(){
				this.SET_PRO_SPECS(true),
				this.SET_DETAIL_DATA(this.pro)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.product-item {
		width: 100%;
		padding: 25rpx 0;
		display: flex;
		.product-pic {
			width: 170rpx;
			height: 170rpx;
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
				padding: 20rpx 0;
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