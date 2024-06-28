<template>
  <b-container class="mt-5">
    <b-form @submit.prevent="onSubmit">
      <b-row>
        <b-col md="6">
          <b-form-group label="Is Contract">
            <b-form-checkbox v-model="localForm.isContract"></b-form-checkbox>
          </b-form-group>
        </b-col>
        <b-col md="6" v-if="localForm.isContract">
          <b-form-group label="Contract Price">
            <b-form-input v-model="localForm.contractPrice" required :disabled="!localForm.isContract"></b-form-input>
          </b-form-group>
        </b-col>
      </b-row>

      <b-row>
        <b-col md="6">
          <b-form-group label="Position">
            <b-form-input v-model="localForm.position" required></b-form-input>
          </b-form-group>
        </b-col>
        <b-col md="6">
          <b-form-group label="Ship to salvage">
            <b-form-select v-model="localForm.shipToSalvage" required>
              <option :value="null" disabled>Select a ship</option>
              <option v-for="ship in ships" :key="ship.slug" :value="ship.name">{{ ship.name }}</option>
            </b-form-select>
          </b-form-group>
        </b-col>
      </b-row>

      <b-row>
        <b-col md="6">
          <b-form-group label="Hour contract accepted">
            <b-form-input type="time" v-model="localForm.hourContractAccepted" required></b-form-input>
          </b-form-group>
        </b-col>
        <b-col md="6">
          <b-form-group label="Hour scrapping started">
            <b-form-input type="time" v-model="localForm.hourScrappingStarted" required></b-form-input>
          </b-form-group>
        </b-col>
      </b-row>

      <b-row>
        <b-col md="6">
          <b-form-group label="Ship in use to scrap">
            <b-form-input v-model="localForm.shipInUseToScrap" required></b-form-input>
          </b-form-group>
        </b-col>
        <b-col md="6">
          <b-form-group label="Hour scrapping ended">
            <b-form-input type="time" v-model="localForm.hourScrappingEnded" required></b-form-input>
          </b-form-group>
        </b-col>
      </b-row>

      <b-row>
        <b-col md="6">
          <b-form-group label="Amount RMC gathered">
            <b-form-input v-model="localForm.amountRMC" required></b-form-input>
          </b-form-group>
        </b-col>
        <b-col md="6">
          <b-form-group label="Amount CM gathered">
            <b-form-input v-model="localForm.amountCM" required></b-form-input>
          </b-form-group>
        </b-col>
      </b-row>

      <b-form-group label="Comments">
        <b-form-textarea v-model="localForm.comments"></b-form-textarea>
      </b-form-group>

      <b-button type="submit" variant="primary" :disabled="!isFormValid()">Submit</b-button>
    </b-form>

    <hr>

    <h2>History</h2>
    <b-table striped hover :items="history" :fields="fields">
      <template #cell(actions)="row">
        <b-button size="sm" @click="editEntry(row.item)">Edit</b-button>
        <b-button size="sm" variant="danger" @click="deleteEntry(row.item)">Delete</b-button>
      </template>
    </b-table>
  </b-container>
</template>

<script>
import { ships } from '@/ships';

export default {
  data() {
    return {
      localForm: this.getInitialFormState(),
      ships: ships,
      history: [],
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
      editingIndex: null,
    };
  },
  methods: {
    getInitialFormState() {
      return {
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
        comments: '',
      };
    },
    onSubmit() {
      const todayDate = new Date().toISOString().substr(0, 10);
      const userName = localStorage.getItem('userName');
      const newEntry = { ...this.localForm, date: todayDate, user: userName };
      
      if (this.isFormValid()) {
        if (this.editingIndex !== null) {
          this.history.splice(this.editingIndex, 1, newEntry);
          this.editingIndex = null;
        } else {
          this.history.push(newEntry);
        }
        this.resetForm();
      }
    },
    isFormValid() {
      const requiredFields = [
        'position',
        'shipToSalvage',
        'hourContractAccepted',
        'hourScrappingStarted',
        'shipInUseToScrap',
        'hourScrappingEnded',
        'amountRMC',
        'amountCM',
      ];

      if (this.localForm.isContract) {
        requiredFields.push('contractPrice');
      }

      return requiredFields.every(field => this.localForm[field]);
    },
    resetForm() {
      this.localForm = this.getInitialFormState();
    },
    editEntry(entry) {
      this.localForm = { ...entry };
      this.editingIndex = this.history.indexOf(entry);
    },
    deleteEntry(entry) {
      this.history = this.history.filter(item => item !== entry);
    },
  },
};
</script>
