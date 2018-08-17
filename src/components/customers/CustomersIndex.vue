<template>
  <div class="CustomersIndex">
		<v-container>
      <v-layout row justify-center>
        <v-flex xs12 md12 lg10>
          <v-toolbar>
            <v-btn icon @click="getCustomers"><v-icon>refresh</v-icon></v-btn>
            <v-toolbar-title>Customers</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
              <v-btn flat @click="navigate('NewCustomerComponent')"><v-icon>add</v-icon> New Customer</v-btn>
            </v-toolbar-items>
          </v-toolbar>
          <customers-table-component v-bind:customers="customers"></customers-table-component>
        </v-flex>
      </v-layout>
      <v-btn fab color="primary" fixed bottom right><v-icon>live_help</v-icon></v-btn>
    </v-container>
  </div>
</template>
<script>
import axios from "axios"
  import CustomersTableComponent from "./CustomersTableComponent";
  export default {
    name: 'CustomersIndex',
    components: {CustomersTableComponent},
    data() {
      return {
        customers: []
      }
    },
    created() {
      this.getCustomers()
    },
    computed: {

    },
    methods: {
      getCustomers() {
        this.customers = []
        this.$store.dispatch('setLoading', true).then(() => {
          axios.get(this.$store.state.baseApiUrl + 'customers', {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${this.$store.state.authObject.token}`
            }
          }).then(response => {
            for(let i = 0; i < response.data.length; i++) {
              this.customers.push(response.data[i])
            }
            this.$store.dispatch('setLoading', false)
          }).catch(err => {
            console.log(err)
            this.$store.dispatch('setLoading', false)
          })
        })
			},
			navigate(payload) {
				this.$router.push({name: payload})
			}
		}
  }
</script>
