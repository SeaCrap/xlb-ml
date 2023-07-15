<template>
	<view class="address-list">
		<view class="head-top">
			<view class="title">地址薄</view>
			<navigator class="add-address-content" url="/pages/address/edit">+ 添加地址</navigator>
		</view>
		<view class="list">
			<view 
				class="item" 
				v-for="item in userAddressList" :key="item._id" 
				@longpress="editAddress(item._id)"
				@click="selectedAddress(item)">
				<view class="header">
					<view class="user">{{item.username}}-{{item.mobile}}</view>
					<view class="select">
						<u-button v-if="item.selected" plain type="primary" size="mini" color="#EC544F" text="默认地址"></u-button>
						<u-button 
							v-else plain size="mini" 
							color="#666" text="设为默认"
							@click="setDefaultAddress(item._id)"></u-button>
					</view>
				</view>
				<view class="more">{{item.are_name + item.address}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	const addressCloudObj = uniCloud.importObject("xlb-mall-address")
	export default {
		data(){
			return {
				userAddressList: []
			}
		},
		onShow() {
			this.getAddressList()
		},
		methods: {
			// 用户选择地址
			selectedAddress(item){
				let {address,are_name,username,mobile} = item
				let deliveryInfo = {
					address: are_name + address,
					username,
					mobile
				}
				uni.$emit("updateValue",deliveryInfo)
				uni.navigateBack()
			},
			editAddress(id){
				uni.navigateTo({
					url: "./edit?id=" + id
				})
			},
			async setDefaultAddress(id){
				let res = await addressCloudObj.updateAddress(id)
				this.getAddressList()		
			},	
			async getAddressList(){
				let res = await addressCloudObj.getList()
				this.userAddressList = res.data
			}
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
