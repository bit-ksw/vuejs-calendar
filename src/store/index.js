import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import moment from 'moment-timezone'
moment.tz.setDefault('UTC');

import Axios from 'axios';

export default new Vuex.Store({
	state: {
		currentYear: 2017,
		currentMonth: 8,
		eventFormPosX: 0,
		eventFormPosY: 0,
		eventFormActive: false,
		events: [
			{ description: 'Random event 1', date: moment('2017-08-18', 'YYYY-MM-DD') },
			{ description: 'Random event 2', date: moment('2017-08-19', 'YYYY-MM-DD') },
			{ description: 'Random event 3', date: moment('2017-08-20', 'YYYY-MM-DD') },
		],
		eventFormDate: moment()
	},
	mutations: {
		setCurrentMonth(state, payload) {
			state.currentMonth = payload;
		},
		setCurrentYear(state, payload) {
			state.currentYear = payload;
		},
		eventFormPos(state, payload) {
			state.eventFormPosX = payload.x;
			state.eventFormPosY = payload.y;
		},
		eventFormActive(state, payload) {
			state.eventFormActive = payload;
		},
		addEvent(state, payload) {
			state.events.push(payload);
		},
		eventFormDate(state, payload) {
			state.eventFormDate = payload
		}
	},
	actions: {
		addEvent(context, payload) {
			let obj = {
				description: payload,
				date: context.state.eventFormDate
			};
			context.commit('addEvent', obj);
			Axios.post('/add_event', obj);
		}
	}
});