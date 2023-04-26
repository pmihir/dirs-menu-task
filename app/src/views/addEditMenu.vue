<template>
  <div class="container">
    <div class="card-container">
      <form novalidate @submit.prevent="validateUser">
        <md-card class="card">
          <md-card-header>
            <div class="md-title header">{{ isEdit ? 'Edit' : 'Add' }} Dish</div>
          </md-card-header>
          <md-card-content>
            <md-field>
              <label>Name</label>
              <md-input v-model="form.name.value"></md-input>
              <span v-if="form.name.isError" class="md-helper-text">{{ this.form.name.errorMessage }}</span>
            </md-field>

            <md-field>
              <label>Price</label>
              <md-input v-model="form.price.value"></md-input>
              <span v-if="form.price.isError" class="md-helper-text">{{ this.form.price.errorMessage }}</span>
            </md-field>

            <md-field>
              <label>Description</label>
              <md-input v-model="form.description.value"></md-input>
              <span v-if="form.description.isError" class="md-helper-text">{{ this.form.description.errorMessage }}</span>
            </md-field>

            <md-field>
              <label>Category</label>
              <md-select v-model="form.category.value" name="category" id="category">
                <md-option value="Starter">Starter</md-option>
                <md-option value="Main-Course">Main-Course</md-option>
                <md-option value="Dessert">Dessert</md-option>
                <md-option value="Beverage">Beverage</md-option>
              </md-select>
              <span v-if="form.category.isError" class="md-helper-text">{{ this.form.category.errorMessage }}</span>
            </md-field>

            <md-field>
              <label>Available Time</label>
              <md-select v-model="form.selectedAvailableTime.value" name="AvailableTime" multiple>
                <md-option value="BreakFast">BreakFast</md-option>
                <md-option value="Dinner">Dinner</md-option>
                <md-option value="Lunch">Lunch</md-option>
                <md-option value="WeekDays">WeekDays</md-option>
                <md-option value="Weekend">Weekend</md-option>
              </md-select>
              <span v-if="form.selectedAvailableTime.isError" class="md-helper-text">{{
                this.form.selectedAvailableTime.errorMessage
              }}</span>
            </md-field>

            <md-field>
              <label>Approximately Wait Time</label>
              <md-input v-model="form.waitTime.value"></md-input>
              <span v-if="form.waitTime.isError" class="md-helper-text">{{ this.form.waitTime.errorMessage }}</span>
            </md-field>

            <md-switch v-model="form.deactivateDish" class="md-primary">Deactivate Dish</md-switch>
          </md-card-content>
          <md-card-actions>
            <md-button @click="onAddClick()" class="md-raised md-accent">{{ this.isEdit ? 'Edit' : 'Add' }}</md-button>
          </md-card-actions>
        </md-card>
      </form>
    </div>
  </div>
</template>

<script>
import Api from '../api'
import router from '../router';
import Vue from "vue";
export default {
  name: 'addMenu',
  data() {
    return {
      form: {
        name: {
          value: '',
          isError: false,
          errorMessage: 'Please enter name'
        },
        price: {
          value: '',
          isError: false,
          errorMessage: 'Please enter price'
        },
        description: {
          value: '',
          isError: false,
          errorMessage: 'Please enter description'
        },
        category: {
          value: '',
          isError: false,
          errorMessage: 'Please enter category'
        },
        waitTime: {
          value: '',
          isError: false,
          errorMessage: 'Please enter waitTime'
        },
        selectedAvailableTime: {
          value: [],
          isError: false,
          errorMessage: 'Please enter selectedAvailableTime'
        },
        deactivateDish: false
      },
      isEdit: false
    }
  },
  mounted() {
    const params = this.$route.params
    if (this.$route.params?.isEdit) {
      this.isEdit = true
    }
    this.form.name.value = params.name ?? '';
    this.form.price.value = params.price ?? '';
    this.form.description.value = params.description ?? '';
    this.form.category.value = params.category ?? '';
    this.form.waitTime.value = params.waitTime ?? '';
    this.form.selectedAvailableTime.value = params.selectedAvailableTime ?? []
  },
  methods: {
    onAddClick() {
      let isFormValid = true;
      Object.entries(this.form).forEach(([key, objValue]) => {
        if (objValue.value === '' || (Array.isArray(objValue.value) && objValue.value.length < 1)) {
          this.form[key].isError = true;
          isFormValid = false;
        }
      });
      // If form is invalid do not make any api calls
      if (!isFormValid) return;

      const body = {
        name: this.form.name.value,
        category: this.form.category.value,
        description: this.form.description.value,
        price: this.form.price.value,
        waitTime: this.form.waitTime.value,
        selectedAvailableTime: this.form.selectedAvailableTime.value,
        isDishDeactivated: this.form.deactivateDish
      }
      if (this.isEdit) {
        body._id = this.$route.params._id
      }
      Api.addDish(body, null).then(() => {
        Vue.$toast.success(`Dish ${this.isEdit ? 'Edited' : 'Added'} succesfully!`);
        router.back();
      }).catch((error) => console.log(error));
    }
  },
  watch: {
    'form.name.value': function () {
      this.form.name.isError = false
    },
    'form.price.value': function () {
      this.form.price.isError = false
    },
    'form.description.value': function () {
      this.form.description.isError = false
    },
    'form.waitTime.value': function () {
      this.form.waitTime.isError = false
    },
    'form.category.value': function () {
      this.form.category.isError = false
    },
    'form.selectedAvailableTime.value': function () {
      this.form.selectedAvailableTime.isError = false
    },
  }
}
</script>

<style scoped>
.card-container {
  width: 550px;
}

.container {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.card {
  padding: 20px;
}

.dish-text {
  font-size: 30px;
  margin-bottom: 2rem;
}
</style>

