<template>
	<view class="custom-header">
		<view class="shop-bimage">
			<image class="bgimg" src="../../static/images/bg.jpg" mode="aspectFill"></image>
		</view>
	</view>
</template>

<script>
	export default {
		name: "custom-hearder",
		data() {
			return {

			};
		}
	}
</script>

<style lang="scss">
	.custom-header {
		overflow: hidden;
		background: #eecccf;
		height: 300rpx;

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
	}
</style>