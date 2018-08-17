<template>
  <div class="CustomersTableComponent">
    <v-data-table
      :headers="headers"
      :items="customers"
      class="elevation-1"
      v-bind:loading="loading"
    >
      <v-progress-linear slot="progress" color="blue" indeterminate></v-progress-linear>
      <template slot="items" slot-scope="props">
        <td>{{ props.item.first_name }} {{ props.item.last_name }}</td>
        <td></td>
        <td>{{ props.item.email }}</td>
        <td>{{ props.item.phone }}</td>
        <td><v-btn icon><v-icon>more_horiz</v-icon></v-btn></td>
      </template>
    </v-data-table>
  </div>
</template>
<script>
  export default {
    name: 'CustomersTableComponent',
    props: ['customers'],
    data() {
      return {
        headers: [
          { text: 'Customer', value: 'first_name' },
          { text: 'Organization', value: 'organization' },
          { text: 'Email', value: 'email' },
          { text: 'Phone', value: 'phone' },
          { text: 'Action', value: 'action', sortable:false}
        ]
      }
    },
    computed: {
      loading() {
        return this.$store.state.loading
      }
    },
    created() {

    },
    methods: {

    }
  }
</script>
