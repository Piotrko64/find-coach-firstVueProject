<template>
  <section>FILTER</section>
  <coach-filter @change-filter="changeList"></coach-filter>
  <section>
    <base-card>
      <div class="controls">
        <base-button mode="outline">REFRESH</base-button>
        <base-button v-if="!isCoach" link to="/register"
          >REGISTER AS COACH</base-button
        >
      </div>

      <ul v-if="hasCoaches">
        <coach-item
          v-for="coach in filteredCoaches"
          :key="coach.id"
          :id="coach.id"
          :firstName="coach.firstName"
          :lastName="coach.lastName"
          :rate="coach.hourlyRate"
          :areas="coach.areas"
        >
        </coach-item>
      </ul>
      <h3 v-else>No Coaches Found</h3>
    </base-card>
  </section>
</template>
<script>
import CoachItem from '../../components/coaches/CoachItem.vue';
import CoachFilter from '../../components/coaches/CoachFilter.vue';

import BaseCard from '../../components/ui/BaseCard.vue';

export default {
  data() {
    return {
      activeFilter: {
        frontend: true,
        backend: true,
        career: true,
      },
    };
  },
  components: {
    CoachItem,
    BaseCard,
    CoachFilter,
  },
  computed: {
    filteredCoaches() {
      const coaches = this.$store.getters['coaches/coaches'];

      return coaches.filter((coach) => {
        for (let key in this.activeFilter) {
          if (this.activeFilter[key] && coach.areas.includes(key)) {
            return true;
          }
        }
        return false;
      });
    },

    isCoach() {
      return this.$store.getters['coaches/isCoach'];
    },

    hasCoaches() {
      return this.$store.getters['coaches/hasCoaches'];
    },
  },
  methods: {
    changeList(filter) {
      this.activeFilter = filter;
    },
  },
};
</script>
<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>
