<template>
  <div >
    <!-- <button @click="getgif">gif를 가져오자</button> -->
    <div class="list-group" v-for="gif in gifdata">
      <a href="#" class="list-group-item list-group-item-action ">
        {{ gif.title }}
        <span class="badge badge-primary badge-pill">{{ gif.srcs.length }}</span>
      </a>
    </div>
    
  </div>
</template>
<script>
import axios from 'axios'
export default {    
  data () {
    return {
        gifdata:{}
    }
  },
  compute: {

  },
  methods : {
  },
  mounted() {      
            console.log('create')
            axios.get(`http://220.230.124.148:5000/api/getgif/20`)
            .then(response => {        
                console.log(response)    
                this.gifdata = response.data
            })
            .catch(e => {
            console.log(e)
            })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>