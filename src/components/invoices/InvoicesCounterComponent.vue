<template>
  <div class="InvoicesCounterComponent">
    <v-card>
      <v-container>
        <v-layout row justify-center align-content-center>

        </v-layout>
      </v-container>
    </v-card>
  </div>
</template>
<script>
  import Chart from 'chart.js'
  export default {
    name: 'InvoicesCounterComponent',
    props: ['invoices'],
    data() {
      return {

      }
    },
    computed: {

    },
    created() {

    }
  }
</script>
