<template>
<div>
    <div align='center' style="margin-top:10px"><h4>Profile</h4></div>
    <p>Name : {{ user.displayName }}</p>
    <p>Email : {{ user.email }}</p>
    <p>Photo : <img :src="user.photoURL"></p>
    <p>CreationTime : {{ user.metadata.creationTime }}</p>
    <p>LastSignIn : {{ user.metadata.lastSignInTime }}</p>
</div>
</template>


<script>
import * as firebase from 'firebase'
// import Vue from 'vue'
export default {
    data(){
        return{
            user:null
        }
    },
    created(){
        var user = firebase.auth().currentUser
        if (user) {
            this.user=user
        // User is signed in.
        //     for(var i in user){
        //         Vue.set(this.user[i],i,user[i])
        //     }
        } else {
            // Vue.set(this.user[0],0)
        // No user is signed in.
        }
    }
}
</script>
<style scoped>

.glyphicon {  margin-bottom: 10px;margin-right: 10px;}

small {
display: block;
line-height: 1.428571429;
color: #999;
}
</style>