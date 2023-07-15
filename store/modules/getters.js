const getters = {
	statusBarHeight: state => state.system.statusBarHeight,
	titleBarHeight: state => state.system.titleBarHeight,
	bodyBarHeight: state => {
		if(state.system.isFold) return state.system.titleBarHeight
		return 100
	},
	totalHeight: state => {
		if(state.system.isFold){
			return state.system.statusBarHeight + state.system.titleBarHeight + 10
		}
		return state.system.statusBarHeight + state.system.titleBarHeight + 100 + 10
	},
	foldState: state => state.system.isFold,
	proCarList: state => state.cars.proCarList,
	totalPrice: state => {
		return state.cars.proCarList.reduce((prev,next) => {
			return prev += next.price*next.numvalue
		},0)
	},
	
	// 优惠了多少
	preferentialPrice: state => {
		let price = state.cars.proCarList.reduce((prev,next) => {
			return prev += next.price*next.numvalue
		},0)
		let beforePrice = state.cars.proCarList.reduce((prev,next) => {
			return prev += next.before_price*next.numvalue
		},0)
		return beforePrice - price
	},
	
	buyNum: state => {
		return state.cars.proCarList.reduce((prev,next) => {
			return prev += next.numvalue
		},0)
	},
	brandInfo: state => state.brand.brandInfo,
	detailPopState: state => state.goods.detailPopState,
	detailData: state => state.goods.detailData,
	proSpecsState: state => state.goods.proSpecsState
}
export default getters