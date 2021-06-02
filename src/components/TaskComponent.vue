<template>
  <v-container class="d-flex">
    <div class="left-side">
      
      <v-list
        flat
        subheader
        three-line
        
      >
        <v-list-item-group
          
          multiple
          active-class=""
        >
          <v-list-item
          @click="updateDone(todo.id)"
          >
            <template >
              <v-list-item-action class="check">
                <v-checkbox
                :input-value="todo.done"
                
                ></v-checkbox>
              </v-list-item-action>
  
              <v-list-item-content>
                <v-list-item-title>{{ todo.mission }}</v-list-item-title>
                
                <v-list-item-subtitle>{{ todo.description }}</v-list-item-subtitle>
                
              </v-list-item-content>
              
              
            </template>
            
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </div>
    <div>
      <v-btn
        icon>
         <v-icon color="primary lighten-1">mdi-book-edit</v-icon>
      </v-btn>
      <v-btn
        icon
        @click="removeTask(todo.id)"
      >
        <v-icon color="primary lighten-1">mdi-delete</v-icon>
      </v-btn>
    </div>
    
  </v-container>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  name: 'TaskComponent',
  props: ['todo'],
  mounted () {
    console.log(this.todo)
  },
  methods: {
   ...mapMutations({ 
        updateDoneState:'UPDATE_DONE',
        deleteTask:'DELETE_TODO'
      }),

     updateDone(value) {
      console.log(value)
    this.updateDoneState({
        id: value
      })
    },
    removeTask(value) {
      console.log(value)
      this.deleteTask({
        id: value
      })
    }
  }
}
 
</script>

<style scoped>
  .check{
    margin-right: 15px;
  }
  .d-flex{
    padding: 24px;
    
  }
  .left-side{
    width: 95%;
  }
  
  
</style>
