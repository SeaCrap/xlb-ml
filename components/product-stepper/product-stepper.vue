<template>
	<view class="product-stepper">
		<u-number-box v-model="value" min="0" max="99" @change="onChange">
			<view slot="minus" class="minus numbtn" :class="value<=0 ? 'none' : ''">
				  <u-icon name="minus" size="12" color="#ccc"></u-icon>
				</view>
				<text slot="input" class="input" :class="value<=0 ? 'none' : ''">
					{{value}}
				</text>
				<view slot="plus" class="plus numbtn">
				  <u-icon name="plus" size="12" color="#fff"></u-icon>
				</view>
		</u-number-box>	
	</view>
</template>

<script>
	export default {
		name:"product-stepper",
		data() {
			return {
				value: 1
			}
		},
		methods: {
			onChange(e){
				console.log(e)
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