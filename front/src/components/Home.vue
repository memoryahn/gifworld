<template>
  <div >
    <h3>This is home.</h3>
    <button @click="getgif">gif를 가져오자</button>
    {{ gifdata }}
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
      getgif(){
          console.log('click')
          axios.get(`http://127.0.0.1:8000/api/getgif`)
            .then(response => {            
                this.gifdata = response
            })
            .catch(e => {
            console.log(e)
            })
      }
  },
//   create() {
    // this.$store.dispatch("gifDataInit")        
//   }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>