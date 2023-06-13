<template>
	<view class="wrapper">
		<custom-hearder id="customHeaderBar" />
		<view class="content">
			<view class="info-model">
				<view class="delivery">免费配送</view>
				<navigator url="/pages/order/order" class="my-order">
					<u-icon name="calendar" color="#576b95" size="23"></u-icon>
					我的订单
				</navigator>
			</view>
			<view class="product-model">
				<view class="nav-menu">
					<scroll-view 
						class="scroll-box" scroll-y :scroll-top="menuScrollVal">
						<view 
							class="nav-item" :class="index == activeIndex ? 'active' : ''" 
							v-for="(item, index) in dataList" :key="item.id" 
							@click="clickNav(index)">
							{{item.name}}
						</view>
					</scroll-view>
				</view>
				<view class="products">
					<view class="search-bar">
						<u-icon name="search" size="22" color="#576b95"></u-icon>
						搜索
					</view>
					<scroll-view 
						class="scroll-box" scroll-with-animation 
						@scroll="proScrollEnt" :scroll-top="proScrollVal" scroll-y>
						<view class="product-list" v-for="item in dataList" :key="item.id">
							<u-sticky :customNavHeight="0" zIndex="2">
								<view class="product-title">{{item.name}}</view>
							</u-sticky>
							<view class="product-content">
								<view class="pro-item" v-for="pro in item.children" :key="pro.id">
									<product-item :pro="pro"/>
								</view>
							</view>
						</view>
					</scroll-view>
				</view>
			</view>
		</view>
		<product-car-list v-if="buyNum > 0" />
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations,
		mapGetters
	} from 'vuex'
	export default {
		data() {
			return {
				activeIndex: 0,
				menuScrollVal: 0,
				proScrollVal: 0,
				navHeightArr: [],
				proHeightArr: [],
				dataList: [
					{
						id: 1,
						name: "豆干制品",
						children: [
							{
								id: 11,
								name: "卫龙辣条",
								price: 10,
								before_price: 22,
								thumb: "https://mp-c422c6b7-799d-4ff5-9531-5051a0481131.cdn.bspapp.com/cloudstorage/83562e26-cfac-4cec-8f51-9ae6986942af.jpg",
								numvalue: 0
							}, 
							{
								id: 12,
								name: "卫龙大面筋",
								price: 5,
								before_price: 12,
								thumb: "https://mp-c422c6b7-799d-4ff5-9531-5051a0481131.cdn.bspapp.com/cloudstorage/30569d48-bb94-40de-8d2b-a3be99d710cd.jpg",
								numvalue: 0
					}]
					}, 
					{
						id: 2,
						name: "饼干糕点",
						children: [
							{
								id: 21,
								name: "丹麦曲奇",
								price: 25,
								before_price: 36,
								thumb: "https://mp-3309c116-4743-47d6-9979-462d2edf878c.cdn.bspapp.com/cloudstorage/6758e11c-949b-48c5-ae69-ddad030c2f94.png",
								numvalue: 0
							}
						]
					}, 
					{
						id: 3,
						name: "酒水饮料",
						children: [
							{
								id: 31,
								name: "韩国烧酒",
								price: 18,
								before_price: 29,
								thumb: "https://mp-3309c116-4743-47d6-9979-462d2edf878c.cdn.bspapp.com/cloudstorage/b1a12bee-0602-4cb5-927d-b2b246700e89.jpeg",
								numvalue: 0
							},
							{
								id: 32,
								name: "韩国烧酒111",
								price: 18,
								before_price: 29,
								thumb: "https://mp-3309c116-4743-47d6-9979-462d2edf878c.cdn.bspapp.com/cloudstorage/b1a12bee-0602-4cb5-927d-b2b246700e89.jpeg",
								numvalue: 0
							},
							{
								id: 33,
								name: "韩国烧酒222",
								price: 18,
								before_price: 29,
								thumb: "https://mp-3309c116-4743-47d6-9979-462d2edf878c.cdn.bspapp.com/cloudstorage/b1a12bee-0602-4cb5-927d-b2b246700e89.jpeg",
								numvalue: 0
							},
						]
					},
				]
			}
		},
		onLoad() {
			this.$nextTick(() => {
				this.getHeightArr()
			})
		},
		computed: {
			...mapGetters(["buyNum"])
		},
		methods: {
			...mapMutations(["setFoldState"]),
			clickNav(index) {
				if (this.activeIndex === index) return
				this.activeIndex = index
				if (this.timeout) {
					clearTimeout(this.timeout)
				}
				this.timeout = setTimeout(() => {
					this.menuScrollVal = this.navHeightArr[index]
					this.proScrollVal = this.proHeightArr[index]
				}, 100)
			},
			// 获取滚动位置信息
			getHeightArr() {
				let selectorQuery = uni.createSelectorQuery()
				let customHeightBar
				// 获取自定义导航栏的高度
				selectorQuery.select("#customHeaderBar").boundingClientRect(rect => {
					customHeightBar = rect.height
				}).exec()
				// 获取 nav 滚动位置信息 
				selectorQuery.selectAll(".nav-item").boundingClientRect(rects => {
					this.navHeightArr = rects.map(item => item.top - customHeightBar - 40)
				}).exec()
				// 获取 product 滚动位置信息
				selectorQuery.selectAll(".product-list").boundingClientRect(rects => {
					this.proHeightArr = rects.map(item => item.top - customHeightBar - 40)
				}).exec()
			},
			proScrollEnt(e) {
				let scrollTop = Math.ceil(e.detail.scrollTop)
				let idx = this.proHeightArr.findIndex((value, index, arr) =>
					scrollTop >= value && scrollTop < arr[index + 1])
				this.activeIndex = idx
				this.menuScrollVal = this.navHeightArr[idx]
				if (scrollTop < 300) {
					this.setFoldState(false)
				}
				if (scrollTop > 400) {
					this.setFoldState(true)
				}
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
			border-radius: 10px 10px 0 0;
			margin-top: -10px;
			position: relative;
			z-index: 2;
			overflow: hidden;

			.info-model {
				@include flex-box() color: $text-font-color-1;
				height: 50px;
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
						height: 100rpx;
						color: $brand-theme-color-aux;
					}

					.scroll-box {
						height: 100%;

						.product-list {
							padding: 0 30rpx;

							.product-title {
								line-height: 100rpx;
								font-size: 30rpx;
								background: #fff;
							}

							.product-content {
								.pro-item {}
							}
						}
					}
				}
			}
		}
	}
</style>