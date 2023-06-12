<template>
	<view class="wrapper">
		<custom-hearder />
		<view class="content">
			<view class="info-model">
				<view class="delivery">免费配送</view>
				<view class="my-order">
					<u-icon name="calendar" color="#576b95" size="23"></u-icon>
					我的订单
				</view>
			</view>
			<view class="product-model">
				<view class="nav-menu">
					<scroll-view class="scroll-box" scroll-y :scroll-top="menuScrollVal">
						<view 
						class="nav-item" 
						:class="index == activeIndex ? 'active' : ''" v-for="(item, index) in 20" :key="index"
						@click="clickNav(index)">
							导航{{item}}
						</view>
					</scroll-view>
				</view>
				<view class="products">
					<view class="search-bar">
						<u-icon name="search" size="22" color="#576b95"></u-icon>
						搜索
					</view>
					<scroll-view class="scroll-box" scroll-with-animation 
					:scroll-top="proScrollVal" scroll-y>
						<view class="product-list" v-for="item in 20">
							<u-sticky :customNavHeight="0" zIndex="2">
								<view class="product-title">产品列表{{item}}</view>
							</u-sticky>
							<view class="product-content">
								<view class="pro-item" v-for="pro in 3">
									<product-item></product-item>
								</view>
							</view>
						</view>
					</scroll-view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data(){
			return {
				activeIndex: 0,
				menuScrollVal:0,
				proScrollVal: 0,
				navHeightArr: [],
				proHeightArr: []
			}
		},
		onLoad() {
			this.$nextTick(()=>{
				this.getProHeightArr()
			})	
		},
		methods: {
			clickNav(index){
				if(this.navIdex === index) return
				this.activeIndex = index
				if(this.timeout){clearTimeout(this.timeout)}
				this.timeout = setTimeout(() => {
					this.menuScrollVal = this.navHeightArr[index]
					this.proScrollVal = this.proHeightArr[index]
				}, 100)
			},
			// 获取滚动位置信息
			getProHeightArr(){
				let selectorQuery = uni.createSelectorQuery()
				// 获取 nav 滚动位置信息 
				selectorQuery.selectAll(".nav-item").boundingClientRect(rects=>{
					this.navHeightArr = rects.map(item => item.top - 190)
				}).exec()
				// 获取 product 滚动位置信息
				selectorQuery.selectAll(".product-list").boundingClientRect(rects=>{
					this.proHeightArr = rects.map(item => item.top - 150)
				}).exec()
			}
		}
	}
</script>

<style lang="scss" scoped>
	.wrapper {
		height: 100vh;
		display: flex;
		flex-direction: column;

		.content {
			flex: 1;
			background: #fff;
			border-radius: 20rpx 20rpx 0 0;
			margin-top: -20rpx;
			position: relative;
			z-index: 2;
			overflow: hidden;

			.info-model {
				@include flex-box() color: $text-font-color-1;
				height: 100rpx;
				background: #fff;
				padding: 0 30rpx;
				border-bottom: 1rpx solid $border-color;

				>.delivery {}

				>.my-order {
					@include flex-box() color: $brand-theme-color-aux;

					>.calendar {}
				}
			}

			.product-model {
				height: calc(100% - 100rpx);
				@include flex-box();

				.nav-menu {
					height: 100%;
					width: 190rpx;
					border-right: 1rpx solid $border-color;
					background: $page-bg-color;
					flex-shrink: 0;
					.scroll-box {
						height: 100%;

						.nav-item {
							font-size: 30rpx;
							padding-left: 30rpx;
							line-height: 100rpx;
							color: $text-font-color-2;
							position: relative;

							&.active {
								color: $text-font-color-1;
								background: #fff;

								&::after {
									content: '';
									width: 6rpx;
									height: 30rpx;
									background: $brand-theme-color;
									position: absolute;
									left: 0;
									top: 50%;
									transform: translateY(-50%);
								}
							}
						}
					}
				}

				.products {
					flex: 1;
					height: 100%;
					position: relative;
					
					.search-bar {
						position: absolute;
						top: 0;
						right: 30rpx;
						z-index: 3;
						@include flex-box-set();
						height: 90rpx;
						color: $brand-theme-color-aux;
					}
					
					.scroll-box {
						height: 100%;

						.product-list {
							padding: 0 30rpx;

							.product-title {
								line-height: 90rpx;
								font-size: 30rpx;
								background: #fff;
							}

							.product-content {
								.pro-item {
									padding: 10rpx 0;
								}
							}
						}
					}
				}
			}
		}
	}
</style>