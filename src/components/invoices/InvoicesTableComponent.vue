<template>
  <div class="InvoicesTableComponent">
    <v-data-table
      :headers="headers"
      :items="invoices"
      class="elevation-1"
      v-bind:loading="loading"
    >
      <v-progress-linear slot="progress" color="blue" indeterminate></v-progress-linear>
      <template slot="items" slot-scope="props">
        <td><v-icon v-if="props.item.draft">visibility_off</v-icon></td>
        <td>INV_BA11</td>
        <td>{{ props.item.customer.first_name }} {{ props.item.customer.last_name }}</td>
        <td><v-chip outline color="orange" v-if="!props.item.paid" small disabled>Pending</v-chip>
          <v-chip outline color="success" v-if="props.item.paid" small disabled>Paid</v-chip></td>
        <td>${{ props.item.total / 100 }}</td>
        <td>{{ props.item.send_date }}</td>
        <td>{{ props.item.due_date }}</td>
        <td><v-btn icon><v-icon>more_horiz</v-icon></v-btn></td>
      </template>
    </v-data-table>
  </div>
</template>
<script>
  import axios from 'axios'
  export default {
    name: 'InvoicesTableComponent',
    props: ['invoices'],
    data() {
      return {
        headers: [
          { text: 'Draft', value: 'draft', sortable:false },
          {
            text: 'Invoice ID',
            align: 'left',
            sortable: false,
            value: 'invoice_id'
          },
          { text: 'Customer', value: 'customer.first_name' },
          { text: 'Status', value: 'paid' },
          { text: 'Amount', value: 'total' },
          { text: 'Send Date', value: 'send_date' },
          { text: 'Due Date', value: 'due_date' },
          { text: 'Action', value: 'action', sortable:false }
        ]
      }
    },
    created() {
    },
    computed: {
      loading() {
        return this.$store.state.loading
      }
    },
    methods: {
    }
  }
</script>
