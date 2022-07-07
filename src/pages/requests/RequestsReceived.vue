<template>
  <section>
    <base-card>
      <header>
        <h2>REQUESTS RECEIVED</h2>
      </header>

      <ul v-if="isReq">
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
</template>
<script>
import RequestsItem from '../../components/requests/RequestsItem.vue';

export default {
  component: {
    RequestsItem,
  },
  data() {
    return {};
  },
  computed: {
    isReq() {
      return this.$store.getters['requests/hasRequests'];
    },
    allReq() {
      return this.$store.getters['requests/showRequests'];
    },
  },
  mounted() {
    console.log(this.allReq);
  },
  components: { RequestsItem },
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
