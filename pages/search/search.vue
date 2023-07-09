<template>
	<view class="search-wrapper">
		<u-search 
			placeholde="请输入搜索内容"v-model="keyword"
			clearabled showAction actionText="搜索" animation
			@search="onSearch" @custom="onSearch">
		</u-search>
		<view class="historyList">
			<view class="item" v-for="(item,index) in historyList" :key="index">
				<view class="text">{{item}}</view>
				<view class="close" @click="onClear(index)">
					<u-icon name="close" size="16" color="#999"></u-icon>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				keyword: "",
				historyList : []
			}
		},
		onLoad() {
			let historyList = uni.getStorageSync("historyList") || []
			this.historyList = historyList
		},
		methods: {
			onSearch(){
				this.historyList.unshift((this.keyword))
				// 去重
				this.historyList = [...new Set(this.historyList)]
				uni.setStorageSync("historyList", this.historyList)
			},
			onClear(index){
				this.historyList.splice(index, 1)
				uni.setStorageSync("historyList", this.historyList)
			}
		}
	}
</script>

<style lang="scss">
.search-wrapper {
	padding: 30rpx;
	.historyList {
		margin-top: 30rpx;
		.item {
			@include flex-box()
			font-size: 32rpx;
			padding: 30rpx 0;
			color: #333;
			border-bottom: 1px solid $border-color-light;
			.text {}
			.close {}
		}
	}
}
</style>
