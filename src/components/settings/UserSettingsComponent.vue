<template>
  <div class="UserSettingsComponent">
    <v-layout row justify-space-between>
      <v-flex xs12 md12 lg6>

      </v-flex>
      <v-flex xs12 md12 lg6>

      </v-flex>
    </v-layout>
  </div>
</template>
<script>
  export default {
    name: 'UserSettingsComponent',
    data(){
      return {

      }
    },
    created() {

    },
    methods: {

    },
    computed: {
      user() {
        return this.$store.state.user
      }
    }
  }
</script>
