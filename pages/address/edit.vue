<template>
	<view class="address-form">
		<u--form 
			labelWidth="100"
			labelPosition="top"
			:model="addressFrom"
			:rules="addressRules"
			ref="uForm">
			
			<u-form-item label="姓名" prop="username">
				<u--input v-model="addressFrom.username" placeholder="请输入姓名">					
				</u--input>
			</u-form-item>
			
			<u-form-item label="联系电话" prop="mobile">
				<u--input v-model="addressFrom.mobile" placeholder="请输入手机号">					
				</u--input>
			</u-form-item>
			
			 <u-form-item label="选择省市区">
				  <uni-data-picker 
						v-model="addressFrom.ared_code"
						placeholder="请选择地址" 
						popup-title="请选择所在地区" 
						collection="opendb-city-china" 
						field="code as value, name as text" 
						orderby="value asc" 
						self-field="code" 
						parent-field="parent_code"
						@change="pickerChange">
				</uni-data-picker>   
			 </u-form-item>
			
			<u-form-item label="详细地址" prop="address">
				<u--input v-model="addressFrom.address" placeholder="请输入街道门牌号">					
				</u--input>
			</u-form-item>
			
			<u-form-item label="设为默认">
				<u-switch v-model="addressFrom.selected" inactiveColor="#eee"></u-switch>
			</u-form-item>
			
			<u-form-item></u-form-item>
			
			<u-form-item>
				<u-button type="primary" @click="onSubmit">提交</u-button>
			</u-form-item>
			
		</u--form>
	</view>
</template>

<script>
	const addressCloudObj = uniCloud.importObject("xlb-mall-address", {"customUI":true})
	let addressId
	export default {
		data() {
			return {
				addressFrom: {
					username: "",
					mobile: "",
					address: "",
					selected: false,
					ared_code: "",
					are_name: []
				},
				addressRules: {
					username: [
						{
							required: true, 
							message: '姓名是必填的',
							trigger: ['change','blur'],
						},
						{
							min: 2, 
							max: 8,
							message: "长度在2-8个字符之间",
							trigger: ['change','blur']
						}
					],
					mobile: [
						{
							required: true, 
							message: '电话是必填的',
							trigger: ['change','blur'],
						},
						{
							validator: (rule, value, callback) => {
								return uni.$u.test.mobile(value);
							},
							message: '手机号码不正确',
							trigger: ['change','blur'],
						}
					],
					address: [
						{
							required: true, 
							message: '地址是必填的',
							trigger: ['change','blur'],
						}
					]
				}
			}
		},
		onLoad(e) {
			addressId = e?.id ?? null
			if(addressId) this.editOneAddressInfo()
		},
		methods: {
			// 编辑某条地址信息
			async editOneAddressInfo(){
				let res = await addressCloudObj.getOne(addressId)
				this.addressFrom = res.data[0]
			},
			// 地区选择事件
			pickerChange(e){
				let are_name = e.detail.value.map(item => {
					return item.text
				})
				this.addressFrom.are_name = are_name.join("")
			},
			onSubmit(){
				this.$refs.uForm.validate().then( async res => {
					let title
					if(this.addressFrom._id){
						let data = await addressCloudObj.updateOne(this.addressFrom)
						title = "修改成功"
					}else {
						let data = await addressCloudObj.add(this.addressFrom)
							title = "添加成功"
					}					
					uni.showToast({
						title,
						mask: true
					})
					setTimeout(() => {
						uni.navigateBack()
					},1000)	
				}).catch(errors => {
					uni.$u.toast('校验失败')
				})
			}
		}
	}
</script>

<style lang="scss">
.address-form {
	padding: 30rpx;
}
</style>
