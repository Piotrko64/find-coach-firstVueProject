<template>
  <div>
    <section>
      <base-card>
        <h2>Register as a coach now</h2>
        <coach-form @save-data="saveData"></coach-form>
      </base-card>
    </section>
  </div>
</template>
<script>
import CoachForm from '../../components/coaches/CoachForm.vue';
export default {
  components: {
    CoachForm,
  },
  methods: {
    saveData(data) {
      console.log(this.$store);
      this.$store.dispatch('coaches/registerCoach', data);
      this.$router.push('/');
    },
  },
};
</script>
<style scoped></style>
