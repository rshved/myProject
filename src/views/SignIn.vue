<template>

  <v-row
  justify="center"
  class="my-15"
  v-on:keyup.enter="logIn"
  >
     <v-form
        class="login-form"
        ref="form"
        v-model="valid"
        lazy-validation
        
  >
    <v-text-field
      v-model="name"
      :counter="10"
      :rules="nameRules"
      label="Login"
      required
      
    ></v-text-field>

    <v-text-field
     v-model="password"
     :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
     :rules="[rules.required, rules.min]"
     :type="show1 ? 'text' : 'password'"
     name="input-10-1"
     label="Password"
     hint="At least 8 characters"
     counter
     @click:append="show1 = !show1"
     
    ></v-text-field>

    <!-- <v-btn
      :disabled="!valid"
      color="success"
      class="mr-4"
      @click="validate"
    >
      Validate
    </v-btn> -->
    <div class="d-flex justify-space-between">
    <v-btn
      color="error"
      class="mr-4"
      @click="reset"
    >
      Reset Form
    </v-btn>

    <v-btn
      color="success"
      @click="logIn"
    >
      Log In
    </v-btn>
    </div>
    <p
      class="mt-7 not-register mb-2 "
      @click="$router.push({ name: 'signUp' })"
      
    >Not register yet?</p>
  </v-form>
  </v-row>
  
</template>


<script>
import { mapMutations, mapState } from 'vuex'
import CryptoJS from 'crypto-js';

  export default {
    name: 'SignIn',
    data: () =>  ({
      valid: true,
      name: '',
      nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 15) || 'Name must be less than 15 characters',
      ],
      show1: false,
      password: '',
        rules: {
          required: value => !!value || 'Required.',
          min: v => v.length >= 8 || 'Min 8 characters',
          emailMatch: () => (`The email and password you entered don't match`),
        },
    }),

    methods: {
      ...mapMutations(
        {
          isLogged: 'SET_IS_LOGGED',
          setUser: 'SET_USER'
        }
      ),
      // clickHandler() {
      //   this.$router.push({ name: 'dashboard' })
      // },
     logIn() {
         
        const userInDb = this.users.find(item => 
          item.name === this.name.trim()
          && item.password === this.password.trim()
         );
        
        if (userInDb) {
          console.log('1131311')
          this.isLogged(true),
          this.setUser(userInDb)
          this.$router.push({ name: 'dashboard' })
        }
        
        console.log(process.env.SECRET)
        localStorage.setItem('token', CryptoJS.AES.encrypt(JSON.stringify(userInDb), 'HuYugADAesHtyEtOtSEcREt8888').toString()) 
      },
      reset () {
        this.$refs.form.reset()
      },
    },
    computed: {
      ...mapState(['users'])
    },
    // watch: {
    //   users() {
        
    //   }
    // },
    mounted(){
      console.log('mounted')
    }
    
  }
  
</script>

<style scoped>
  .not-register {
    border-bottom: 1px solid #000;
    cursor:pointer;
    color: #343aeb;
  }
  .form-container {
    width: 600px;
  }
  .login-form {
    min-width: 320px;
  }
</style>
