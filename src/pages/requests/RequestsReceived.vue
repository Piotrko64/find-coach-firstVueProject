<template>
  <div>
    <base-dialog :show="!!error" title="error" @close="handleError">
      <p>{{ error }}</p>
    </base-dialog>
    <coach-filter @change-filter="changeList"></coach-filter>
    <section>
      <base-card>
        <header>
          <h2>REQUESTS RECEIVED</h2>
        </header>
        <base-spinner v-if="isLoading"></base-spinner>
        <ul v-else-if="isReq">
          <requests-item
            v-for="req in allReq"
            :key="req.id"
            :email="req.email"
            :message="req.message"
          ></requests-item>
        </ul>
        <h3 v-else>NO REUESTS</h3>
      </base-card>
    </section>
  </div>
</template>
<script>
import RequestsItem from '../../components/requests/RequestsItem.vue';
import BaseDialog from '../../components/ui/BaseDialog.vue';

export default {
  component: {
    RequestsItem,
  },
  data() {
    return {
      isLoading: false,
      error: null,
    };
  },
  methods: {
    async loadRequests() {
      this.isLoading = true;
      try {
        await this.$store.dispatch('requests/fetchRequests');
      } catch (err) {
        this.error = err || 'ERROR';
      }
      this.isLoading = false;
    },
    handleError() {
      this.error = null;
    },
  },
  created() {
    this.loadRequests();
  },
  computed: {
    isReq() {
      return this.$store.getters['requests/hasRequests'];
    },
    allReq() {
      return this.$store.getters['requests/showRequests'];
    },
  },
  mounted() {},
  components: { RequestsItem, BaseDialog },
};
</script>
<style scoped>
header {
  text-align: center;
}

ul {
  list-style: none;
  margin: 2rem auto;
  padding: 0;
  max-width: 30rem;
}

h3 {
  text-align: center;
}
</style>
