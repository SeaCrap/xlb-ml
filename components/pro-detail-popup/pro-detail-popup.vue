<template>
	<view class="pro-detail-popup">
		<u-popup :show="detailPopState" @close="onClose" closeable round="10">
			<view class="detail-wrapper">
				<view class="placeholder-box"></view>
				<view class="container">
					<scroll-view scroll-y="true" class="scroll-box">
						<view class="thumb">
							<image class="img" :src="detailData.thumb && detailData.thumb[0].url" mode="aspectFill"></image>
						</view>
						<view class="info">
							<view class="title">{{detailData.name}}</view>
							<view class="price-wrapper">
								<view class="price">￥{{priceFormat(detailData.price)}}</view>
								<view v-if="detailData.before_price" class="before-price">
									￥{{priceFormat(detailData.before_price)}}
								</view>
							</view>
							<view 
								class="discount" 
								v-if="discount(detailData.price,detailData.before_price)" >
								{{discount(detailData.price,detailData.before_price)}}折
							</view>
						</view>
						<view class="detail">
							<view class="text">
								<view class="title">商品描述</view>
								<view class="description">
									<rich-text :nodes="detailData.description"></rich-text>
								</view>
							</view>
							<view class="picList">
								<view v-for="(item,index) in detailData.thumb" :key="item.url">
									<image class="img" v-if="index != 0" :src="item.url" mode="widthFix"></image>
								</view>
							</view>
							<view class="intro">以上是全部介绍，欢迎选购</view>
						</view>
					</scroll-view>
				</view>
				<view class="footer">
					<u-button 
						color="#EC544F" 
						icon="shopping-cart" 
						iconColor="#fff"
						@click="addCart">
						加入购物车
					</u-button>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import {mapGetters, mapMutations} from 'vuex'
	import {priceFormat,discount} from '@/utils/tools.js'
	export default {
		name:"pro-detail-popup",
		data() {
			return {
				
			}
		},
		computed: {
			...mapGetters(["detailPopState", "detailData"])
		},
		methods: {
			priceFormat,
			discount,
			...mapMutations(["SET_DETAIL_START","SET_PRO_SPECS"]),
			onClose(){
				this.SET_DETAIL_START(false)
			},
			// 加入购物车
			addCart(){
				this.SET_PRO_SPECS(true)
			}
		}
	}
</script>

<style lang="scss">
		.detail-wrapper {
			height: 85vh;
			.placeholder-box {
				height: 80rpx;
				width: 100%;
			}
			.container {
				height: calc(100% - 80rpx - 140rpx);
				.scroll-box {
					height: 100%;
					padding: 0 30rpx;
					.thumb {
						width: 690rpx;
						height: 690rpx;
						.img {width: 100%; height: 100%;}
					}
					.info {
						padding: 20rpx 0;
						border-bottom: 1px solid $border-color-light;
						.title {
							font-size: 40rpx;
							font-weight: bold;
						}
						.price-wrapper {
							display: flex;
							align-items: center;
							padding-top: 20rpx;
							.price {
								font-size: 46rpx;
								font-weight: bold;
								color: $brand-theme-color;
							}
							.before-price {
								font-size: 28rpx;
								color: $text-font-color-3;
								font-weight: bold;
								text-decoration: line-through;
								margin-left: 10rpx;
							}
						}
						.discount {
							border: 1px solid $brand-theme-color;
							color: red;
							font-size: 22rpx;
							padding: 2rpx 20rpx;
							margin-left: 10rpx;
							border-radius: 8rpx;
							display: inline-block;
						}
					}
					.detail {
						.text {
							padding: 20rpx 0;
							.title {font-size: 32rpx; font-weight: bold;}
							.description {padding: 20rpx 0; line-height: 1.7em;}
						}
						.picList {
							.img {
								width: 100%;
								margin-bottom: 30rpx;
							}
						}
						.intro {
							padding: 40rpx 0;
							font-size: 30rpx;
							color: $text-font-color-3;
							text-align: center;
						}
					}
				}
			}
			.footer {
				height: 140rpx;
				border: 1px solid $border-color-light;
				@include flex-box-set();
				padding: 0 200rpx;
			}
		}
</style>