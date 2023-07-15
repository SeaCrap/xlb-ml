<template>
	<view>
		<view class="card-wrapper">
			<view class="cart-Pop-ups" v-if="cartVisible">
				<view class="head">
					<view class="text">已选商品</view>
					<view class="empty" @click="clearCart">清空</view>
				</view>
				<scroll-view scroll-y="true" class="body">
					<view class="scroll-content">
						<!-- goodsid 保证直接加购唯一性、attrVals 保证选规格加购唯一性 -->
						<view class="cart-item" v-for="item in proCarList" :key="carKey(item)">
							<product-cart-item :item="item"/>
						</view>
					</view>
				</scroll-view>
			</view>
			<view class="content">
				<view class="card-pic">
					<view v-if="!type" class="icon" hover-class="iconhover" hover-start-time="50" @tap="showCart">
						<u-icon name="shopping-cart" color="#EC544F" size="34"></u-icon>
						<view class="num">{{buyNum}}</view>
					</view>
					<view class="price">合计<text class="amount">￥{{priceFormat(totalPrice)}}</text></view>
				</view>
				<view class="submit-button">
					<view class="btn" v-if="!type" @click="goPay">选好了</view>
					<view v-else class="btn" :class="payBtnState ? '' : 'disabled'"  @click="confirmPay">支付</view>
				</view>
			</view>
			<!-- ios 安全区域	 -->
			<view class="safe-area-bottom"></view>
		</view>
		<u-overlay v-if="cartVisible" :show="true" duration="0" z-index="9" @click="showCart"></u-overlay>
	</view>
</template>

<script>
	import {mapGetters,mapMutations} from 'vuex'
	import {priceFormat} from '@/utils/tools.js'
	export default {
		name:"product-car-list",
		props: {
			type: Boolean || String,
			pro: {
				type: Object,
				default: () => {}
			},
			payBtnState: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				cartVisible: false
			}
		},
		computed: {
			...mapGetters(["proCarList", "totalPrice", "buyNum"])
		},
		methods: {
			carKey(item){
				return item.goodsid+JSON.stringify(item.attrVals)
			},
			...mapMutations(["SET_PRO_CART_LIST"]),
			clearCart (){
				this.SET_PRO_CART_LIST()
			},
			priceFormat,
			confirmPay(){
				if(!this.payBtnState) return
				console.log('点击了支付')
			},
			goPay(){
				uni.navigateTo({
					url: "/pages/paypage/paypage"
				})
			},
			showCart(){
				this.cartVisible = !this.cartVisible
			}
		}
	}
</script>

<style lang="scss" scoped>
.card-wrapper {
	position: relative;
	z-index: 10;
	.cart-Pop-ups {
		border-bottom: 1px solid $border-color-light;
		padding: 30rpx 30rpx 0;
		border-radius: 20rpx 20rpx 0 0;
		background: #fff;
		.head {
			@include flex-box()
			color: $text-font-color-3;
			padding: 25rpx 0;
			>.text {}
			>.empty {color: $brand-theme-color-aux;}
		}
		.body {
			height: 600rpx;
			.scroll-content {
				.cart-item {}
			}
		}
	}
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
					opacity: 0.6;
				}
			}
		}
	}
}
</style>