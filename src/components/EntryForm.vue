<template>
    <b-container class="mt-5">
      <b-form @submit.prevent="onSubmit">
        <b-row>
          <b-col md="6">
            <b-form-group label="Is Contract">
              <b-form-checkbox v-model="localForm.isContract" @change="emitChange('isContract', localForm.isContract)"></b-form-checkbox>
            </b-form-group>
          </b-col>
          <b-col md="6">
            <b-form-group label="Position">
              <b-form-input v-model="localForm.position" required @input="emitChange('position', localForm.position)"></b-form-input>
            </b-form-group>
          </b-col>
        </b-row>
  
        <b-row>
          <b-col md="6">
            <b-form-group label="Ship to salvage">
              <b-form-input v-model="localForm.shipToSalvage" required @input="emitChange('shipToSalvage', localForm.shipToSalvage)"></b-form-input>
            </b-form-group>
          </b-col>
          <b-col md="6">
            <b-form-group label="Hour contract accepted">
              <b-form-input type="time" v-model="localForm.hourContractAccepted" required @input="emitChange('hourContractAccepted', localForm.hourContractAccepted)"></b-form-input>
            </b-form-group>
          </b-col>
        </b-row>
  
        <b-row>
          <b-col md="4">
            <b-form-group label="Hour scrapping started">
              <b-form-input type="time" v-model="localForm.hourScrappingStarted" required @input="emitChange('hourScrappingStarted', localForm.hourScrappingStarted)"></b-form-input>
            </b-form-group>
          </b-col>
          <b-col md="4">
            <b-form-group label="Ship in use to scrap">
              <b-form-input v-model="localForm.shipInUseToScrap" required @input="emitChange('shipInUseToScrap', localForm.shipInUseToScrap)"></b-form-input>
            </b-form-group>
          </b-col>
          <b-col md="4">
            <b-form-group label="Hour scrapping ended">
              <b-form-input type="time" v-model="localForm.hourScrappingEnded" required @input="emitChange('hourScrappingEnded', localForm.hourScrappingEnded)"></b-form-input>
            </b-form-group>
          </b-col>
        </b-row>
  
        <b-row>
          <b-col md="6">
            <b-form-group label="Amount RMC gathered">
              <b-form-input v-model="localForm.amountRMC" required @input="emitChange('amountRMC', localForm.amountRMC)"></b-form-input>
            </b-form-group>
          </b-col>
          <b-col md="6">
            <b-form-group label="Amount CM gathered">
              <b-form-input v-model="localForm.amountCM" required @input="emitChange('amountCM', localForm.amountCM)"></b-form-input>
            </b-form-group>
          </b-col>
        </b-row>
  
        <b-button type="submit" variant="primary">Submit</b-button>
      </b-form>
    </b-container>
  </template>
  
  <script>
  export default {
    props: ['form'],
    data() {
      return {
        localForm: { ...this.form }
      };
    },
    methods: {
      emitChange(field, value) {
        this.$emit('update:form', { ...this.localForm, [field]: value });
      },
      onSubmit() {
        this.$emit('submit');
      },
    },
    watch: {
      form: {
        handler(newForm) {
          this.localForm = { ...newForm };
        },
        deep: true,
        immediate: true
      }
    }
  };
  </script>
  