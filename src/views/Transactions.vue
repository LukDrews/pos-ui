<template>
  <section class="container mx-auto p-4 bg-white rounded">
    <div class="flex justify-between items-center pb-4">
      <h3>Transactions</h3>
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

      <o-table-column v-slot="props" field="type" label="Type" sortable>
        {{ props.row.type }}
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
        <div v-if="props.row.order" class="float-right">
          <o-icon
            clickable
            class="w-6 h-6"
            icon="info"
            @click.stop="showForm(props.row)"
          />
        </div>
      </o-table-column>
    </o-table>
  </section>
</template>

<script>
import apiClientMixin from "../mixins/apiClientMixin";
import { Transaction } from "../store/models";

export default {
  name: "TransactionView",
  components: {},
  mixins: [apiClientMixin],
  data() {
    return {
      apiClient: Transaction,

      selected: null,
      confirmDialog: false,
    };
  },
  computed: {
    data() {
      const d = Transaction.query().withAll().all();
      console.log(d);
      return d;
    },
  },
  created() {
    this.getItems();
  },
  methods: {
    showForm(transaction) {
      this.inputForm = true;
      this.selected = transaction;
    },
    showConfirmDialog(transaction) {
      this.confirmDialog = true;
      this.selected = transaction;
    },
  },
};
</script>
