<template>
  <div class="main">
    <div v-if="dishList.length < 1" class="main empty-dish">
      <div class="empty-menu">
        <md-icon class="md-size-4x">restaurant</md-icon>
        <div style="text-align: center;" class="title">You don't have any dishes in the menu. Please add dish</div>
      </div>
    </div>
    <div v-else>
      <div class="title">Menu</div>
      <div class="container">
        <div v-for="dish in dishList  " v-bind:key="dish.id">
          <Card :header="dish.name" :description="dish.description" :price="dish.price" :category="dish.category"
            :availableTime="dish.selectedAvailableTime" :waitTime="dish.waitTime"
            :isDishDeactivated="dish.isDishDeactivated" :editAction="{ label: 'Edit', action: () => onEdit(dish) }"
            :deleteAction="{ label: 'Delete', action: () => onDelete(dish._id) }" />
        </div>
      </div>
    </div>
    <md-button @click="onAddMenuClick()" class="md-fab md-primary md-fab-bottom-right add-btn">
      <md-icon>add</md-icon>
    </md-button>
  </div>
</template>

<script>
import router from '../router/index'
import Api from '../api'
import Card from '../components/card.vue'
import Vue from "vue";
export default {
  name: 'dashboard',
  components: {
    Card
  },
  data() {
    return {
      dishList: []
    }
  },
  methods: {
    onAddMenuClick() {
      router.push({ name: 'menu' })
    },
    onEdit(data) {
      router.push({ name: 'menu', params: { ...data, isEdit: true } })
    },
    onDelete(id) {
      Api.deleteDish(id).then(() => {
        Vue.$toast.success(`Dish deleted succesfully!`);
        this.dishList = this.dishList.filter(dish => dish._id !== id);
      }).catch(error => console.log(error))
    }
  },
  mounted() {
    Api.getDishes().then((data) => {
      this.dishList = data.body.data
    })
  }
}
</script>

<style scoped>
.container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  padding: 20px;
  row-gap: 2rem;
  margin: 0 10%;
}

.main {
  height: 100%;
}

.title {
  text-align: center;
  margin: 2rem 0 1rem 0;
  font-size: 1.8rem;
}

.empty-dish {
  display: flex;
  justify-content: center;
  align-items: center;
}

.empty-menu {
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  row-gap: 1rem;
}

.add-btn {
  position: fixed;
}
</style>
