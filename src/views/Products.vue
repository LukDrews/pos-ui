<template>
  <v-container>
    <ProductForm
      title="Add product"
      :selected="selected"
      v-model="productForm"
      @on-confirm="addUpdateProduct"
    />
    <v-card>
      <v-card-title> Products </v-card-title>
      <v-card-actions class="ps-4">
        <v-btn class="primary" @click.stop="showForm(null)">Add Product</v-btn>
      </v-card-actions>
      <v-card-text>
        <v-data-table
          class="pa-4"
          :headers="headers"
          :items="products"
          :items-per-page="-1"
          hide-default-footer
        >
          <template v-slot:item.controls="{ item }">
            <div class="d-flex justify-end">
              <v-btn small class="mr-2" @click.stop="showForm(item)">
                <v-icon>mdi-square-edit-outline</v-icon>
              </v-btn>
              <ConfirmDialog @on-confirm="deleteItem(item)" />
            </div>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import apiClientMixin from '../mixins/apiClientMixin';
import { Product } from '../store/models';
import ProductForm from '../components/products/ProductForm.vue';
import ConfirmDialog from '../components/dialogs/ConfirmDialog.vue';

export default {
  name: 'Products',
  mixins: [apiClientMixin],
  components: {
    ProductForm,
    ConfirmDialog,
  },
  data() {
    return {
      apiClient: Product,
      headers: [
        { text: 'Product name', value: 'name' },
        { text: 'Price', value: 'price' },
        { text: 'Barcode', value: 'barcode' },
        {
          text: '',
          value: 'controls',
          sortable: false,
          align: 'right',
        },
      ],
      productForm: false,
      selected: null,
    };
  },
  created() {
    this.getItems();
  },
  computed: {
    products() {
      return Product.query().withAll().all();
    },
  },
  methods: {
    addUpdateProduct(product) {
      if (product.uuid) {
        this.updateItem(product);
      } else {
        this.addItem(product);
      }
    },
    showForm(product) {
      this.productForm = true;
      this.selected = product;
    },
  },
};
</script>