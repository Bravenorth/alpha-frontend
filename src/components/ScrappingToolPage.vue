<template>
    <div class="container mt-5">
      <h2>Scrapping Tool</h2>
      <EntryForm v-model:form="form" @submit="submitEntry"/>
      <HistoryTable :entries="entries"/>
    </div>
  </template>
  
  <script>
  import EntryForm from './EntryForm.vue';
  import HistoryTable from './HistoryTable.vue';
  
  export default {
    components: {
      EntryForm,
      HistoryTable,
    },
    data() {
      return {
        form: {
          isContract: false,
          position: '',
          shipToSalvage: '',
          hourContractAccepted: '',
          hourScrappingStarted: '',
          shipInUseToScrap: '',
          hourScrappingEnded: '',
          amountRMC: '',
          amountCM: '',
        },
        entries: [],
      };
    },
    methods: {
      submitEntry() {
        this.entries.push({ ...this.form });
        this.resetForm();
      },
      resetForm() {
        this.form = {
          isContract: false,
          position: '',
          shipToSalvage: '',
          hourContractAccepted: '',
          hourScrappingStarted: '',
          shipInUseToScrap: '',
          hourScrappingEnded: '',
          amountRMC: '',
          amountCM: '',
        };
      },
    },
  };
  </script>
  