import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    users: [],
    todos: [],
    user: {},
    isLogged: false
  },
  mutations: {
    UPDATE_USERS: (state, {id}) => {
      state.todos.map(item => {
        if(item.id === id) {
          return item.done = !item.done
        } else return item
      })
  
    },
    DELETE_TODO: (state, {id}) => {
      state.todos = state.todos.filter(todo => todo.id !== id)
      console.log(state)
    },

    SAVE_USERS: (state, payload) => {
      state.users = payload
    },
    SET_USER: (state, payload) => {
      state.user = payload
    },
    SET_IS_LOGGED: (state, payload) => {
      state.isLogged = payload
    },
    SAVE_TODOS: (state, payload) => {
      state.todos = payload
    }
    

  },
  actions: {
    async GET_USERS (context) {
      const users = await (await fetch("http://localhost:3000/users")).json()
      console.log(users)
      context.commit('SAVE_USERS', users)
    },
    async ADD_USER (context, payload) {
      const user = await (await fetch("http://localhost:3000/users", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      })).json()
       context.commit('SAVE_USERS', user)
       context.dispatch('GET_USERS')
      return !!user
    },
    async RECIEVE_TODOS (context) {
      const todos = await (await fetch("http://localhost:3000/todos")).json()
      context.commit('SAVE_TODOS', todos)
    },
    async ADD_TODO (context, payload) {
      const todo = await (await fetch("http://localhost:3000/todos", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      })).json()
     
      // context.commit('SAVE_TODOS', todo)
      
      todo && context.dispatch('RECIEVE_TODOS')
      
    },
  async UPDATE_TODO (context, {id, body}) {
      const todo = await (await fetch(`http://localhost:3000/todos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      })).json()
       context.commit('SAVE_TODOS', todo)
      
      todo && context.dispatch('RECIEVE_TODOS')
    },
    async DELETE_TODO (context, id) {
      await (await fetch(`http://localhost:3000/todos/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json'
        }
      })).json()
      context.dispatch('RECIEVE_TODOS')
    },
    async LOG_OUT () {
      localStorage.removeItem('token');
    }
  }

})
