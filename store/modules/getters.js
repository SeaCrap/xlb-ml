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
	foldState: state => state.system.isFold
}
export default getters