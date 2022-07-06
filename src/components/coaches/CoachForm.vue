<template>
  <form @submit.prevent="submitForm">
    <div class="form-control" :class="{ invalid: !firstName.isValid }">
      <label for="firstName">First Name </label>
      <input type="text" id="firstname" v-model.trim="firstName.val" />
    </div>
    <div :class="{ invalid: !lastName.isValid }">
      <label for="lastName">Last Name </label>
      <input type="text" id="lastName" v-model.trim="lastName.val" />
    </div>
    <div :class="{ invalid: !description.isValid }">
      <label for="description">Description </label>
      <textarea
        id="description"
        rows="5"
        v-model.trim="description.val"
      ></textarea>
    </div>
    <div :class="{ invalid: !rate.isValid }">
      <label for="rate">Hourly Rate </label>
      <input id="rate" type="number" v-model.number="rate.val" />
    </div>
    <div class="form-control" :class="{ invalid: !areas.isValid }">
      <h3>Areas of Expertise</h3>
      <div>
        <input
          type="checkbox"
          id="frontend"
          value="frontend"
          v-model="areas.val"
        />
        <label for="frontend">Frontend Developer</label>
      </div>
      <div>
        <input
          type="checkbox"
          id="backend"
          value="backend"
          v-model="areas.val"
        />
        <label for="backend">Backend Developer</label>
      </div>
      <div>
        <input type="checkbox" id="career" value="career" v-model="areas.val" />
        <label for="career">Career</label>
      </div>
    </div>

    <p v-if="!formIsValid">Please fix errors!!!</p>
    <base-button>Register</base-button>
  </form>
</template>
<script>
export default {
  emits: ['save-data'],
  data() {
    return {
      firstName: { val: '', isValid: true },
      lastName: { val: '', isValid: true },
      description: { val: '', isValid: true },
      rate: { val: 0, isValid: true },
      areas: { val: [], isValid: true },
      formIsValid: true,
    };
  },
  methods: {
    validateForm() {
      this.formIsValid = true;
      const arrayInputValue = [
        this.firstName,
        this.lastName,
        this.description,
        this.rate,
      ];
      console.log(this.firstName);
      arrayInputValue.forEach((input) => {
        input.isValid = true;
        if (input.val === '') {
          input.isValid = false;
          this.formIsValid = false;
        }
      });
      if (this.rate.val === 0) {
        this.rate.isValid = false;
        this.formIsValid = false;
      }

      if (this.areas.val.length === 0) {
        this.areas.isValid = false;
        this.formIsValid = false;
      }
    },
    submitForm() {
      this.validateForm();
      if (!this.formIsValid) {
        return;
      }
      const formData = {
        first: this.firstName.val,
        last: this.lastName.val,
        desc: this.description.val,
        rate: this.rate.val,
        areas: this.areas.val,
      };
      this.$emit('save-data', formData);
    },
  },
};
</script>
<style scoped>
.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}

input[type='checkbox'] + label {
  font-weight: normal;
  display: inline;
  margin: 0 0 0 0.5rem;
}

input,
textarea {
  display: block;
  width: 100%;
  border: 1px solid #ccc;
  font: inherit;
}

input:focus,
textarea:focus {
  background-color: #f0e6fd;
  outline: none;
  border-color: #3d008d;
}

input[type='checkbox'] {
  display: inline;
  width: auto;
  border: none;
}

input[type='checkbox']:focus {
  outline: #3d008d solid 1px;
}

h3 {
  margin: 0.5rem 0;
  font-size: 1rem;
}

.invalid label {
  color: red;
}

.invalid input,
.invalid textarea {
  border: 1px solid red;
}
</style>
