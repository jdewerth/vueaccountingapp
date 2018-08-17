<template>
  <div class="HomeComponent">
    <h1 class="display-3">Welcome, {{user.profile.first_name}} {{user.profile.last_name}}!</h1>
  </div>
</template>

<script>
import axios from 'axios'
  export default {
    name: 'HomeComponent',
    data() {
      return {
        userProfile: null
      }
    },
    computed: {
      user() {
        return this.$store.state.user
      }
    },
    created() {
      
    }
  }
</script>
