<template>
  <div class="container-fluid" >
    <!-- <button @click="getgif">gif를 가져오자</button> -->
    <div class="list-group " v-for="gif in gifdata">
      <button v-bind:id="gif._id" class="list-group-item list-group-item-action list-group-item-action " @click="listclick( gif )" >
       <!-- <span class="badge badge-secondary">{{ gif.srcs.length }}</span>&nbsp;&nbsp;&nbsp; -->      
       <span class="badge badge-secondary" v-if="gif.count" >{{ gif.count }}</span>&nbsp;&nbsp;&nbsp;
        <span style="font-size:14px">{{ gif.title }}</span>        
        <span style="float:right;font-size:10px">{{ gif.last_update}}</span>
      </button>
    </div>
    
  </div>
</template>
<script>
import axios from 'axios'
export default {
    
  data () {
    return {
        gifdata:{},
        openid:'',
        openNumber:'',
        open:false,
    }
  },
  compute: {

  },
  methods : {
    listclick(gif) {
      if(this.open && this.openid == gif._id){
        document.getElementById(gif.number).remove()
        this.open=false
      }
      else if(this.open && this.openid != gif._id){
        document.getElementById(this.openNumber).remove()
        var div = document.createElement("div")
      
        for(var i in gif.srcs){        
          var br = document.createElement('br')            
          div.appendChild(br)
          var img = document.createElement('img')     
          img.src=gif.srcs[i]
          img.style.maxWidth="500px"        
          div.appendChild(img)
        }        
        div.id=gif.number        
        document.getElementById(gif._id).appendChild(div)
        this.openid=gif._id
        this.openNumber=gif.number
        this.open=true
      }else{
        var div = document.createElement("div")       

        for(var i in gif.srcs){
          var br = document.createElement('br')
          div.appendChild(br)
          var img = document.createElement('img')    
          img.src=gif.srcs[i] 
          img.style.maxWidth="500px"               
          div.appendChild(img)
        }        
        div.id=gif.number        
        document.getElementById(gif._id).appendChild(div)
        this.openid=gif._id
        this.openNumber=gif.number
        this.open=true
      }
      // document.body.appendChild(btn)
      // document.getElementById(number).appendChild(btn)
      
    }
  },
  created() {      
            console.log('create')
            axios.get('http://127.0.0.1:5000/api/getgif/1')
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