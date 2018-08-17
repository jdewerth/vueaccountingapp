<template>
  <v-app>
    <div id="app">
      <v-navigation-drawer
        fixed
        :clipped="$vuetify.breakpoint.lgAndUp"
        v-model="drawer"
        app
      >
        <v-list dense>
          <v-list-tile @click="navigate('/home')">
            <v-list-tile-action>
              <v-icon>home</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title @click="navigate('/home')">Home</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile @click="navigate('/invoices')">
            <v-list-tile-action>
              <v-icon>assignment</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title @click="navigate('/invoices')">Invoices</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile @click="navigate('/customers')">
            <v-list-tile-action>
              <v-icon>perm_contact_calendar</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title @click="navigate('/customers')">Customers</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile @click="navigate('/invoices')">
            <v-list-tile-action>
              <v-icon>people</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title @click="navigate('/invoices')">My Team</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile @click="navigate('/invoices')">
            <v-list-tile-action>
              <v-icon>chat</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title @click="navigate('/invoices/create')">Team Chat</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile @click="navigate('/settings')">
            <v-list-tile-action>
              <v-icon>settings</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title @click="navigate('/settings')">Settings</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-navigation-drawer>
      <v-toolbar color="primary" dark fixed app :clipped-left="$vuetify.breakpoint.lgAndUp">
        <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        <v-toolbar-title class="white--text">PROSPER</v-toolbar-title>
      </v-toolbar>
      <v-content>
        <router-view/>
      </v-content>
    </div>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      drawer: null
    }
  },
  props: {
    source: String
  },
  computed: {
    user() {
      return this.$store.state.user
    }
  },
  created() {
    
  },
  methods: {
    navigate(payload) {
      this.$router.push({path: payload})
    }
  }
}
</script>

