<template>
  
  <v-row
  justify="center"
  class="my-15"
  v-on:keyup.enter="logIn"
  >
  <v-form
    class="signup-form"
    ref="form"
    v-model="valid"
    lazy-validation
  >
    <v-text-field
      v-model="name"
      :counter="15"
      :rules="nameRules"
      label="Login"
      required
    ></v-text-field>

    <v-text-field
      v-model="email"
      :rules="emailRules"
      label="E-mail"
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
      @click="signUp"
    >
      Sign Up
    </v-btn>
    </div>
  </v-form>
  </v-row>
</template>

<script>
  import { mapState, mapActions } from 'vuex'

  export default {
    name: 'SignUp',
    data: () => ({
      valid: true,
      name: '',
      nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 15) || 'Name must be less than 15 characters',
      ],
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
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
      ...mapActions({
        createUser: 'ADD_USER'
      }),
      async signUp() {
        const userInDb = this.users.find(item => 
          item.name === this.name.trim()
        );
        
        if (!userInDb && this.password.length >= 8) {
          const res =  await this.createUser({
            name: this.name,
            email: this.email,
            password: this.password
          });
          res && this.$router.push({ name: 'signIn' })
        }
      },
      // clickHandler() {
      //   this.$router.push({ name: 'dashboard' })
      // },
      reset () {
        this.$refs.form.reset()
      },
    },
    computed: {
      ...mapState(['users'])
    }
  }
</script>

<style scoped>
  .signup-form {
    min-width: 320px;
  }
</style>