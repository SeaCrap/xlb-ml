import Vue from 'vue'
import Vuex from 'vuex'
import system from '@/store/modules/system.js'
import cars from '@/store/modules/cars.js'
import brand from '@/store/modules/brand.js'
import goods from '@/store/modules/goods.js'
import getters from '@/store/modules/getters.js'
import createPersistedState from "vuex-persistedstate"

Vue.use(Vuex)

const store = new Vuex.Store({
	getters,
	modules: {
		system,
		cars,
		brand,
		goods
	},
	plugins: [
		createPersistedState({
			paths: ['cars',"system"],
			storage: {
				getItem: (key) => uni.getStorageSync(key),
				setItem: (key,value) => uni.setStorageSync(key,value),
				removeItem: (key) => uni.removeStorageSync(key)
			}
		})
	]
})
export default store