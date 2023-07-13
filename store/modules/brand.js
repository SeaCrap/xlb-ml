const brandCloudObj = uniCloud.importObject("xlb-mall-brand")
const brand = {
	state: {
		brandInfo: {}
	},
	mutations: {
		SET_BRAND(state,value){
			state.brandInfo = value
		}
	},
	actions: {
		async getBrandInfo(context){
			// 判断 brandInfo 有没有值
			// 通过 keys 返回数组，根据length判断 有值就不用再请求
			let arr = Object.keys(context.state.brandInfo)
			if(arr.length) return
			
			let res = await brandCloudObj.get()
			context.commit("SET_BRAND", res.data[0])
		}
	}
}
export default brand