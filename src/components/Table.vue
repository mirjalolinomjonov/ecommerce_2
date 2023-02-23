<template>
  <div class="q-pa-md">
    <q-table
      title="Treats"
      :data="data"
      :columns="columns"
      row-key="name"
      :pagination.sync="pagination"
      hide-pagination
    >
      <template #body-cell-created_date="props">
        <q-td align="right">
          {{
            Intl.DateTimeFormat("en-UZ", dateOptions).format(props.created_date)
          }}
        </q-td>
      </template>
      <template #body-cell-action="props">
        <q-td :props="props">
          <span class="action">
            <q-btn color="primary" size="sm" @click="edit(props.row.id)">
              <q-icon name="edit" />
            </q-btn>
            <q-btn color="red" size="sm" @click="remove(props.row.id)">
              <q-icon name="delete" />
            </q-btn>
          </span>
        </q-td>
      </template>
    </q-table>

    <div class="row justify-center q-mt-md">
      <q-pagination
        v-model="pagination.page"
        color="grey-8"
        :max="pagesNumber"
        size="sm"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "TableCom",
  props: {
    data: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      filterByType: null,
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

      pagination: {
        sortBy: "desc",
        descending: false,
        page: 1,
        rowsPerPage: 10,
      },

      columns: [
        {
          id: "id",
          label: "#ID",
          align: "left",
          field: "id",
        },
        {
          name: "name_uz",
          required: true,
          label: "Name",
          align: "left",
          field: (row) => row.name_uz,
        },
        {
          name: "address",
          align: "center",
          label: "Address",
          field: "address",
        },
        {
          name: "cost",
          label: "Cost",
          field: "cost",
          sortable: true,
          format: (val) => `$${val}`,
        },
        {
          name: "created_date",
          label: "Date",
          field: "created_date",
          sortable: true,
        },
        {
          name: "product_type_id",
          label: "Type",
          field: "product_type_id",
        },
        {
          name: "action",
          label: "Action",
        },
      ],

      dateOptions: {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: true,
        timeZone: "Asia/Tashkent",
      },
    };
  },

  computed: {
    pagesNumber() {
      return Math.ceil(this.data.length / this.pagination.rowsPerPage);
    },
  },
  methods: {
    edit(evt) {
      this.$store.dispatch("fetchProductById", { id: evt });
      this.$router.push({ name: "create" });
    },
    remove(evt) {
      this.$store.dispatch("deleteProduct", evt);
    },
  },
};
</script>

<style lang="scss" scoped>
.action {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  q-btn {
    padding: 8px;
  }
}
</style>
