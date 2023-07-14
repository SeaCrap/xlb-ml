const cars = {
	state: {
		proCarList: []
	},
	mutations: {
		SET_PRO_CART_LIST(state,params=null){
			// 如果没有传递就是清空购物车
			if(!params) return state.proCarList = []
			
			let {pro, num} = params
			let caritem = {
				goodsid: pro._id || pro.goodsid,
				numvalue: num,
				name: pro.name,
				price: pro.price,
				before_price: pro.before_price,
				thumb: pro.thumb,
				attrVals: pro.attrVals || null,
				isSpecs: pro.isSpecs || false // 是否选规格页面加购
			}
			let idx = state.proCarList.findIndex(car => {
				let goodsid = car.goodsid
				let caritemid = caritem.goodsid
				let attrVals1 = JSON.stringify(car.attrVals?.sort())
				let attrVals12 = JSON.stringify(caritem.attrVals?.sort())
				if(car.attrVals){
					return goodsid == caritemid && attrVals1 == attrVals12
				}else {
					return car.goodsid == caritem.goodsid
				}
			})
			if(idx < 0){
				state.proCarList.unshift(caritem)
			}else {
				if(caritem.isSpecs){
						state.proCarList[idx].numvalue += caritem.numvalue
				}else {
						state.proCarList[idx].numvalue = caritem.numvalue
				}
				if(state.proCarList[idx].numvalue <= 0) state.proCarList.splice(idx, 1)
			}
		}
	}
}
export default cars