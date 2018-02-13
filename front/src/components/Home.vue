<template>
  <div  >
          <!-- Title -->
          <div align='center' style="margin-top:10px"><h4>Gif</h4></div>
          <div v-bind:id="gif._id"  class="list-group-item list-group-item-action" @click="listclick( gif )" v-for="(gif,key) in gifdata" v-bind:key="key">
          <!-- Date/Time -->
          <div class="row">
          <div class="col-1" style="font-size:10px">{{ gif.count }}</div>
          <div class="col-8" style="font-size:12px">{{ gif.title }}</div>        
          <div class="col-1" style="font-size:12px">{{ gif.author }}</div> 
          <div class="col-1" style="font-size:12px;text-align:center;padding-right:0px">{{ gif.last_update}}</div>
          <!-- class="col-2" <div style="font-size:10px">{{ gif.last_update}}</div> -->
          <div class="col-1" style="font-size:12px;text-align:center;padding-right:1px">{{ gif.views }}</div> 
          </div>
          <!-- Comments Form -->          

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
            <div id="comment"  style="display:none;margin-top:10px;border:1px solid lightgray">
            <div style="margin:10px">
              <form>
                <div class="row">
                  <div class="col-3" v-if="user">
                    <img  :src="user.photoURL">
                    <p>{{ user.displayName }}</p>
                  </div>
                  <div class="col-3" v-if="user == null">
              <input v-model="name" type="text" name="name" placeholder="Name" style="width:130px;margin:6px"/>
              <input v-model="password" type="password" name="password" placeholder="Password" style="width:130px;margin:6px"/>
                  </div>
                <div class="col-9">
                  <textarea class="form-control" rows="3"></textarea>
                <button type="submit" class="btn btn-primary btn-sm" 
                style="float:right;margin-top:10px">submit</button>
                </div>
                </div>
                
              </form>
            </div>
          </div>




        </div>
        <!-- Sidebar Widgets Column -->
          <!-- Search Widget -->
          
</template>
<script>
import axios from 'axios'
import Vue from 'vue'
import * as firebase from 'firebase'
export default {  
  data () {
    return {
      page:[],
        gifdata:{
        },
        openid:'',
        openNumber:'',
        open:false,
        user:{},
        password:null,
        name:null
    }
  },
  compute: {
      loading(){
        return this.$store.getters.loading
      },
  },
  methods : {
    next(){
      for(var i in this.page){
        // this.page[i]=this.page[i]+10
        Vue.set(this.page,i,this.page[i]+10)
        }
    },
    previous(){
      if(this.page[0]>10){
        for(var i in this.page){
          Vue.set(this.page,i,this.page[i]-10)
        }
      }
    },
    pagination(p){
      this.$store.dispatch('setLoading',true)      
            // 리눅스 셋팅
            // axios.get('http://220.230.124.148:5000/api/getgif/1')
            axios.get('http://127.0.0.1:5000/api/getgif/'+p)
            .then(response => {        
                for(var r in response.data){
                  var temptime = new Date(response.data[r].last_update)
                  var temptime_hour = temptime.getUTCHours()
                  var temptime_min = temptime.getUTCMinutes()
                  var tt = temptime_hour+":"+temptime_min
                  response.data[r].last_update = tt
                }        
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
      var user = firebase.auth().currentUser
      if(user){
        this.user = user
      }else{
        this.user=null
      }
      var com = document.getElementById('comment')
      if(this.open && this.openid == gif._id){
        document.getElementById(gif.number).remove()
        com.style.display="none"
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
        com.style.display="block"
        // document.getElementById(gif._id).appendChild(div)
        document.getElementById(gif._id).after(com)
        document.getElementById(gif._id).after(div)
        this.openid=gif._id
        this.openNumber=gif.number
        this.open=true
        axios.put('http://127.0.0.1:5000/api/getgif/views/'+gif._id)
            .then(response => { 
            })
            .catch(e => {
            console.log(e)
            })
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
        com.style.display="block"
        document.getElementById(gif._id).after(com)
        // document.getElementById(gif._id).appendChild(div)
      document.getElementById(gif._id).after(div)
    
        this.openid=gif._id
        this.openNumber=gif.number
        this.open=true
        axios.put('http://127.0.0.1:5000/api/getgif/views/'+gif._id)
            .then(response => { 
            })
            .catch(e => {
            console.log(e)
            })
      }
    }
  },
  created() {
            for(var i=0;i<10;i++){
              this.page[i]=i+1      
            }
            
            this.$store.dispatch('setLoading',true)
            axios.get('http://127.0.0.1:5000/api/getgif/1')
            // 리눅스 셋팅
            // axios.get('http://220.230.124.148:5000/api/getgif/1')
            .then(response => {
                for(var r in response.data){
                  var temptime = new Date(response.data[r].last_update)
                  var temptime_hour = temptime.getUTCHours()
                  var temptime_min = temptime.getUTCMinutes()
                  var tt = temptime_hour+":"+temptime_min
                  response.data[r].last_update = tt
                }        
                for(var i in response.data){
                  Vue.set(this.gifdata,i,response.data[i])
                }

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