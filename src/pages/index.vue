<template>
  <q-page>
    <TableCom :data="products"/>
  </q-page>
</template>

<script>
import { mapState } from "vuex";
import TableCom from "src/components/Table.vue";
export default {
  name: "PageIndex",
  components: {  TableCom },
  computed: {
    ...mapState({
      products: (state) => state.products,
    }),
  },
  mounted() {
    this.$store.dispatch("fetchProducts");
  },
};
</script>
