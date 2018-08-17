<template>
  <div class="InvoicesIndex">
    <v-container>
      <v-layout row justify-center>
        <v-flex xs12 md12 lg10>
          <v-toolbar>
            <v-btn icon @click="getInvoices"><v-icon>refresh</v-icon></v-btn>
            <v-toolbar-title>Invoices</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
              <v-btn flat @click="navigate('NewInvoiceComponent')"><v-icon>add</v-icon> New Invoice</v-btn>
            </v-toolbar-items>
          </v-toolbar>
          <invoices-table-component v-bind:invoices="invoices"></invoices-table-component>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>
<script>
import axios from 'axios'
import InvoicesTableComponent from "./InvoicesTableComponent";
import InvoicesCounterComponent from "./InvoicesCounterComponent";
export default {
    name: 'InvoicesIndex',
    components: {InvoicesCounterComponent, InvoicesTableComponent},
    data() {
        return {
            invoices : [],
        }
    },
    created() {
    this.getInvoices()
    },
    computed: {
    user() {
        return this.$store.state.user
    }
    },
    methods: {
        getInvoices() {
            this.invoices = []
            this.$store.dispatch('setLoading', true).then(() => {
                axios.get(this.$store.state.baseApiUrl + 'invoices', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${this.$store.state.authObject.token}`
                    }
                }).then(response => {
                    for(let i = 0; i < response.data.length; i++) {
                        this.invoices.push(response.data[i])
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
