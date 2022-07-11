<template>
  <div>
    <base-dialog :show="!!error" title="An error occured" @close="error = null">
      <p>{{ error }}</p>
    </base-dialog>
    <base-dialog fixed :show="isLoading" title="Authentication...">
      <base-spinner></base-spinner>
    </base-dialog>
    <base-card>
      <form @submit.prevent="submitForm">
        <div class="form-control">
          <label for="email">E-mail</label>
          <input type="email" id="email" v-model="email" />
        </div>
        <div class="form-control">
          <label for="password">Password</label>
          <input type="password" id="password" v-model="password" />
        </div>
        <p v-if="!formIsValid">Error in form</p>
        <base-button>{{ actionNameForm }}</base-button>
        <base-button type="button" mode="flat" @click="switchAuthMode">{{
          insteadButton
        }}</base-button>
      </form>
    </base-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      formIsValid: true,
      mode: 'login',
      isLoading: false,
      error: null,
    };
  },
  methods: {
    async submitForm() {
      this.formIsValid = true;
      if (
        this.email === '' ||
        !this.email.includes('@') ||
        this.password.length < 6
      ) {
        this.formIsValid = false;
        return;
      }
      this.isLoading = true;
      try {
        if (this.mode === 'login') {
          await this.$store.dispatch('auth/login', {
            email: this.email,
            password: this.password,
          });
        } else {
          await this.$store.dispatch('auth/signup', {
            email: this.email,
            password: this.password,
          });
        }
        this.$router.push('/coaches');
      } catch (err) {
        this.error = new Error(err.message || 'FAILED AUTHENTICATE');
      }
      console.log(this.error);
      this.isLoading = false;
    },
    switchAuthMode() {
      this.mode = this.mode === 'login' ? 'signup' : 'login';
    },
  },
  computed: {
    insteadButton() {
      const nameAction = this.mode === 'login' ? 'Sign up' : 'Login';
      return 'Instead ' + nameAction;
    },
    actionNameForm() {
      return this.mode === 'login' ? 'Login' : 'Sign up';
    },
  },
};
</script>
<style scoped>
form {
  margin: 1rem;

  padding: 1rem;
}

.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}

input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
}

input:focus,
textarea:focus {
  border-color: #3d008d;
  background-color: #faf6ff;
  outline: none;
}
</style>
