<template>
  <div class="AuthCallback">
    
  </div>
</template>
<script>
  export default {
    name: 'AuthCallback',
    data() {
      return {
        auth: null
      }
    },
    created() {
      let fragment = window.location.hash.substr(1)
      if (fragment.length > 0) {
        let params = fragment.split('&')
        let token = params[0].split('=')
        this.auth = {
          token: token[1]
        }
        this.$store.dispatch('setAuthToken', this.auth.token).then(() => {
          this.$store.dispatch('refreshUser', this.$store.state.authObject.token).then(() => {
            this.$store.dispatch('setAuthLocal').then(() => {
              this.$router.push('/')
            })
          })
        })
      }
    }
  }

</script>
