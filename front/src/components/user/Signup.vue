<template>
<div style="margin-top:45px">
<div id="login-box">
<div class="left">
    <h1>Sign up</h1>
    <form @submit.prevent="onSignup" ref="form" class="form-group" lazy-validation >
        <div class="form-group" :class="{error: validation.hasError('name')}"> 
        <input v-model="name" type="text" name="name" placeholder="Username"/>
        </div>
        <div class="form-group" :class="{error: validation.hasError('email')}">
        <input v-model="email" type="text" name="email" placeholder="E-mail" />
        </div>
        <div class="form-group" :class="{error: validation.hasError('password')}">
        <input v-model="password" class="form-control" type="password" name="password" placeholder="Password"/>
        </div>
        <div class="form-group" :class="{error: validation.hasError('password2')}">
        <input v-model="password2" class="form-control" type="password" name="password2" placeholder="Retype password" />
        </div>
        <input type="submit" name="signup_submit" value="Sign me up" />
    </form>
</div>
<div class="right">
    <span class="loginwith">Social network</span>
    <button class="social-signin facebook" @click="appSignup('facebook')">facebook</button>
    <button class="social-signin twitter" @click="appSignup('twitter')">Twitter</button>
    <button class="social-signin google" @click="appSignup('google')">Google+</button>
</div>
<div class="or">OR</div>
</div>
<div align="center">
<div class="message valid" v-if="validation.firstError('name')">Name : {{ validation.firstError('name') }}</div>
<div class="message valid" v-if="validation.firstError('email')">Email : {{ validation.firstError('email') }}</div>
<div class="message valid" v-if="validation.firstError('password')">Password : {{ validation.firstError('password') }}</div>
<div class="message valid" v-if="validation.firstError('password2')">Retpye password : {{ validation.firstError('password2') }}</div>
<div class="valid">{{ loginError }}</div>
</div>
</div>
</template>

<script> 
var SimpleVueValidation = require('simple-vue-validator');
var Validator = SimpleVueValidation.Validator;
import * as firebase from 'firebase'

export default {
  data () {
    return {
        name: '',
        email: '',
        password: '',
        password2: '',
    }
  },
  watch: {
      user(value){
          if(value !== null && value !== undefined){
              this.$router.push('/')
          }
      }
  },
  validators: {
    name(value){
      return Validator.value(value).required().minLength(3)
    },
    email(value){
      return Validator.value(value).required().email()
    },
      password(value) {
        return Validator.value(value).required().minLength(6);
      },
      'password2, password'(password2, password) {
        if (this.submitted || this.validation.isTouched('password2')) {
          return Validator.value(password2).required().match(password);
        }
      }
  },
  computed: {
      user(){
          return this.$store.getters.user
      },
      loginError(){
        return this.$store.getters.loginError
      }
  },
  methods: {
      onSignup() {
        this.$validate()
        .then((success=>{
          if(success){
          this.$store.dispatch('signUp',{name:this.name,email:this.email,password:this.password})
          }
        }))
      },
      appSignup(app){
        var provider=null
        if(app=='google'){
          provider = new firebase.auth.GoogleAuthProvider()
        }else if(app == 'facebook'){
          provider = new firebase.auth.FacebookAuthProvider()
        }else if(app == 'twitter'){
          provider = new firebase.auth.TwitterAuthProvider()
        }
        firebase.auth().signInWithRedirect(provider)
        firebase.auth().getRedirectResult().then(result=>{
        })
        .catch(error=>{
          var errorCode = error.code
          var errorMessage = error.message
          var email=error.email
          var credential=error.credential
        })
      }
  }
}
</script>

<style scoped>
@import url(https://fonts.googleapis.com/css?family=Roboto:400,300,500);
*:focus {
  outline: none;
}

body {
  margin: 0;
  padding: 0;
  background: #DDD;
  font-size: 16px;
  color: #222;
  font-family: 'Roboto', sans-serif;
  font-weight: 300;
}

#login-box {
  position: relative;
  margin: 5% auto;
  width: 600px;
  height: 400px;
  background: #FFF;
  border-radius: 2px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
}
.valid{
  color: red;
}
.left {
  position: absolute;
  top: 0;
  left: 0;
  box-sizing: border-box;
  padding: 40px;
  width: 300px;
  height: 400px;
}

h1 {
  margin: 0 0 20px 0;
  font-weight: 300;
  font-size: 28px;
}

input[type="text"],
input[type="password"] {
  display: block;
  box-sizing: border-box;
  margin-bottom: 20px;
  padding: 4px;
  width: 220px;
  height: 32px;
  border: none;
  border-bottom: 1px solid #AAA;
  font-family: 'Roboto', sans-serif;
  font-weight: 400;
  font-size: 15px;
  transition: 0.2s ease;
}

input[type="text"]:focus,
input[type="password"]:focus {
  border-bottom: 2px solid #16a085;
  color: #16a085;
  transition: 0.2s ease;
}

input[type="submit"] {
  margin-top: 28px;
  width: 120px;
  height: 32px;
  background: #16a085;
  border: none;
  border-radius: 2px;
  color: #FFF;
  font-family: 'Roboto', sans-serif;
  font-weight: 500;
  text-transform: uppercase;
  transition: 0.1s ease;
  cursor: pointer;
}

input[type="submit"]:hover,
input[type="submit"]:focus {
  opacity: 0.8;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
  transition: 0.1s ease;
}

input[type="submit"]:active {
  opacity: 1;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.4);
  transition: 0.1s ease;
}

.or {
  position: absolute;
  top: 180px;
  left: 280px;
  width: 40px;
  height: 40px;
  background: #DDD;
  border-radius: 50%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
  line-height: 40px;
  text-align: center;
}

.right {
  position: absolute;
  top: 0;
  right: 0;
  box-sizing: border-box;
  padding: 40px;
  width: 300px;
  height: 400px;
  /* background: url('https://goo.gl/YbktSj'); */
  background-size: cover;
  background-position: center;
  border-radius: 0 2px 2px 0;
}

.right .loginwith {
  display: block;
  margin-bottom: 40px;
  font-size: 28px;
  color: #000000;
  text-align: center;
}

button.social-signin {
  margin-bottom: 20px;
  width: 220px;
  height: 36px;
  border: none;
  border-radius: 2px;
  color: #FFF;
  font-family: 'Roboto', sans-serif;
  font-weight: 500;
  transition: 0.2s ease;
  cursor: pointer;
}

button.social-signin:hover,
button.social-signin:focus {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
  transition: 0.2s ease;
}

button.social-signin:active {
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.4);
  transition: 0.2s ease;
}

button.social-signin.facebook {
  background: #32508E;
}

button.social-signin.twitter {
  background: #55ACEE;
}

button.social-signin.google {
  background: #DD4B39;
}
</style>