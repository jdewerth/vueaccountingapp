<template>
  <div class="IndexComponent">
    
  </div>
</template>

<script>
import axios from 'axios'
  export default {
    name: 'IndexComponent',
    data() {
      return {
        
      }
    },
    computed: {
      user() {
        return this.$store.state.user
      }
    },
    created() {
        this.$store.dispatch('fetchAuthToken').then(() => {
            this.$store.dispatch('verifyAuthToken', this.$store.state.authObject.token)
        })
    }
  }
</script>