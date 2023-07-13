import Vue from 'vue'
import Vuex from 'vuex'
import system from '@/store/modules/system.js'
import cars from '@/store/modules/cars.js'
import brand from '@/store/modules/brand.js'
import getters from '@/store/modules/getters.js'

Vue.use(Vuex)

const store = new Vuex.Store({
	getters,
	modules: {
		system,
		cars,
		brand
	}
})
export default store