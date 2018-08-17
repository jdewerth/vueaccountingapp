<template>
  <div class="Settings">
    <div v-if="!user.entity">
      <v-container>
      <v-layout row justify-center>
        <v-flex xs12 md8 lg6 class="my-2">
          <v-alert
            outline color="error"
            icon="priority_high"
            value="true">
            Oops! It looks like no entity is associated with this account.
          </v-alert>
        </v-flex>
      </v-layout>
      <v-layout row justify-center>
        <v-flex xs12 md8 lg6>
          <EntityRegistrationComponent></EntityRegistrationComponent>
        </v-flex>
      </v-layout>
      </v-container>
    </div>
    <div v-else>
      <v-container>
        <v-layout row justify-center>
          <v-flex xs12 md8>
            <identity-verification-component v-if="!user.entity.verified"></identity-verification-component>
          </v-flex>
        </v-layout>
        <v-layout row justify-center class="my-2">
          <v-flex xs12 md8>
            <EntitySettingsComponent></EntitySettingsComponent>
          </v-flex>
        </v-layout>
      </v-container>
    </div>
  </div>
</template>
<script>
  import EntityRegistrationComponent from "./EntityRegistrationComponent";
  import EntitySettingsComponent from "./EntitySettingsComponent";
  import UserSettingsComponent from "./UserSettingsComponent";
  import IdentityVerificationComponent from "./IdentityVerificationComponent";
  export default {
    components: {
      IdentityVerificationComponent,
      UserSettingsComponent, EntitySettingsComponent, EntityRegistrationComponent},
    name: 'Settings',
    data() {
      return {

      }
    },
    created() {
      this.$store.dispatch('refreshUser', this.$store.state.authObject.token)
    },
    computed: {
      user() {
        return this.$store.state.user
      }
    }
  }
</script>
