<template>
	<div>
		<div id="header">
			<div>
				<h1>Vue.js Calendar</h1>
			</div>
			<div>
				<current-month></current-month>
			</div>
		</div>
		<div id="day-bar">
			<div>Mon</div>
			<div>Tue</div>
			<div>Wed</div>
			<div>Thu</div>
			<div>Fri</div>
			<div>Sat</div>
			<div>Sun</div>
		</div>
		<div id="calendar">
			<div v-for="week in weeks" class="calendar-week">
			<calendar-day v-for="day in week" :day="day"></calendar-day>
		</div>
		<event-form></event-form>
	</div>
</div>
</template>

<script>
import CalendarDay from './CalendarDay.vue';
import CurrentMonth from './CurrentMonth.vue';
import EventForm from './EventForm.vue';
export default {
  data() {
    return {
      month: 8,
      year: 2017
    };
  },
  computed: {
    days() {
      let days = [];
      let currentDay = this.$moment(`${this.year}-${this.month}-1`, 'YYYY-M-D');
      do {
        days.push(currentDay);
        currentDay = this.$moment(currentDay).add(1, 'days');
      } while ((currentDay.month() + 1) === this.month);      

      currentDay = this.$moment(days[0]);

      const SUNDAY = 0;
      const MONDAY = 1;

      if (currentDay.day() !== MONDAY) {
        do {
          currentDay = this.$moment(currentDay).subtract(1, 'days');
          days.unshift(currentDay);
        } while(currentDay.day() !== MONDAY);
      }

      // Add follwing days to end
      currentDay = this.$moment(days[days.length -1]);

      if (currentDay.day() !== SUNDAY) {
        do {
          currentDay = this.$moment(currentDay).add(1, 'days');
          days.push(currentDay);
        } while(currentDay.day() !== SUNDAY);
      }

      return days;
    },
    weeks() {
		let weeks = [];
		let week = [];

		for (let day of this.days) {
			week.push(day);
			if (week.length === 7) {
				weeks.push(week);
				week = [];
			}
		}

		return weeks;
 	}
  },

  created() {
    //maintenanceService.maintenanceList().then((data: MaintenanceResponse) => {
    
    //});
    console.log(this.$moment);
  },
  components: {
    CalendarDay,
    CurrentMonth,
    EventForm
  }
}
</script>


