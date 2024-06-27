<template>
  <div class="container mt-5">
    <h2>Scrapping Tool</h2>
    <EntryForm v-model:form="form" @submit="submitEntry" />
    <HistoryTable :entries="entries" />
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
        contractPrice: '',
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
      const todayDate = new Date().toISOString().substr(0, 10); // Get today's date in YYYY-MM-DD format
      const newEntry = {
        ...this.form,
        date: todayDate,
        contractPrice: this.form.isContract ? this.form.contractPrice : '',
      };

      // Add a check to ensure no empty entries are added
      if (
        this.form.position &&
        this.form.shipToSalvage &&
        this.form.hourContractAccepted &&
        this.form.hourScrappingStarted &&
        this.form.shipInUseToScrap &&
        this.form.hourScrappingEnded &&
        this.form.amountRMC &&
        this.form.amountCM
      ) {
        this.entries.push(newEntry);
      }

      this.resetForm();
    },
    resetForm() {
      this.form = {
        isContract: false,
        contractPrice: '',
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
