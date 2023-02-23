<template>
  <section class="q-pa-md create">
    <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md form">
      <div v-for="(item, index) in formData" :key="index">
        <q-input
          v-if="item.type === 'text' || item.type === 'number'"
          :type="item.type"
          v-model="setOptions[item.vm]"
          :label="item.label"
          lazy-rules
          :rules="[
            (val) =>
              (val && val.length > 0) ||
              (val !== null && val !== '') ||
              'Please type something',
          ]"
        />
        <!-- select input -->
        <q-select
          v-else-if="item.type === 'select'"
          v-model="setOptions[item.vm]"
          clearable
          transition-show="jump-up"
          transition-hide="jump-up"
          :options="types"
          label="Type"
          option-label="name_uz"
          option-value="id"
          emit-value
          map-options
          lazy-rules
          :rules="[(val) => val || 'Please type something']"
          style="text-transform: capitalize"
        />
      </div>

      <div>
        <q-btn label="Submit" type="submit" color="primary" />
        <q-btn
          label="Reset"
          type="reset"
          color="primary"
          flat
          class="q-ml-sm"
        />
      </div>
    </q-form>
  </section>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      edit: false,
      setOptions: {
        product_type_id: null,
        name_uz: "",
        cost: null,
        address: "",
        created_date: new Date().getTime(),
      },

      formData: [
        {
          vm: "name_uz",
          label: "Name",
          type: "text",
        },
        {
          vm: "product_type_id",
          label: "Product type",
          type: "select",
        },
        {
          vm: "cost",
          label: "Cost",
          type: "number",
        },
        {
          vm: "address",
          label: "Address",
          type: "text",
        },
      ],

      options: [
        {
          label: "Book",
          value: 1,
        },
        {
          label: "Laptop",
          value: 2,
        },
        {
          label: "Car",
          value: 3,
        },
        {
          label: "Truck",
          value: 4,
        },
      ],

      accept: false,
    };
  },
  computed: {
    ...mapState({
      product: (state) => state.product,
      types: (state) => state.types,
    }),
  },
  watch: {
    "product.id": {
      handler() {
        if (this.product.id) {
          this.setOptions = { ...this.product };
          this.edit = true;
        }
      },
      immediate: true,
    },
  },

  mounted() {
    this.$store.dispatch("fetchByType");
  },

  methods: {
    onSubmit() {
      if (this.accept !== true) {
        if (this.edit) {
          this.$store.dispatch("updateProduct", this.setOptions);
        } else {
          this.$store.dispatch("postProduct", this.setOptions);
        }
        this.$router.push({ name: "home" });
      } else {
        alert("Wrong");
      }
    },

    onReset() {
      this.accept = false;
      this.setOptions.product_type_id = null;
      this.setOptions.name_uz = "";
      this.setOptions.cost = null;
      this.setOptions.address = "";
    },
  },
};
</script>

<style lang="scss" scoped>
.create {
  display: flex;
  justify-content: center;
  .form {
    width: 500px;
  }
}

/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type="number"] {
  -moz-appearance: textfield;
}
</style>
