<template>
	<view class="pro-specs">
		<u-popup :show="proSpecsState" @close="onClose" closeable round="10">
			<view class="pro-specs-wrapper">
				<view class="placeholder-box"></view>
				<view class="container">
					<scroll-view scroll-y="true" class="scroll-box">
						<view class="pro-item">
							<product-item :pro="detailData" :btn-state="false"/>
						</view>
						<view class="select-specs-wrapper">
							<view class="specs-list" v-for="item in detailData.sku_select" :key="item._id">
								<view class="attr">{{item.skuName}}</view>
								<view class="attr-value-group">
									<view 
										class="attr-value" 
										v-for="(child,index) in item.children" :key="index">
										{{child.name}}
									</view>
								</view>
							</view>
						</view>
						<view class="numSelect">
							<view class="title">购买数量</view>
							<u-number-box v-model="value">
								
							</u-number-box>
						</view>
					</scroll-view>
				</view>
				<view class="footer">
					<u-button color="#EC544F" xiconColor="#fff">确认</u-button>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import {mapGetters, mapMutations} from 'vuex'
	export default {
		name:"pro-select-specss",
		data() {
			return {
				value: 1
			}
		},
		computed: {
			...mapGetters(["proSpecsState", "detailData"])
		},
		methods: {
			...mapMutations(["SET_PRO_SPECS"]),
			onClose(){
				this.SET_PRO_SPECS(false)
			}
		}
	}
</script>

<style lang="scss">
	.pro-specs-wrapper {
		height: 70vh;
		.placeholder-box {
			height: 80rpx;
			width: 100%;
		}
		.container {
			height: calc(100% - 80rpx - 140rpx);
			.scroll-box {
				height: 100%;
				padding: 0 30rpx;
				.pro-item {
					border-bottom: 1px solid $border-color-light;
				}
				.numSelect {
					display: flex;
					align-items: center;
					padding: 30rpx 0;
					border-bottom: 1px solid $border-color-light;
					.title {
						font-size: 32rpx;
						font-weight: bold;
						padding-right: 30rpx;
					}
				}
			}
			.select-specs-wrapper {
				border-bottom: 1px solid $border-color-light;
				padding: 10rpx 0;
				.specs-list {
					padding: 20rpx 0;
					.attr {
						font-size: 32rpx;
						font-weight: bold;
						padding-bottom: 20rpx;
					}
					.attr-value-group {
						@include flex-box-set(start);
						flex-wrap: wrap;
						.attr-value {
							padding: 0 25rpx;
							height: 60rpx;
							border: 1rpx solid $border-color-light;
							margin-right: 20rpx;
							border-radius: 10rpx;
							color: $text-font-color-2;
							margin-bottom: 20rpx;
							@include flex-box-set()
							background: $page-bg-color;
							&.active {
								border-color: $brand-theme-color;
								color: $brand-theme-color;
								background: rgba(236,87,79,0.1);
							}
						}
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