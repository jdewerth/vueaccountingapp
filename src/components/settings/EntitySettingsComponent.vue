<template>
  <div class="EntitySettingsComponent">
    <v-card>
      <v-toolbar>
        <v-toolbar-title>Account Settings</v-toolbar-title>
      </v-toolbar>
      <v-container>
        <v-layout row justify-center>
          <v-flex xs12 md10 lg8>
            <p class="title mb-0">Bank Account</p>
            <p class="subheading">Information for the connected bank account in which you would like to receive payouts</p>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </div>
</template>
<script>
  export default {
    name: 'EntitySettingsComponent',
    data() {
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
