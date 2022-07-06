<template lang="">
  <div class="card">
    <slot> </slot>
  </div>
</template>
<script>
export default {};
</script>
<style scoped>
.card {
  border: 1px solid red;
  border-radius: 12px;
  padding: 1rem;
  margin: 2rem auto;
  max-width: 40rem;
}
</style>
