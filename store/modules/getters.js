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
			return prev += next.price
		},0)
	},
	buyNum: state => {
		return state.cars.proCarList.reduce((prev,next) => {
			return prev += next.numvalue
		},0)
	}
}
export default getters