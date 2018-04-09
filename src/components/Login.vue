<template>
  <div class='login-wrapper'>
    <form class='form-signin' @submit.prevent='login'>
      <h3 class='form-signin-heading'>Please Sign In</h3>
      <div v-if="error" class='alert alert-danger'>{{ error }}</div>

      <label for="inputEmail" class="sr-only">Email address</label>
      <input v-model="email" type="email" id="inputEmail" class="form-control"
             placeholder="Email address" required autofocus>

      <label for="inputPassword" class="sr-only">Password</label>
      <input v-model="password" type="password" id="inputPassword"
             class="form-control" placeholder="Password" required>

      <button class="btn btn-green btn-block" type="submit">
        Sign in
      </button>
    </form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: '',
      error: false,
    };
  },

  created() {
    this.checkCurrentLogin();
  },

  updated() {
    this.checkCurrentLogin();
  },

  computed: {
    ...mapGetters({ currentUser: 'currentUser' }),
  },

  methods: {
    checkCurrentLogin() {
      if (this.currentUser) {
        this.$router.replace(this.$route.query.redirect || '/authors');
      }
    },

    login() {
      this.$http.post('/auth', { user: this.email, password: this.password })
        .then(request => this.loginSuccessful(request))
        .catch(() => this.loginFailed());
    },

    loginFailed() {
      this.error = 'Login Failed';
      this.$store.dispatch('logout');
      delete localStorage.token;
    },

    loginSuccessful(req) {
      if (!req.data.token) {
        this.loginFailed();
        return;
      }

      this.error = false;
      localStorage.token = req.data.token;
      this.$store.dispatch('login');

      this.$router.replace(this.$route.query.redirect || '/authors');
    },
  },
};
</script>

<style lang='css'>
.login-wrapper {
  background: #EDF5FC;
  width: 50%;
  margin: 12% auto;
  border-radius: 2.5px;
  animation: fadein 0.6s;
}

@keyframes fadein {
  from { opacity: 0; }
  to   { opacity: 1; }
}

.form-signin {
  max-width: 330px;
  padding: 10% 15px;
  margin: 0 auto;
  color: #272d2d;
}
.form-signin .form-signin-heading,
.form-signin .checkbox {
  margin-bottom: 10px;
}
.form-signin .checkbox {
  font-weight: normal;
}
.form-signin .form-control {
  position: relative;
  height: auto;
  -webkit-box-sizing: border-box;
          box-sizing: border-box;
  padding: 7.5px;
  font-size: 12px;
}
.form-signin .form-control:focus {
  z-index: 2;
}
.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>
