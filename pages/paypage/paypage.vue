<template>
	<view class="paypage">
		<delivery-layout></delivery-layout>
		<view class="goodsList">
			<goods-list></goods-list>
		</view>
		<view class="payType">
			<view class="box" 
				:class="item.value == payDefaultValue ? 'active' : ''"
				v-for="(item,index) in payType" :key="index"
				@click="clickPay(item.value)">
				<u-icon color="#1578FF"
					:name="item.value == 'alipay' ? 'zhifubao' : ''" class="icon" size="26">
				</u-icon>
				<u-icon color="#04C15F"
					:name="item.value == 'wxpay' ? 'weixin-fill' : ''" class="icon" size="26">
				</u-icon>
				<text class="font">{{item.name}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				payDefaultValue: "alipay",
				payType: [
					{
						name: "支付宝",
						value: "alipay"
					},
					{
						name: "微信",
						value: "wxpay"
					}
				]
			};
		},
		methods: {
			clickPay(value){
				console.log(value)
				this.payDefaultValue = value
			}
		}
	}
</script>

<style lang="scss">
page {background: $page-bg-color;}
.paypage {
	padding: 30rpx;
	.goodsList {
		margin-top: 30rpx;
	}
	.payType {
		@include flex-box()
		.box {
			width: 49%;
			height: 75rpx;
			background: #fff;
			border-radius: 10rpx;
			@include flex-box-set();
			border: 1px solid #fff;
			filter: grayscale(100%);
			.font {
				padding-left: 10rpx;
			}
		}
		.box:first-child.active {
			border-color: #1578FF;
			color: #1578FF;
			filter: grayscale(0%);
		}
		.box:last-child.active {
			border-color: #04C15F;
			color: #04C15F;
			filter: grayscale(0%);
		}
	}
}
</style>
