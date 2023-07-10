<template>
	<view class="product-stepper">
		<u-number-box v-model="dataItem.numvalue" min="0" max="99" @change="updateNumvalue">
			<view slot="minus" class="minus numbtn" :class="dataItem.numvalue <=0 ? 'none' : ''">
				  <u-icon name="minus" size="12" color="#ccc"></u-icon>
				</view>
				<text slot="input" class="input" :class="dataItem.numvalue <=0 ? 'none' : ''">
					{{dataItem.numvalue}}
				</text>
				<view slot="plus" class="plus numbtn">
				  <u-icon name="plus" size="12" color="#fff"></u-icon>
				</view>
		</u-number-box>	
	</view>
</template>

<script>
	import {mapMutations} from 'vuex'
	export default {
		name:"product-stepper",
		data(){
			return {
				dataItem: this.item
			}
		},
		props: {
			item: {
				type: Object,
				default: () => {}
			} 
		},
		methods: {
			...mapMutations(["setProCarList"]),
			updateNumvalue(e){
				this.setProCarList({pro:this.item, num: e.value})
			}
		}
	}
</script>

<style lang="scss">
	.product-stepper {
		.numbtn {
			width: 40rpx;
			height: 40rpx;
			@include flex-box-set()
		}
		.minus {border: 1px solid #ccc;}
		.input {
			width: 60rpx;
			height: 40rpx;
			font-size: 26rpx;
			color: #888;
			@include flex-box-set();
		}
		.plus {background: $brand-theme-color;}
		.none {display: none;}
	}
</style>