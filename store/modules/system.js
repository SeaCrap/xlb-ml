let systemInfo = uni.getSystemInfoSync()
// 获取状态栏高度
const getStatusBarHeight = () => systemInfo.statusBarHeight || 20
// 获取标题栏高度
const getTitleBarHeight = () => {
	// #ifdef MP-WEIXIN
	let menuBtnInfo = uni.getMenuButtonBoundingClientRect()
	let height = menuBtnInfo.height + (menuBtnInfo.top - getStatusBarHeight()) * 2
	return height
	// #endif
	return 40	
}
const system = {
	state: {
		statusBarHeight: getStatusBarHeight(),
		titleBarHeight: getTitleBarHeight(),
		isFold: false
	},
	mutations: {
		setFoldState(state,bool){
			state.isFold = bool
		}
	}
}
export default system