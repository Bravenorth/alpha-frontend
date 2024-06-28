<template>
  <div class="container mt-5">
    <h2>Scrapping Tool</h2>
    <EntryForm v-model:form="form" @submit="submitEntry" />
    <HistoryTable :entries="entries" @edit-entry="loadEntry" @delete-entry="deleteEntry" />
    <b-button @click="downloadCSV" variant="secondary">Download CSV</b-button>
    <b-button @click="downloadPDF" variant="secondary">Download PDF</b-button>
  </div>
</template>

<script>
import EntryForm from './EntryForm.vue';
import HistoryTable from './HistoryTable.vue';
import { jsPDF } from "jspdf";
import 'jspdf-autotable';

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
      editingIndex: -1,
    };
  },
  methods: {
    downloadCSV() {
      const csvContent = "data:text/csv;charset=utf-8," 
        + ["Date,User,Is Contract,Contract Price,Position,Ship to Salvage,Hour Contract Accepted,Hour Scrapping Started,Ship in Use to Scrap,Hour Scrapping Ended,Amount RMC,Amount CM"].join(",") + "\n"
        + this.entries.map(e => [
          e.date,
          e.user,
          e.isContract,
          e.contractPrice,
          e.position,
          e.shipToSalvage,
          e.hourContractAccepted,
          e.hourScrappingStarted,
          e.shipInUseToScrap,
          e.hourScrappingEnded,
          e.amountRMC,
          e.amountCM
        ].join(",")).join("\n");
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", "scrapping_data.csv");
      document.body.appendChild(link); // Required for FF
      link.click();
    },
    downloadPDF() {
      const doc = new jsPDF();
      doc.autoTable({
        head: [['Date', 'User', 'Is Contract', 'Contract Price', 'Position', 'Ship to Salvage', 'Hour Contract Accepted', 'Hour Scrapping Started', 'Ship in Use to Scrap', 'Hour Scrapping Ended', 'Amount RMC', 'Amount CM']],
        body: this.entries.map(e => [
          e.date,
          e.user,
          e.isContract,
          e.contractPrice,
          e.position,
          e.shipToSalvage,
          e.hourContractAccepted,
          e.hourScrappingStarted,
          e.shipInUseToScrap,
          e.hourScrappingEnded,
          e.amountRMC,
          e.amountCM
        ]),
      });
      doc.save('scrapping_data.pdf');
    },
    submitEntry() {
      const todayDate = new Date().toISOString().substr(0, 10); // Get today's date in YYYY-MM-DD format
      const userName = localStorage.getItem('userName'); // Fetch user name from localStorage
      const newEntry = {
        ...this.form,
        date: todayDate,
        user: userName, // Add user name to the entry
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
        if (this.editingIndex === -1) {
          this.entries.push(newEntry);
        } else {
          this.entries.splice(this.editingIndex, 1, newEntry);
          this.editingIndex = -1;
        }
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
    loadEntry(entry) {
      this.form = { ...entry };
      this.editingIndex = this.entries.indexOf(entry);
    },
    deleteEntry(entry) {
      const index = this.entries.indexOf(entry);
      if (index !== -1) {
        this.entries.splice(index, 1);
      }
    },
  },
};
</script>
