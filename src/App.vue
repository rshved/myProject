<template>
  <v-app>
    <router-view></router-view>
  </v-app>
</template>

<script>
import { mapActions, mapMutations } from "vuex";

export default {
  name: 'App',
  // components: {Dashboard: () => import('@/views/Dashboard.vue')},
  data: () => ({
    //
  }),
   methods: {
     ...mapMutations({setUser: 'SET_USER',setIsLogined: 'SET_IS_LOGGED'}),
    ...mapActions({
      getUsers: "GET_USERS",
      
    })
  },

  async mounted() {
    await this.getUsers()
   
  }
  
}
</script>