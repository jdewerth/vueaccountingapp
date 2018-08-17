<template>
  <div class="InvoicesComponent">
    <router-view></router-view>
    <v-btn fab color="primary" fixed bottom right><v-icon>live_help</v-icon></v-btn>
  </div>
</template>
<script>
  import axios from 'axios'
  export default {
    name: 'InvoicesComponent',
    data() {
      return {
      
      }
    },
    created() {

    },
    computed: {
      user() {
        return this.$store.state.user
      }
    },
    methods: {
      
    }
  }
</script>
