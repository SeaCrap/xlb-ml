<template>
	<view class="brand">
		<uni-forms 
			ref="brandRef" 
			:model="brandFromData" 
			:rules="brandRules"
			:label-width="100"
			label-align="right">
			
			<uni-forms-item label="品牌 Logo">
				<uni-file-picker 
					v-model="brandFromData.thumb" 
					fileMediatype="image" 
					mode="grid" 
					:limit="1"/>
			</uni-forms-item>
			
			<uni-forms-item label="品牌名称" name="name" required>
				<uni-easyinput type="text" v-model="brandFromData.name" placeholder="请输入品牌名" />
			</uni-forms-item>
			
			<uni-forms-item label="商户电话" name="mobile" required>
				<uni-easyinput type="text" v-model="brandFromData.mobile" placeholder="请输入商户电话" />
			</uni-forms-item>
			
			<uni-forms-item label="商户地址" name="address">
				<uni-easyinput v-model="brandFromData.address" placeholder="请输入商家地址" />
			</uni-forms-item>
			
			<uni-forms-item label="商家介绍" name="about">
				<uni-easyinput type="textarea" v-model="brandFromData.about" placeholder="请输入商家介绍" />
			</uni-forms-item>
			
			<button type="primary" @click="onSubmit">提交信息</button>
		</uni-forms>
	</view>
</template>

<script>
	const brandCloudObj = uniCloud.importObject("xlb-mall-brand")
	export default {
		data() {
			return {
				thumb: [],
				brandFromData: {
					name: "",
					mobile: "",
					address: "",
					about: ""
				},
				brandRules: {
					name: {
						rules: [
							{
								required: true,
								errorMessage: "请输入品牌名称"
							},
							{
								minLength: 3,
								maxLength: 20,
								errorMessage: '长度在 {minLength} 到 {maxLength} 的字符'
							}
						]
					},
					mobile: {
						rules: [
							{
								required: true,
								errorMessage: "请输入商户电话"
							},
							{
								validateFunction:function(rule,value,data,callback){
									let res = /^1[3-9]\d{9}$/.test(value)
									if(!res){callback("手机号码格式不正确")}
								},
							}
						]
					},
				}
			}
		},
		onLoad() {
			this.getBrand()
		},
		methods: {
			
			// 获取商家信息
			getBrand(){
				brandCloudObj.get().then(res => {
					this.brandFromData = res.data[0]
				})
			},
			
			// 提交
			onSubmit(){
				this.$refs.brandRef.validate().then(res => {
					let filterImages = this.brandFromData.thumb.map(item => {
						return {
							extname: item.extname,
							url: item.url,
							name: item.name,
							size: item.size
						}
					})
					this.brandFromData.thumb = filterImages
					this.addAndUpdate()
				}).catch(err => {console.log(err)})
			},
			
			// 新增 or 修改品牌信息
			addAndUpdate(){
				// 如果 _id 存在，就是修改更新
				if(this.brandFromData._id){
					brandCloudObj.update(this.brandFromData).then(res => {
						uni.showToast({
							title: "修改成功",
							mask: true
						})
						setTimeout(() => {
							uni.navigateBack()
						},1500)
					})
				}else {
					brandCloudObj.add(this.brandFromData).then(res => {
						uni.showToast({
							title: "添加成功"
						})
						setTimeout(() => {
							uni.navigateBack()
						},1500)
					})
				}
			}
		}
	}
</script>

<style lang="scss">
.brand {
	padding: 30rpx;
}
</style>
