<template>
<div >
          <!-- Title -->
          
          <div align='center' style="margin-top:10px"><h4>Forum</h4></div>
          <div v-bind:id="forum._id" class="list-group-item list-group-item-action" @click="listclick( forum )" v-for="(forum,key) in forumData" v-bind:key="key">
          <!-- Date/Time -->
          <span style="font-size:12px">Num</span>
          <span style="font-size:14px">Title</span>        
          <span style="float:right;font-size:14px">Author</span> 
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
          <!-- 댓글용으로 남겨둠 -->
          <!-- <span class="badge badge-secondary" v-if="gif.count" > -->
        </div>
</template>
<script>
export default{
  data(){
    return{
      forumData:null
    }
  }
}
</script>