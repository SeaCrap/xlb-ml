<template>
	<view class="pro-specs">
		<u-popup :show="proSpecsState" @close="onClose" closeable round="10">
			<view class="pro-specs-wrapper">
				<view class="placeholder-box"></view>
				<view class="container">
					<scroll-view scroll-y="true" class="scroll-box">
						<view class="pro-item">
							<product-item :pro="detailData" :btn-state="false"/>
						</view>
						<view class="select-specs-wrapper">
							<view class="specs-list" v-for="(item,index) in detailData.sku_select" :key="item._id">
								<view class="attr">{{item.skuName}}</view>
								<view class="attr-value-group">
									<view 
										class="attr-value" 
										:class="attrVal.includes(child.name) ? 'active' : ''"
										v-for="(child,cIdx) in item.children" :key="cIdx"
										@click="selectAttrValue(index,cIdx)">
										{{child.name}}
									</view>
								</view>
							</view>
						</view>
					
						<view class="numSelect">
							<view class="title">购买数量</view>
							<u-number-box v-model="numvalue">
								
							</u-number-box>
						</view>
					</scroll-view>
				</view>
				<view class="footer">
					<u-button 
						color="#EC544F" 
						:disabled="confirmState"
						@click="confirmSumit">确认</u-button>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import {mapGetters, mapMutations} from 'vuex'
	export default {
		name:"pro-select-specss",
		data() {
			return {
				numvalue: 1,
				selectAttrVals: []
			}
		},
		computed: {
			...mapGetters(["proSpecsState", "detailData"]),
			// 筛选属性值
			attrVal(){
				return this.selectAttrVals.map(item => item.name)
			},
			// 未选择属性值的时候应该禁用确认按钮
			confirmState(){
				// let selectLength = this.selectAttrVals.length
				// let sourceDataLength = this.detailData?.sku_select?.length
				// return (selectLength == sourceDataLength ) ? false : true
				return this.selectAttrVals.length != this.detailData?.sku_select?.length	
			}
		},
		methods: {
			// 属性选择确认
			confirmSumit(){
				this.onClose()
			},
			...mapMutations(["SET_PRO_SPECS"]),
			onClose(){
				this.SET_PRO_SPECS(false)
				// 选择属性以后 关闭弹窗就清空选择 保证下次选择都是未选状态
				this.selectAttrVals = []
			},
			// 选择属性值
			selectAttrValue(index, cIdx){
				let attrId = this.detailData.sku_select[index]._id
				let attrValName = this.detailData.sku_select[index].children[cIdx].name
				let obj = {id: attrId, name: attrValName}
				
				let isFindIndex = this.selectAttrVals.findIndex(item => {
					return item.id == obj.id
				})
				if(isFindIndex < 0){
					this.selectAttrVals.push(obj)
				}else {
					this.selectAttrVals.splice(isFindIndex,1,obj)
				}			
			}
		}
	}
</script>

<style lang="scss">
	.pro-specs-wrapper {
		height: 70vh;
		.placeholder-box {
			height: 80rpx;
			width: 100%;
		}
		.container {
			height: calc(100% - 80rpx - 140rpx);
			.scroll-box {
				height: 100%;
				padding: 0 30rpx;
				.pro-item {
					border-bottom: 1px solid $border-color-light;
				}
				.numSelect {
					display: flex;
					align-items: center;
					padding: 30rpx 0;
					border-bottom: 1px solid $border-color-light;
					.title {
						font-size: 32rpx;
						font-weight: bold;
						padding-right: 30rpx;
					}
				}
			}
			.select-specs-wrapper {
				border-bottom: 1px solid $border-color-light;
				padding: 10rpx 0;
				.specs-list {
					padding: 20rpx 0;
					.attr {
						font-size: 32rpx;
						font-weight: bold;
						padding-bottom: 20rpx;
					}
					.attr-value-group {
						@include flex-box-set(start);
						flex-wrap: wrap;
						.attr-value {
							padding: 0 25rpx;
							height: 60rpx;
							border: 1rpx solid $border-color-light;
							margin-right: 20rpx;
							border-radius: 10rpx;
							color: $text-font-color-2;
							margin-bottom: 20rpx;
							@include flex-box-set()
							background: $page-bg-color;
							&.active {
								border-color: $brand-theme-color;
								color: $brand-theme-color;
								background: rgba(236,87,79,0.1);
							}
						}
					}
				}
			}
		}
		.footer {
			height: 140rpx;
			border: 1px solid $border-color-light;
			@include flex-box-set();
			padding: 0 200rpx;
		}
	}
</style>