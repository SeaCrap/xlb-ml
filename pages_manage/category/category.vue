<template>
	<view class="category">
		<view class="row add" @click="addCategory">
			<view class="left">
				<u-icon name="plus" color="#576b95" size="22"></u-icon>
				<text class="text">新增分类</text>
			</view>
		</view>
		<view class="row" v-for="(item,index) in categoryList" :key="item._id">
			<view class="left">
				<view class="name">{{item.name}}</view>
			</view>
			<view class="right">
				<u-icon name="edit-pen" size="26" color="#576b95" @click="updateCategory(item.name)"></u-icon>
				<u-icon name="trash" size="26" color="#EC544F" @click="deletCategory(item._id, index)"></u-icon>
			</view>
		</view>
		<uni-popup ref="inputDialog">
			<uni-popup-dialog 
				mode="input" title="添加分类" :value="inputValue"
				placeholder="请输入分类名称" @confirm="dialogInputConfirm">
			</uni-popup-dialog>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				inputValue: "",
				categoryList: [
					{
						_id: 1,
						name: "干果"
					},
					{
						_id: 2,
						name: "软糖"
					},
					{
						_id: 3,
						name: "饮料"
					},
					{
						_id: 4,
						name: "水果"
					}
				]
			};
		},
		methods: {
			updateCategory(name){
				this.inputValue = name
				this.$refs.inputDialog.open()
			},
			deletCategory(id, index){
				uni.showModal({
					content: "是否删除该分类?",
					success: res => {
						if(res.confirm){
							this.categoryList.splice(index, 1)
						}
					},
					fail: err => {
						console.log(err)
					}
				})
			},
			showDialog(){
				this.$refs.inputDialog.open()
			},
			dialogInputConfirm(e){
				this.inputValue = e
				this.categoryList.push({
					name: this.inputValue,
					_id: Date.now()
				})
				this.inputValue = ""
			}
		}
	}
</script>

<style lang="scss">
.category {
	padding: 30rpx;
	.row {
		@include flex-box();
		border-bottom: 1px solid $border-color-light;
		padding: 26rpx 0;
		.left {font-size: 34rpx;}
		.right {
			@include flex-box();
			.u-icon {margin-left: 30rpx;}
		}
	}
	.row.add {
		.left {
			color: $brand-theme-color-aux;
			@include flex-box();
			.text {
				font-size: 36rpx;
				padding-left: 10rpx;
			}
		}
	}
}
</style>
