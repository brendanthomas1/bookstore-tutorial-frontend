<template>
  <div id="app">
    <template v-if="currentUser">
      <Navbar />
    </template>
    <div class='container-fluid'>
      <router-view/>
      <template v-if="currentUser">
        <Foot />
      </template>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Navbar from '@/components/Navbar';
import Foot from '@/components/Foot';

export default {
  name: 'App',
  components: {
    Navbar,
    Foot,
  },
  computed: {
    ...mapGetters({ currentUser: 'currentUser' }),
  },
  created() {
    this.checkCurrentLogin();
  },
  updated() {
    this.checkCurrentLogin();
  },

  methods: {
    checkCurrentLogin() {
      if (!localStorage.token && this.$route.path !== '/') {
        this.$router.push(`/?redirect=${this.$route.path}`);
      }
    },
  },
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
}
body {
  background: #272D2D;
  color: #edf5fc;
}
.btn-green {
  background: #23CE6B;
  color: #fff;
}
.btn-green:hover {
  background: #1daf5a;
}

</style>
