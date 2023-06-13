const cars = {
	state: {
		proCarList: []
	},
	mutations: {
		setProCarList(state,params){
			let {pro, num} = params
			let caritem = {
				goodsid: pro.id || pro.goodsid,
				numvalue: num,
				name: pro.name,
				price: pro.price,
				before_price: pro.before_price,
				thumb: pro.thumb
			}
			let idx = state.proCarList.findIndex(car => {
				return car.goodsid == caritem.goodsid
			})
			if(idx < 0){
				state.proCarList.unshift(caritem)
			}else {
				state.proCarList[idx].numvalue = num
				if(state.proCarList[idx].numvalue <= 0) state.proCarList.splice(idx, 1)
			}
		}
	}
}
export default cars