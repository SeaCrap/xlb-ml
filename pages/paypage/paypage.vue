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
			<product-car-list 
				:type="isPay" 
				:payBtnState="payBtnState"
				@confirmPay="onConfirmPay"></product-car-list>
		</view>
		
		<uni-pay 
			ref="uniPay" 
			returnUrl="/pages/order/order"
			@success="paySuccess"
			@cancel="payCancel"
			@create="payCreate"></uni-pay>
	</view>
</template>

<script>
	import {mapGetters} from 'vuex'
	const addressCloudObj = uniCloud.importObject("xlb-mall-address")
	const orderCloudObj = uniCloud.importObject("xlb-mall-order")
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
			// 发起支付
			async onConfirmPay(){
				let obj = {
					deliveryInfo: this.deliveryInfo,
					proCarList: this.proCarList,
					createTime: Date.now(),
					payType: this.payDefaultValue,
					state: 0,
					total_fee: this.totalPrice,
					isPay: false
				}
				let order_no = await orderCloudObj.createOrder(obj)
				let out_trade_no =  order_no + String(Math.random()).substring(3,9)	
				
				this.$refs.uniPay.createOrder({
					provider: this.payDefaultValue, // 支付供应商
					total_fee: this.totalPrice, // 支付金额，单位分 100 = 1元
					type: "text", // 支付回调类型
					order_no, // 业务系统订单号
					out_trade_no, // 插件支付单号
					description: "购买商品支付", // 支付描述
				})
			},
			paySuccess(e){
				console.log(e)
			},
			payCancel(e){
				console.log(e)
			},
			payCreate(){
				console.log(e) 
			},
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
