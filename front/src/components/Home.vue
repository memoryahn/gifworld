<template>
  <div class="container" >
    <div class="row">
        <!-- Post Content Column -->
        <div class="col-lg-8">
          <!-- Title -->
          <ul class="pagination">
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
          <span style="font-size:14px">번호</span>
          <span style="font-size:14px">제목</span>        
          <span style="float:right;font-size:14px">날짜</span>      
          <div v-bind:id="gif._id" class="list-group-item list-group-item-action" @click="listclick( gif )" v-for="gif in gifdata">
          <!-- Date/Time -->
          <span style="font-size:12px">{{ gif.count }}</span>
          <span style="font-size:14px">{{ gif.title }}</span>        
          <span style="float:right;font-size:10px">{{ gif.last_update}}</span>
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
        </div>
        <!-- Sidebar Widgets Column -->
        <div class="col-md-4">
          <!-- Search Widget -->
          <div class="card my-4">
            <h5 class="card-header">검색</h5>
            <div class="card-body">
              <div class="input-group">
                <input type="text" class="form-control" placeholder="Search for...">
                <span class="input-group-btn">
                  <button class="btn btn-secondary" type="button">Go!</button>
                </span>
              </div>
            </div>
          </div>

          <!-- Categories Widget -->
          <div class="card my-4">
            <h5 class="card-header">최고 조회수</h5>
            <div class="card-body">
                  <ul class="list-unstyled mb-0">
                    <li>
                      <a href="#">1 : JavaScript</a>
                    </li>
                    <li>
                      <a href="#">2 : CSS</a>
                    </li>
                    <li>
                      <a href="#">3 : Tutorials</a>
                    </li>
                  </ul>
            </div>
          </div>
          <div class="card my-4">
            <h5 class="card-header">최고 추천수</h5>
            <div class="card-body">
                  <ul class="list-unstyled mb-0">
                    <li>
                      <a href="#">1 : JavaScript</a>
                    </li>
                    <li>
                      <a href="#">2 : CSS</a>
                    </li>
                    <li>
                      <a href="#">3 : Tutorials</a>
                    </li>
                  </ul>
            </div>
          </div>
          <!-- Side Widget -->
          <div class="card my-4">
            <h5 class="card-header">Side Widget</h5>
            <div class="card-body">
              You can put anything you want inside of these side widgets. They are easy to use, and feature the new Bootstrap 4 card containers!
            </div>
          </div>

        </div>
      <!-- /.row -->

    </div>
    <!-- <button @click="getgif">gif를 가져오자</button> -->
      <nav aria-label="...">    
  </nav>   
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>