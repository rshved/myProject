<template>
  <v-app>
    <v-card
    >
      <v-navigation-drawer
        mini-variant-width='100'
        permanent
        expand-on-hover
        height=100vh
        app
      >
     
        <v-list>
          <v-list-item class="px-2">
            <v-list-item-avatar>
              <v-img :src="user.photo"></v-img>
            </v-list-item-avatar>
          </v-list-item>

          <v-list-item link>
            <v-list-item-content>
              <v-list-item-title class="title">
                {{ user.name }}
              </v-list-item-title>
              <v-list-item-subtitle>{{ user.email }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list
          nav
          dense
        >
          <v-list-item link>
            <v-list-item-icon>
              <v-icon>mdi-folder</v-icon>
            </v-list-item-icon>
            <v-list-item-title>My Files</v-list-item-title>
          </v-list-item>
          <v-list-item link>
            <v-list-item-icon>
              <v-icon>mdi-account-multiple</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Shared with me</v-list-item-title>
          </v-list-item>
          <v-list-item link>
            <v-list-item-icon>
              <v-icon>mdi-star</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Starred</v-list-item-title>
          </v-list-item>
          <v-list-item
            link
            @click="clickHandler"
          >
            <v-list-item-icon>
              <v-icon>mdi-plus-box</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Add new task</v-list-item-title>
          </v-list-item>
        </v-list>
        <div class="pa-2">
        <v-btn block class="logout"
         @click="logout() && $router.push({name: 'signIn'})"
        >
          Logout
        </v-btn>
        </div>
      </v-navigation-drawer>
    </v-card>
    
    
    
  </v-app>
</template>

<script>
import { mapActions, mapState } from 'vuex'
  export default {
    name: 'Dashboard',

    
    computed: {
    ...mapState(['user', 'todos'])
    },
    methods: {
      ...mapActions( {logout:'LOG_OUT'}),
      clickHandler() {
        this.$router.push({name: 'addnewtask'}).catch((err)=>{console.log(err)})
    },
      
    },
    // mounted() {
    // // this.$nextTick(function () {
    // // //   // Code that will run only after the
    // // //   // entire view has been re-rendered
    // //     // console.log('this.user', this.user, 'this.todos', this.todos)?
    // // })

    // }
  }
  
</script>

<style scoped>
  .logout {
    position: fixed;
    top: 90%;
    left: 0;
  }
 
</style>