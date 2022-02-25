<template>
  <section class="container mx-auto p-4 bg-white rounded">
    <ConfirmDialog
      v-model:active="confirmDialog"
      @on-confirm="deleteItem(selected)"
    />

    <div class="flex justify-between items-center pb-4">
      <h3>Orders</h3>
      <o-button icon-right="redo" @click="getItems()" />
    </div>

    <o-table :data="data">
      <o-table-column
        v-slot="props"
        field="user.fullName"
        label="User"
        sortable
        >{{ props.row.user.fullName }}</o-table-column
      >

      <o-table-column v-slot="props" field="itemCount" label="Items" sortable>
        {{ props.row.itemCount }}
      </o-table-column>

      <o-table-column
        v-slot="props"
        field="amountFormatted"
        label="Amount"
        sortable
      >
        {{ props.row.amountFormatted }}
      </o-table-column>

      <o-table-column v-slot="props" field="createdAt" label="Date" sortable>
        {{ props.row.createdAt }}
      </o-table-column>

      <o-table-column v-slot="props" width="80">
        <div class="float-right">
          <o-icon
            clickable
            class="w-6 h-6"
            icon="info"
            @click.stop="showForm(props.row)"
          />
          <!-- <o-icon
            clickable
            class="w-6 h-6"
            icon="trash"
            @click.stop="showConfirmDialog(props.row)"
          /> -->
        </div>
      </o-table-column>
    </o-table>
  </section>
</template>

<script>
import apiClientMixin from "../mixins/apiClientMixin";
import { Order } from "../store/models";
import ConfirmDialog from "../components/dialogs/ConfirmDialog.vue";

export default {
  name: "OrderView",
  components: {
    ConfirmDialog,
  },
  mixins: [apiClientMixin],
  data() {
    return {
      apiClient: Order,

      selected: null,
      confirmDialog: false,
    };
  },
  computed: {
    data() {
      return Order.query().withAll().all();
    },
  },
  created() {
    this.getItems();
  },
  methods: {
    showForm(order) {
      this.inputForm = true;
      this.selected = order;
    },
    showConfirmDialog(order) {
      this.confirmDialog = true;
      this.selected = order;
    },
  },
};
</script>
