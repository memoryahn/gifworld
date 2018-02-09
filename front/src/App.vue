<template>
  <div class="container">
    <div class="row" >
      <app-header></app-header>
      <div class="col-lg-8">
    <router-view/>
      </div>
      <div class="col-md-4">
        <app-side-widget></app-side-widget>
      </div>
      </div>
  </div>
</template>

<script>
import Header from './components/Header.vue'
import SideWidget from './components/SideWidget.vue'
export default {
  components: {
      appHeader: Header,
      appSideWidget: SideWidget
  },
  data () {
    return {
    }
  }
}
</script>

<style>
</style>
