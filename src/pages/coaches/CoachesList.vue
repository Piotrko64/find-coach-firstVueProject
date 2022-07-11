<template>
  <div>
    <!-- {{ this.$store.getters['auth/token'] }} -->
    <base-dialog :show="!!error" title="error" @close="handleError">
      <p>{{ error }}</p>
    </base-dialog>
    <coach-filter @change-filter="changeList"></coach-filter>
    <section>
      <base-card>
        <div class="controls">
          <base-button mode="outline" @click="loadCoaches(true)"
            >REFRESH</base-button
          >
          <base-button
            v-if="isAuthenticated && !isCoach && !isLoading"
            link
            to="/register"
            >REGISTER AS COACH</base-button
          >
        </div>
        <div v-if="isLoading"><base-spinner></base-spinner></div>
        <ul v-else-if="hasCoaches">
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
  </div>
</template>
<script>
import CoachItem from '../../components/coaches/CoachItem.vue';
import CoachFilter from '../../components/coaches/CoachFilter.vue';

import BaseCard from '../../components/ui/BaseCard.vue';
import BaseSpinner from '../../components/ui/BaseSpinner.vue';
import BaseDialog from '../../components/ui/BaseDialog.vue';

export default {
  data() {
    return {
      error: null,
      isLoading: true,
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
    BaseSpinner,
    BaseDialog,
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
      return !this.isLoading && this.$store.getters['coaches/hasCoaches'];
    },
    isAuthenticated() {
      return this.$store.getters['auth/isAuthenticated'];
    },
  },
  methods: {
    handleError() {
      this.error = null;
    },
    changeList(filter) {
      this.activeFilter = filter;
    },
    async loadCoaches(refresh = false) {
      this.isLoading = true;
      try {
        await this.$store.dispatch('coaches/loadCoaches', {
          forceRefresh: refresh,
        });
      } catch (err) {
        this.error = err.message || 'Something went wrong!';
      }
      this.isLoading = false;
    },
  },
  created() {
    this.loadCoaches();
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
