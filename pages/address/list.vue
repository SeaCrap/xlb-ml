<template>
	<view class="address-list">
		<view class="head-top">
			<view class="title">地址薄</view>
			<navigator class="add-address-content" url="/pages/address/edit">+ 添加地址</navigator>
		</view>
		<view class="list">
			<view class="item" v-for="item in 3" :key="item">
				<view class="header">
					<view class="user">李四-18888888888</view>
					<view class="select">
						<u-button v-if="false" plain type="primary" size="mini" color="#EC544F" text="默认地址"></u-button>
						<u-button v-else plain size="mini" color="#666" text="设为默认"></u-button>
					</view>
				</view>
				<view class="more">河南省郑州市管城区XX路XX号</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
	page {background: $page-bg-color;}
.address-list {
	padding: 30rpx;
	.head-top {
		@include flex-box();
		font-size: 30rpx;
		>.title {}
	}
	.add-address-content {
		border: 1px solid #000;
		border-radius: 50rpx;
		padding: 6rpx 15rpx;
	}
	.list {
		padding-top: 30rpx;
		.item {
			background: #fff;
			padding: 40rpx 20rpx;
			margin-bottom: 20rpx;
			border-radius: 15rpx;
			.header {
				@include flex-box();
				.user {}
				.select {}
			}
			.more {
				font-size: 28rpx;
				color: $text-font-color-3;
				padding-top: 10rpx;
			}
		}
	}
}
</style>
