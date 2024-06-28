<template>
  <div class="container mt-5">
    <h2>Scrapping History</h2>
    <b-table striped hover :items="entries" :fields="fields">
      <template #cell(actions)="row">
        <b-button size="sm" @click="editEntry(row.item)">Edit</b-button>
        <b-button size="sm" variant="danger" @click="deleteEntry(row.item)">Delete</b-button>
      </template>
    </b-table>
  </div>
</template>

<script>
export default {
  props: ['entries'],
  data() {
    return {
      fields: [
        { key: 'date', label: 'Date' },
        { key: 'user', label: 'User' },
        { key: 'isContract', label: 'Is Contract' },
        { key: 'contractPrice', label: 'Contract Price' },
        { key: 'position', label: 'Position' },
        { key: 'shipToSalvage', label: 'Ship to Salvage' },
        { key: 'hourContractAccepted', label: 'Hour Contract Accepted' },
        { key: 'hourScrappingStarted', label: 'Hour Scrapping Started' },
        { key: 'shipInUseToScrap', label: 'Ship in Use to Scrap' },
        { key: 'hourScrappingEnded', label: 'Hour Scrapping Ended' },
        { key: 'amountRMC', label: 'Amount RMC Gathered' },
        { key: 'amountCM', label: 'Amount CM Gathered' },
        { key: 'comments', label: 'Comments' },
        { key: 'actions', label: 'Actions' },
      ],
    };
  },
  methods: {
    editEntry(entry) {
      this.$emit('edit-entry', entry);
    },
    deleteEntry(entry) {
      this.$emit('delete-entry', entry);
    },
  },
};
</script>
