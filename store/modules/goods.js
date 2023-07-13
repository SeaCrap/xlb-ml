const brandCloudObj = uniCloud.importObject("xlb-mall-brand")
const goods = {
	state: {
		detailPopState: false,
		detailData: {}, // 每一个商品对象
		proSpecsState: false
	},
	mutations: {
		SET_DETAIL_START(state,bool){
			state.detailPopState = bool
		},
		SET_DETAIL_DATA(state,detailInfo){
			detailInfo.description = detailInfo.description.replace(/\n/g, "<br/>")
			state.detailData = detailInfo
		},
		SET_PRO_SPECS(state,bool){
			state.proSpecsState = bool
		}
	}
}
export default goods