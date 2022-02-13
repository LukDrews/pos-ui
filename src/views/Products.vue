<template>
  <section class="container mx-auto p-4 bg-white rounded">
    <ProductForm
      v-model:active="inputForm"
      title="Add product"
      :selected="selected"
      @on-confirm="addOrUpdateItem"
    />
    <ConfirmDialog
      v-model:active="confirmDialog"
      @on-confirm="deleteItem(selected)"
    />

    <div class="flex justify-between items-center pb-4">
      <h3>Products</h3>
      <o-button icon-right="redo" @click="getItems()" />
    </div>

    <div class="pb-4">
      <o-button @click.stop="showForm(null)">Add product</o-button>
    </div>

    <o-table :data="data">
      <o-table-column v-slot="props" field="name" label="Name" sortable>
        {{ props.row.name }}
      </o-table-column>

      <o-table-column v-slot="props" field="barcode" label="Barcode" sortable>
        {{ props.row.barcode }}
      </o-table-column>

      <o-table-column v-slot="props" field="price" label="Price" sortable>
        {{ props.row.price }}
      </o-table-column>

      <o-table-column v-slot="props" width="80">
        <div class="float-right">
          <o-icon
            clickable
            class="w-6 h-6"
            icon="edit"
            @click.stop="showForm(props.row)"
          />
          <o-icon
            clickable
            class="w-6 h-6"
            icon="trash"
            @click.stop="showConfirmDialog(props.row)"
          />
        </div>
      </o-table-column>
    </o-table>
  </section>
</template>

<script>
import apiClientMixin from "../mixins/apiClientMixin";
import { Product } from "../store/models";
import ProductForm from "../components/forms/ProductForm.vue";
import ConfirmDialog from "../components/dialogs/ConfirmDialog.vue";

export default {
  name: "ProductView",
  components: {
    ProductForm,
    ConfirmDialog,
  },
  mixins: [apiClientMixin],
  data() {
    return {
      apiClient: Product,

      selected: null,
      inputForm: false,
      confirmDialog: false,
    };
  },
  computed: {
    data() {
      return Product.query().withAll().all();
    },
  },
  created() {
    this.getItems();
  },
  methods: {
    showForm(product) {
      this.inputForm = true;
      this.selected = product;
    },
    showConfirmDialog(product) {
      this.confirmDialog = true;
      this.selected = product;
    },
  },
};
</script>
