<template>
	<view class="goods-page">
		<uni-forms
			ref="goodsRef" 
			:model="goodsFormData" 
			:rules="goodsRules"
			:label-width="100"
			label-align="right">
			
			<uni-forms-item label="商品图片" required name="thumb">
				<uni-file-picker 
					v-model="goodsFormData.thumb" 
					fileMediatype="image" 
					mode="grid"/>
			</uni-forms-item>
			
			<uni-forms-item label="商品名称" required name="name">
				<uni-easyinput v-model="goodsFormData.name" placeholder="请输入品牌名" trim="both" />
			</uni-forms-item>
			
			<uni-forms-item label="产品分类" required name="category_id">
				<uni-data-select
					collection="xlb-mall-category"
					field="_id as value, name as text"
					v-model="goodsFormData.category_id">
				</uni-data-select>
			</uni-forms-item>
			
			<uni-forms-item label="商品价格" required name="price">
				<uni-easyinput type="number" v-model="goodsFormData.price" placeholder="请输入商品价格" trim="both" />
			</uni-forms-item>
			
			<uni-forms-item label="商品原价">
				<uni-easyinput type="number" v-model="goodsFormData.before_price" placeholder="请输入商品原价" trim="both" />
			</uni-forms-item>
			
			<uni-forms-item label="商品描述">
				<uni-easyinput type="textarea" v-model="goodsFormData.description" placeholder="请输入商品描述" />
			</uni-forms-item>
			
			<view class="submit-btn">
				<button type="primary" @click="onSubmit">确认提交</button>
			</view>
			
		</uni-forms>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				thumb: [],
				goodsFormData: {
					title: "",
					name: "",
					category_id: null,
					price: null,
					before_price: null,
					description: ""
				},
				goodsRules: {
					thumb: {
						rules: [
							{
								required: true,
								errorMessage: "请添加商品图片"
							}
						]	
					},
					name: {
						rules: [
							{
								required: true,
								errorMessage: "请输入商品名称"
							}
						]
					},
					price: {
						rules: [
							{
								required: true,
								errorMessage: "请输入商品价格"
							}
						]
					},
					category_id: {
						rules: [
							{
								required: true,
								errorMessage: "请选择商品分类"
							}
						]
					}
				}
			}
		},
		methods: {
			onSubmit(){
				console.log(this.goodsFormData)
				this.$refs.goodsRef.validate().then(res => {
					console.log(res)
				}).catch(err => {console.log(err)})
			}
		}
	}
</script>

<style lang="scss">
.goods-page {
	padding: 30rpx;
}
</style>
