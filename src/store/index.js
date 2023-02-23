import Vue from "vue";
import Vuex from "vuex";
import axios from "src/plugns/axios.js";
import { Notify } from "quasar";
const axiosPlugin = (store) => {
  store.$axios = axios;
};

Vue.use(Vuex);

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    state: {
      products: [],
      product: {},
      types: [],
    },

    mutations: {
      SET_PRODUCTS(state, payload) {
        state.products = payload;
      },
      UPDATE_PRODUCT(state, payload) {
        state.product = payload;
      },
      SET_BY_TYPE_PRODUCT(state, payload) {
        state.types = payload;
      },
    },

    actions: {
      async fetchProducts({ commit }) {
        return await new Promise((resolve, reject) => {
          this.$axios
            .get(`/product`)
            .then((res) => {
              commit("SET_PRODUCTS", res.data);
              resolve(res.data);
            })
            .catch((error) => reject(error));
        });
      },

      async fetchProductById({ commit }, { id = "" }) {
        return await new Promise((resolve, reject) => {
          this.$axios
            .get(`/product?id=${id}`)
            .then((res) => {
              commit("UPDATE_PRODUCT", res.data[0]);

              resolve(res.data);
            })
            .catch((error) => reject(error));
        });
      },

      async deleteProduct({ dispatch }, id) {
        return await new Promise((resolve, reject) => {
          this.$axios
            .delete(`/product/${id}`)
            .then((res) => {
              dispatch("fetchProducts");
              Notify.create({
                position: "top-right",
                type: "positive",
                message: res.data,
              });
              resolve(res.data);
            })
            .catch((error) => {
              Notify.create({
                position: "top-right",
                type: "negative",
                message: error.data,
              });
              reject(error);
            });
        });
      },

      async postProduct({ dispatch }, payload) {
        return await new Promise((resolve, reject) => {
          this.$axios
            .post("/product", payload)
            .then((res) => {
              dispatch("fetchProducts");
              Notify.create({
                position: "top-right",
                type: "positive",
                message: res.data,
              });
              resolve(res);
            })
            .catch((error) => {
              Notify.create({
                position: "top-right",
                type: "negative",
                message: error.message,
              });
              reject(error);
            });
        });
      },

      async updateProduct({ dispatch }, payload) {
        return await new Promise((resolve, reject) => {
          this.$axios
            .put("/product", payload)
            .then((res) => {
              dispatch("fetchProducts");
              Notify.create({
                position: "top-right",
                type: "positive",
                message: res.data,
              });
              resolve(res);
            })
            .catch((error) => {
              Notify.create({
                position: "top-right",
                type: "negative",
                message: error.message,
              });
              reject(error);
            });
        });
      },

      async fetchByType({ commit }) {
        return await new Promise((resolve, reject) => {
          this.$axios
            .get("/product/get-product-types")
            .then((res) => {
              commit("SET_BY_TYPE_PRODUCT", res.data);
              resolve(res.data);
            })
            .catch((error) => {
              reject(error);
              Notify.create({
                position: "top-right",
                type: "negative",
                message: error.message,
              });
            });
        });
      },
    },
    plugins: [axiosPlugin],

    strict: process.env.DEBUGGING,
  });

  return Store;
}
