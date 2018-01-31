<template>
  <div>
    <app-header></app-header>
    <router-view/>
  </div>
</template>

<script>
import Header from './components/Header.vue'
export default {
  components: {
      appHeader: Header
  },
  data () {
    return {
    }
  }
}
</script>

<style>
</style>
