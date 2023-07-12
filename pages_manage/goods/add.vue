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
			
			<uni-forms-item label="分类" required name="category_id">
				<uni-data-select
					collection="xlb-mall-category"
					field="_id as value, name as text"
					v-model="goodsFormData.category_id">
				</uni-data-select>
			</uni-forms-item>
			
			<uni-forms-item label="价格" required name="price">
				<uni-easyinput type="number" v-model="goodsFormData.price" placeholder="请输入商品价格" trim="both" />
			</uni-forms-item>
			
			<uni-forms-item label="原价">
				<uni-easyinput type="number" v-model="goodsFormData.before_price" placeholder="请输入商品原价" trim="both" />
			</uni-forms-item>
			
			<uni-forms-item label="商品属性">
				<u-cell :title="skuTitle" isLink :border="false" @click="selectedProduct"></u-cell>
				<view class="skuList">
					<view class="item" v-for="item in goodsFormData.sku_select" :key="item._id"  @click="selectedProduct">
						<view class="attributes">{{item.skuName}}:</view>
						<view class="attributeValue">{{getAttrValName(item.children)}}</view>
					</view>
				</view>
			</uni-forms-item>
						
			<uni-forms-item label="商品描述">
				<uni-easyinput type="textarea" v-model="goodsFormData.description" placeholder="请输入商品描述" />
			</uni-forms-item>
			
			<view class="submit-btn">
				<button type="primary" @click="onSubmit">确认提交</button>
			</view>
			
		</uni-forms>
		
		<uni-popup ref="prodInfoModal" type="bottom">
			<view class="product-attribute-wrapper">
				<view class="head">
					<view class="title">商品属性</view>
					<view class="addAttr" @click="addAtrr()">+ 添加属性</view>
				</view>
				
				<view class="body">
					<view class="item" v-for="(item,index) in attributes" :key="item._id">
						<view class="top">
							<checkbox :checked="item.isChecked" @click="selectProperties(index)"></checkbox>
							<view class="font">{{item.skuName}}</view>
						</view>
						<view class="btnGroup" v-if="item.isChecked">
							<view class="btn" :class="child.isChecked ? 'active' : ''"
								v-for="(child,cIndex) in item.children"
								@click="selectSubProperties(index,cIndex)">
								{{child.name}}
							</view>
							<view class="btn" @click="addAtrr(index)">
								<u-icon name="plus"></u-icon>
							</view>
						</view>
					</view>
				</view>
				
				<view class="footer">
					<button type="primary" @click="confirmSelect">确认选择</button>
				</view>
			</view>
			<view class="safe-area-bottom"></view>
		</uni-popup>
		
		<uni-popup ref="addAtrrPop">
			<uni-popup-dialog 
				mode="input" 
				title="新增"
				placeholder="请输入"
				@confirm="dialogConfirm">
			</uni-popup-dialog>	
		</uni-popup>
	</view>
</template>

<script>
	// customUI 数据库的数据加载 UI 关闭
	// const skuCloudObj = uniCloud.importObject("xlb-mall-sku", {"customUI":true})
	const skuCloudObj = uniCloud.importObject("xlb-mall-sku")
	const goodsCloudObj = uniCloud.importObject("xlb-mall-goods",  {"customUI":true})
	export default {
		data() {
			return {
				addAttrType: "parent", // parent：属性；child：子属性
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
				},
				attributes: [],
				sku_select: []
			}
		},
		computed: {
			skuTitle(){
				if(this.goodsFormData.sku_select?.length){
					let attrArr = this.goodsFormData.sku_select.map(item => {
						return item.skuName
					})
					return attrArr.join('/')
				}else {return "点击选择属性"}
			}
		},
		methods: {
			// 过滤：获取属性值的 name
			getAttrValName(attrVal){
				let attrValArr = attrVal.map(item => {
					return item.name
				})
				return attrValArr.join('/')
			},
			
			// 确认选择
			confirmSelect(){
				// 过滤选中的属性和属性值
				let selectAttr = this.attributes.filter(item => {
					// 是否选择了属性值
					let isSelectAttrValue = item.children.some(child => child.isChecked)
					return item.isChecked && isSelectAttrValue
				}).map(item => {
					let selectAttrValue = item.children.filter(child => {
						return child.isChecked
					})
					return {...item, children: selectAttrValue}
				})
				this.goodsFormData.sku_select = selectAttr
				// 确认选择以后数据渲染不出来，这里强制渲染下 后续再解决
				this.$forceUpdate() 
				this.$refs.prodInfoModal.close()
			},
			
			// 获取 sku 属性列表
			async getSkuList(){
				let res = await skuCloudObj.get()
				this.attributes = res.data
			},
			
			// 添加属性
			addAtrr(index = null){ // index 初始是 null
				if(index == null){
					this.addAttrType = "parent"  // addAttrType 为 parent 添加属性
					this.attrIndex = null
				}else {
					this.addAttrType = "child"  // addAttrType 为 child 添加属性值
					this.attrIndex = index
				}
				this.$refs.addAtrrPop.open()
			},
			
			// 添加属确认按钮
			async dialogConfirm(e){
				if(!e) return
				if(this.addAttrType == "parent"){ // 新增属性
					let obj = {
						skuName: e,
						isChecked: true,
						children: []
					}
					let res = await skuCloudObj.add(obj)
					obj._id = res.id
					this.attributes.push(obj)
				}else if(this.addAttrType == "child"){ // 新增属性值
					let obj = {
						name: e,
						isChecked: true
					}
					let id = this.attributes[this.attrIndex]._id
					let res = await skuCloudObj.addChild(id,obj)
					this.attributes[this.attrIndex].children.push(obj)
				}
				
			},
			
			// 选择属性
			selectProperties(index){
				const atrr = this.attributes[index]
				atrr.isChecked = !atrr.isChecked
			},
			
			// 选择属性值
			selectSubProperties(index,cIndex){
				const atrrValue = this.attributes[index].children[cIndex]
				 atrrValue.isChecked = !atrrValue.isChecked				
			},
			
			// 选择商品属性打开 pop
			selectedProduct(){
				this.$refs.prodInfoModal.open()
				if(this.attributes.length) return
				this.getSkuList()
			},
			
			// 提交表单
			onSubmit(){
				console.log(this.goodsFormData)
				this.$refs.goodsRef.validate().then(res => {
					this.toDataBase()
				}).catch(err => {console.log(err)})
			},
		
			// 上传云数据
			async toDataBase(){
				// 过滤图片数据 只要几个字段
				this.goodsFormData.thumb = this.goodsFormData.thumb.map(item => {
					return {
						url: item.url,
						name: item.name,
						extname: item.extname
					}
				})
				let res = await goodsCloudObj.add(this.goodsFormData)
				uni.showToast({
					title: "添加成功"
				})
				setTimeout(() => {
					uni.navigateBack()
				},1500)
			}
		}
	}
</script>

<style lang="scss">
.goods-page {
	padding: 30rpx;
	.skuList {
		.item {
			padding: 30rpx;
			background: $page-bg-color;
			margin: 15rpx 0;
			@include flex-box-set(start);
		}
	}
}
.product-attribute-wrapper {
	padding: 30rpx;
	background: #fff;
	border-radius: 20rpx 20rpx 0 0;
	.head {
		@include flex-box();
		font-size: 34rpx;
		margin-bottom: 30rpx;
		.title {font-weight: bold;}
	}
	.addAttr {
		color: $brand-theme-color-aux;
	}
	.body {
		
		.item {
			border-top: 1px solid $border-color-light;
			&:last-child {border-bottom: 1px solid $border-color-light;}
			.top {
				padding: 30rpx 0;
				@include flex-box-set(start);
				.font {
					padding-left: 10rpx;
					font-weight: bold;
				}
			}
		}
		.btnGroup {
			padding: 10rpx 0 30rpx;
			@include flex-box-set(start);
			flex-wrap: wrap;
			.btn {
				padding: 0rpx 25rpx;
				height: 60rpx;
				border: 1px solid $border-color-light;
				margin-right: 20rpx;
				border-radius: 10rpx;
				color: $text-font-color-2;
				margin-bottom: 20rpx;
				@include flex-box-set();
				&.active {
					border-color: $brand-theme-color;
					color: $brand-theme-color;
					background: rgba(236,87,79,0.1);
				}
			}
		}
	}
	.footer {
		padding: 50rpx 200rpx;
	}
}
</style>
