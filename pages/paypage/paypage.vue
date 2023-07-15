<template>
	<view class="paypage">
		<delivery-layout :deliveryInfo="deliveryInfo"></delivery-layout>
		<view class="goodsList">
			<goods-list 
				:goodsList="proCarList" 
				:totalPrice="totalPrice"
				:preferentialPrice="preferentialPrice"></goods-list>
		</view>
		
		<!-- #ifndef MP-WEIXIN -->
		<view class="payType">
			<view class="box" 
				:class="item.value == payDefaultValue ? 'active' : ''"
				v-for="(item,index) in payType" :key="index"
				@click="clickPay(item.value)">
				<u-icon class="icon" :name="item.icon" color="item.color" size="26">
				</u-icon>
				<text class="font">{{item.name}}</text>
			</view>
		</view>
		<!-- #endif -->
		<view class="payTabbar">
			<product-car-list :type="isPay" :payBtnState="payBtnState"></product-car-list>
		</view>
	</view>
</template>

<script>
	import {mapGetters} from 'vuex'
	const addressCloudObj = uniCloud.importObject("xlb-mall-address")
	export default {
		data() {
			return {
				deliveryInfo: {
					address: "",
					username: "",
					mobile: ""
				},
				isPay: true,
				// #ifdef APP-PLUS || H5
				payDefaultValue: "alipay",
				// #endif
					// #ifdef MP-WEIXIN
					payDefaultValue: "wxpay",
					// #endif
				payType: [
					{
						name: "支付宝",
						value: "alipay",
						color: "#1578FF",
						icon: "zhifubao"
					},
					{
						name: "微信",
						value: "wxpay",
						color: "#04C15F",
						icon: "weixin-fill"
					}
				]
			};
		},
		computed: {
			...mapGetters(["proCarList","totalPrice","preferentialPrice"]),
			// 支付按钮状态
			payBtnState(){
				// 严谨判断确认订单页面
				let bool = Object.keys(this.deliveryInfo).every(item => {
					return this.deliveryInfo[item] != ""
				})
				return this.proCarList.length > 0 && this.totalPrice > 0 && bool
			}
		},
		onLoad() {
			this.getDefaultAddress()
			uni.$on("updateValue", (e) => {
				this.deliveryInfo = e
			})
		},
		onUnload() {
			uni.$off("updateValue")
		},
		methods: {
			async getDefaultAddress(){
				let res = await addressCloudObj.getDefaultAddress()
				if(!res.data.length) return
				let {address,are_name,username,mobile} = res.data[0]
				this.deliveryInfo = {
					address: are_name + address,
					username,
					mobile
				}
			},
			clickPay(value){
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
	.payTabbar {
		position: fixed;
		width: 100%;
		bottom: 0;
		left: 0;
	}
}
</style>
