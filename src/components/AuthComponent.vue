<template>
  <div class="AuthComponent">

  </div>
</template>
<script>
  import axios from 'axios'
  export default {
    name: 'AuthComponent',
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
      if(!this.$store.state.isAuthenticated) {
        let queryParams = {
          response_type: 'token',
          client_id: 1,
          redirect_uri: 'http://localhost:8080/callback',
          scope: ''
        }
        let queryString = Object.keys(queryParams).map(key => key + '=' + queryParams[key]).join('&');
        console.log(queryString)
        window.location.href = 'http://accountingapp.test/oauth/authorize?' + queryString
      } else {
        this.$router.push('/home')
      }
    },
    methods: {
    }
  }
</script>
