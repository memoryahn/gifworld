<template>
  <div  >
          <!-- Title -->
          <div align='center' style="margin-top:10px"><h4>Gif</h4></div>
          <div v-bind:id="gif._id"  class="list-group-item list-group-item-action" @click="listclick( gif )" v-for="(gif,key) in gifdata" v-bind:key="key">
          <!-- Date/Time -->
          <span style="font-size:12px">{{ gif.count }}</span>
          <span style="font-size:14px">{{ gif.title }}</span>        
          <span style="float:right;font-size:14px">Auther</span> 
          <span style="float:right;font-size:14px">Date</span>
          <!-- <span style="float:right;font-size:10px">{{ gif.last_update}}</span> -->
          <span style="float:right;font-size:14px">Views</span> 
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
            <li class="page-item disabled">
              <span class="page-link">Previous</span>
            </li>
            <li class="page-item"><a class="page-link" href="#">1</a></li>
            <li class="page-item active"><span class="page-link">2<span class="sr-only">(current)</span></span></li>
            <li class="page-item"><a class="page-link" href="#">3</a></li>
            <li class="page-item"><a class="page-link" href="#">4</a></li>
            <li class="page-item"><a class="page-link" href="#">5</a></li>
            <li class="page-item"><a class="page-link" href="#">6</a></li>
            <li class="page-item"><a class="page-link" href="#">7</a></li>
            <li class="page-item"><a class="page-link" href="#">8</a></li>
            <li class="page-item"><a class="page-link" href="#">9</a></li>
            <li class="page-item"><a class="page-link" href="#">10</a></li>
            <li class="page-item"><a class="page-link" href="#">Next</a></li>
          </ul>              
        </div>
        <!-- Sidebar Widgets Column -->
          <!-- Search Widget -->
          
</template>
<script>
import axios from 'axios'
export default {
    
  data () {
    return {
        gifdata:{
        },
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
            console.log('create')
            axios.get('http://127.0.0.1:5000/api/getgif/1')
            .then(response => {        
                console.log(response)    
                this.gifdata = response.data
                console.log('createddd')
            })
            .catch(e => {
            console.log(e)
            })
  }
}
</script>

<style scoped>
</style>