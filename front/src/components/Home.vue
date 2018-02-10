<template>
  <div  >
          <!-- Title -->
          <div align='center' style="margin-top:10px"><h4>Gif</h4></div>
          <div v-bind:id="gif._id"  class="list-group-item list-group-item-action" @click="listclick( gif )" v-for="(gif,key) in gifdata" v-bind:key="key">
          <!-- Date/Time -->
          <div class="row">
          <div class="col-1" style="font-size:12px">{{ gif.count }}</div>
          <div class="col-8" style="font-size:14px">{{ gif.title }}</div>        
          <div class="col-1" style="font-size:14px">Auther</div> 
          <div class="col-1" style="font-size:14px">Date</div>
          <!-- class="col-2" <div style="font-size:10px">{{ gif.last_update}}</div> -->
          <div class="col-1" style="font-size:14px">Views</div> 
          </div>
          <!-- Comments Form -->          
          <!-- <div class="card my-4">
            <h6 class="card-header">코멘트 남기기:</h6>
            <div class="card-body">
              <form>
                <div class="form-group">
                  <textarea class="form-control" rows="3"></textarea>
                </div>
                <button type="submit" class="btn btn-primary">확인</button>
              </form>
            </div>
          </div> -->
          </div> 
          <!-- 댓글용으로 남겨둠 -->
          <!-- <span class="badge badge-secondary" v-if="gif.count" > -->
            <ul class="pagination" style="margin-top:10px">
            <!-- <li class="page-item disabled"> -->
            <li class="page-item" @click="previous">
              <a class="page-link">Previous</a>
            </li>
            <!-- <li class="page-item active"><span class="page-link">2<span class="sr-only">(current)</span></span></li> -->
            <li class="page-item" :id="i" 
            v-for="(i,index) in page" :key="index" @click="pagination(i)">
            <a class="page-link">{{ i }}</a></li>
            <li class="page-item" @click="next"><a class="page-link">Next</a></li>
          </ul>              
        </div>
        <!-- Sidebar Widgets Column -->
          <!-- Search Widget -->
          
</template>
<script>
import axios from 'axios'
import Vue from 'vue'
export default {  
  data () {
    return {
      page:[],
        gifdata:{
        },
        openid:'',
        openNumber:'',
        open:false,
    }
  },
  compute: {
      loading(){
        return this.$store.getters.loading
      }
  },
  methods : {
    next(){
      for(var i in this.page){
        // this.page[i]=this.page[i]+10
        Vue.set(this.page,i,this.page[i]+10)
        }
        console.log(this.page[0])
    },
    previous(){
      if(this.page[0]>10){
        for(var i in this.page){
          Vue.set(this.page,i,this.page[i]-10)
        }
      }
      console.log(this.page[0])
    },
    pagination(p){
      this.$store.dispatch('setLoading',true)
      
            // 리눅스 셋팅
            // axios.get('http://220.230.124.148:5000/api/getgif/1')
            axios.get('http://127.0.0.1:5000/api/getgif/'+p)
            .then(response => {        
                // this.gifdata = response.data
                for(var i in response.data){
                  Vue.set(this.gifdata,i,response.data[i])
                }
                this.$store.dispatch('setLoading',false)
            })
            .catch(e => {
            console.log(e)
            this.$store.dispatch('setLoading',false)
            })
    },
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
          img.style.maxWidth="100%"        
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
          img.style.maxWidth="100%"               
          div.appendChild(img)
        }        
        div.id=gif.number        
        document.getElementById(gif._id).appendChild(div)
        this.openid=gif._id
        this.openNumber=gif.number
        this.open=true
      }
    }
  },
  mounted() {
            for(var i=0;i<10;i++){
              this.page[i]=i+1      
            }
            
            this.$store.dispatch('setLoading',true)
            axios.get('http://127.0.0.1:5000/api/getgif/1')
            // 리눅스 셋팅
            // axios.get('http://220.230.124.148:5000/api/getgif/1')
            .then(response => {        
                this.gifdata = response.data
                this.$store.dispatch('setLoading',false)
            })
            .catch(e => {
            console.log(e)
            this.$store.dispatch('setLoading',false)
            })
  }
}
</script>

<style scoped>
</style>