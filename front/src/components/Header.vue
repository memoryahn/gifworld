<template>
  <div class="container">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container">
        <a class="navbar-brand" href="/">GifWorld</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarResponsive">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item">
              <a class="nav-link" href="/#/forum">Forum</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/#/Signin" v-if="!userIsAuthenticated">Signin</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/#/Signup" v-if="!userIsAuthenticated">Signup</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/" @click="onLogout" v-if="userIsAuthenticated">Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>
<script>
export default {
  data () {
    return {
    }
  },
  computed:{
    user(){
      return this.$store.getters.user
    },
    userIsAuthenticated(){
      return this.$store.getters.user !== null && this.$store.getters.user !== undefined
    }
  },
  methods:{
    onLogout(){
      this.$store.dispatch('logout')
    }
  }
}
</script>
<style scoped>
</style>
