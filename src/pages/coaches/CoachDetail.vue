<template>
  <section>
    <base-card>
      <h2>{{ fullName }}</h2>
      <h3>${{ selectedCoach.hourlyRate }}/hour</h3>
    </base-card>
  </section>
  <section>
    <base-card>
      <header>
        <h2>Interesred?</h2>
        <base-button link :to="contactLink">Contact</base-button>
      </header>
      <router-view></router-view>
    </base-card>
  </section>
  <section>
    <base-card>
      <base-badge
        v-for="area in selectedCoach.areas"
        :key="area"
        :type="area"
        :title="area"
      >
      </base-badge>
      <p>{{ selectedCoach.description }}</p>
    </base-card>
  </section>
</template>
<script>
import BaseButton from '../../components/ui/BaseButton.vue';
export default {
  components: { BaseButton },
  props: ['id', 'areas'],
  data() {
    return {
      selectedCoach: null,
    };
  },
  computed: {
    fullName() {
      return this.selectedCoach.firstName + ' ' + this.selectedCoach.lastName;
    },
    contactLink() {
      return this.$route.path + '/contact';
    },
  },
  created() {
    this.selectedCoach = this.$store.getters['coaches/coaches'].find(
      (coach) => coach.id === this.id
    );
  },
};
</script>
<style></style>
