import Vue from 'vue'
import router from './router'

export default {
  /**
   * addDish
   *
   * @param {Object.<string>} body body obj.
   * @param {string|null} redirect The name of the Route to redirect to.
   * @return {Promise}
   */
  addDish(body, redirect) {
    return Vue.http.put('http://localhost:9000/dishes', body)
      .then((response) => {
        if (redirect) {
          router.push({ name: redirect });
          return response;
        }
      })
      .catch((errorResponse) => {
        return errorResponse
      })
  },

  /**
   * deleteDish
   *
   * @param {string} id id of the dish to delete.
   * @return {Promise}
   */
  deleteDish(id) {
    return Vue.http.delete(`http://localhost:9000/dishes/${id}`)
      .then((response) => {
        return response
      })
      .catch((errorResponse) => {
        return errorResponse
      })
  },

  /**
  * getDishes
  *
  * @return {Promise}
  */
  getDishes() {
    return Vue.http.get(`http://localhost:9000/dishes`)
      .then((response) => {
        return response
      })
      .catch((errorResponse) => {
        return errorResponse
      })
  },
}
