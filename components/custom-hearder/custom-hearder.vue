<template>
	<view class="custom-header" :style="{height: totalHeight + 'px'}">
		<view class="shop-bimage">
			<image class="bgimg" src="../../static/images/bg.jpg" mode="aspectFill"></image>
		</view>
		<view class="shop-information">
			<view :style="{height: statusBarHeight + 'px'}"></view>
			<view class="service" :style="{height: titleBarHeight + 'px'}">
				<view class="kefu">
					<u-icon name="server-fill" size="22" color="#fff"></u-icon>
				</view>
				<navigator class="manage">
					<u-icon name="bag-fill" size="22" color="#fff"></u-icon>
					后台管理
				</navigator>
			</view>	
			<view class="body">
				<view class="brand">
					<view class="pic">
						<image class="img" src="../../static/images/bg.jpg" mode="aspectFill"></image>
					</view>
					<view class="text">
						<view class="title">
							<text class="font">蟹老板的店</text>
							<u-icon name="more-circle" size="18" color="#fff"></u-icon>
						</view>
						<view class="des">小店物美价廉，童叟无欺，欢迎选购！小店物美价廉，童叟无欺，欢迎选购！</view>
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
</template>

<script>
	export default {
		name: "custom-hearder",
		data() {
			return {
				statusBarHeight: 0,
				titleBarHeight: 0
			}
		},
		computed: {
			totalHeight(){
				return this.statusBarHeight + this.titleBarHeight + 100 + 10
			}
		},
		mounted(){
			
			// 状态栏高度
			let systemInfo = uni.getSystemInfoSync()
			console.log(systemInfo.statusBarHeight)
			this.statusBarHeight = systemInfo.statusBarHeight || 20
			
			// 胶囊 + 胶囊上下边距的高度
			// #ifdef MP-WEIXIN
			let menuBtnInfo = uni.getMenuButtonBoundingClientRect()
			this.titleBarHeight = menuBtnInfo.height + (menuBtnInfo.top - this.statusBarHeight) * 2
			// #endif
			
			// #ifndef MP-WEIXIN
			this.titleBarHeight = 40
			// #endif
		}
	}
</script>

<style lang="scss">
	.custom-header {
		overflow: hidden;
		background: #eecccf;
		height: 500rpx;
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
			}
		}
	}
</style>