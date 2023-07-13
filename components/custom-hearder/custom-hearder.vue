<template>
	<view>
		<view v-if="brandInfo.name" class="custom-header" :style="{height: totalHeight + 'px'}">
			<view class="shop-bimage">
				<image class="bgimg" :src="brandInfo.thumb[0].url" mode="aspectFill"></image>
			</view>
			<view class="shop-information">
				<view :style="{height: statusBarHeight + 'px'}"></view>
				<view class="service" :style="{height: titleBarHeight + 'px'}" v-if="!foldState">
					<view class="kefu">
						<u-icon name="server-fill" size="22" color="#fff"></u-icon>
					</view>
					<navigator class="manage" url="/pages_manage/index/index">
						<u-icon name="bag-fill" size="22" color="#fff"></u-icon>
						后台管理
					</navigator>
				</view>	
				<view class="body" :class="foldState ? 'fold' : ''"
				:style="{height: bodyBarHeight + 'px'}">
					<view class="brand" @click="showBrandPop">
						<view class="pic">
							<image class="img" :src="brandInfo.thumb[0].url" mode="aspectFill"></image>
						</view>
						<view class="text">
							<view class="title">
								<text class="font">{{brandInfo.name}}</text>
							</view>
							<view class="des">{{brandInfo.about}}</view>
						</view>
					</view>
					<view class="code">
						<view class="pic">
							<image class="img" src="../../static/logo.png" mode="scaleToFill"></image>
						</view>
						<text class="pay">付款</text>
					</view>
				</view>
			</view>
		</view>

		<view v-if="brandInfo.name">
			<uni-popup ref="brandPopRef" type="bottom">
				<view class="brand-popup-wrapper">
					<view class="close" @click="closeBrandPop">
						<u-icon name="arrow-down" color="#666"></u-icon>
					</view>
					
					<view class="brand">
						<view class="pic">
							<image class="img" :src="brandInfo.thumb[0].url" mode="aspectFill"></image>
						</view>
						<view class="title">{{brandInfo.name}}</view>
						<view class="des">{{brandInfo.about}}</view>
					</view>
					
					<view class="cell">
						<u-cell-group>
							<u-cell 
								icon="phone" 
								:title="brandInfo.mobile" isLink @click="callPhone(brandInfo.mobile)">
							</u-cell>
							<u-cell 
								icon="map" 
								:title="brandInfo.address" isLink @click="viewAddress(brandInfo.address)">
							</u-cell>
						</u-cell-group>
					</view>
				</view>
				
				<view class="safe-area-bottom"></view>
			</uni-popup>
		</view>
		
	</view>
</template>

<script>
	import {mapState, mapGetters, mapActions} from 'vuex'
	export default {
		name: "custom-hearder",
		computed: {
			...mapGetters([
				"statusBarHeight",
				"titleBarHeight",
				"bodyBarHeight", 
				"totalHeight", 
				"foldState", 
				"brandInfo"
			])	
		},
		created() {
			this.getBrandInfo()
		},
		methods: {
			// 获取商户信息
			...mapActions(["getBrandInfo"]),
			// 商户信息 pop
			showBrandPop(){
				this.$refs.brandPopRef.open()
			},
			// 点击箭头关闭弹窗
			closeBrandPop(){
				this.$refs.brandPopRef.close()
			},
			
			// 拨打商户电话
			callPhone(mobile){
				uni.makePhoneCall({
					phoneNumber: mobile
				})
			},
			// 查看商铺地址
			viewAddress(address){
				// 请求高德地图接口
				uni.request({
					url: "https://restapi.amap.com/v3/geocode/geo",
					data: {
						key: "d0c2a5f8fbfa0b944b1669a631d04e83",
						address
					},
					success: res => {
						// 获取经纬度
						let location = res.data.geocodes[0].location
						let locationArr = location.split(",").map(item => Number(item))
						uni.openLocation({
							latitude: locationArr[1],
							longitude: locationArr[0]
						})
					}
				})				
			}
		}
	}
</script>

<style lang="scss">
	.custom-header {
		overflow: hidden;
		background: #eecccf;
		position: relative;
		.shop-bimage {
			width: 100%;
			height: 100%;

			.bgimg {
				width: 100%;
				height: 100%;
				filter: blur(30rpx);
				transform: scale(30rpx);
			}
			
		}
		.shop-information {
			width: 100%;
			position: absolute;
			top: 0;
			left: 0;
			.service {
				padding-left: 30rpx;
				@include flex-box-set(start)
				color: #fff;
				.kefu {}
				.manage {
					margin-left: 20rpx;
					@include flex-box-set(start)
				}
			}
			.body {
				padding: 0 45rpx;
				height: 100px;
				@include flex-box();
				transition: all 0.25s;
				.brand {
					width: 580rpx;
					@include flex-box-set(start);
					>.pic {
						width: 110rpx;
						height: 110rpx;
						>.img {
							width: 100%; 
							height: 100%; 
							border-radius: 50%; 
							overflow: hidden; 
							border: 1rpx solid #fff;
						}
					}
					>.text {
						flex: 1;
						padding: 0 30rpx;
						color: #fff;
						
						>.title {
							font-size: 34rpx;
							font-weight: bold;
							@include flex-box-set(start,center);
							>.font{ margin-right: 10rpx;}
						}
						>.des {
							font-size: 26rpx;
							width: 100%;
							opacity: 0.8;
							padding-top: 5rpx;
							@include ellipsis()
						}
					}
				}
				.code {
					width: 80rpx;
					height: 80rpx;
					border-left: 1px solid rgba(255, 255, 255, 0.6);
					@include flex-box-set(space-between);
					flex-direction: column;
					>.pic {
						width: 40rpx;
						height: 40rpx;
						.img {width: 100%; height: 100%;}
					}
					>.pay {font-size: 22rpx; color: #fff; text-align: center;}
				}
				&.fold {
					padding: 0 30rpx;
					.brand {
						.pic {width: 60rpx; height: 60rpx;}
						.title {font-size: 28rpx;}
						.des {display: none;}
					}
					.code {display: none;}
				}
			}
		}
	}
	.brand-popup-wrapper {
		padding: 30rpx;
		background: #fff;
		border-radius: 20rpx 20rpx 0 0;
		@include flex-box();
		flex-direction: column;
		.close {
			background: page-bg-color;
			padding: 5rpx 20rpx;
			border-radius: 30rpx;
		}
		.brand {
			@include flex-box();
			flex-direction: column;
			padding: 30rpx 0;
			.pic {
				width: 100rpx;
				height: 100rpx;
				border-radius: 50%;
				overflow: hidden;
				.img {width: 100%; height: 100%;}
			}
			.title {
				font-size: 34rpx;
				color: $text-font-color-1;
				padding: 10rpx 0;
			}
			.des {font-size: 28rpx; color: $text-font-color-2;}
		}
		.cell {width: 100%; padding: 30rpx 0 100rpx;}
	}
</style>