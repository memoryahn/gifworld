<template>
<div>
          <!-- Title -->
          
          <div style="margin-top:10px" class="row"><div class="col-5"></div>
          <div class="col-2"><h4>Forum</h4></div>
          <div class="col-4"></div>
          <div class="col-1">
          <button type="button" class="btn btn-outline-primary btn-sm">new</button></div>
          </div>
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