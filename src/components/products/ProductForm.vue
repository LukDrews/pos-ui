<template>
  <div>
    <v-dialog v-model="value" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="text-h5">{{ title }}</span>
        </v-card-title>
        <v-card-text>
          <v-form ref="form">
            <v-container>
              <v-row>
                <v-col cols="6" sm="6" md="6">
                  <v-text-field
                    v-model="product.name"
                    label="Name*"
                    :rules="productNameRules"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="6" sm="6" md="6">
                  <v-text-field
                    v-model="product.barcode"
                    label="Barcode*"
                    :rules="productBarcodeRules"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="6" sm="6" md="6">
                  <v-text-field
                    v-model.number="product.price"
                    label="Price*"
                    :rules="productPriceRules"
                    type="number"
                    min="0"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
              <small>*indicates required field</small>
            </v-container>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="onCancel()">
            {{ cancelText }}
          </v-btn>
          <v-btn color="blue darken-1" text @click="onConfirm()">
            {{ confirmText }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { Product } from '../../store/models';
import { barcode as validator } from '../../validators';

export default {
  name: 'AddProductForm',
  props: {
    title: {
      type: String,
      required: true,
    },
    confirmText: {
      type: String,
      default: 'Save',
    },
    cancelText: {
      type: String,
      default: 'Cancel',
    },
    selected: {
      type: Object,
    },
    value: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      product: {},
      productNameRules: [
        (v) => !!v || 'Name is required',
        (v) =>
          !this.products
            .map((r) => r.name)
            .filter((name) => name !== this.selected?.name)
            .includes(v) || 'Name already used',
      ],
      productBarcodeRules: [
        (v) => !!v || 'Barcode is required',
        (v) =>
          !this.products
            .map((r) => r.barcode)
            .filter((barcode) => barcode !== this.selected?.barcode)
            .includes(v) || 'Barcode already used',
        (v) =>
          validator.isValidFormat(v, validator.formats.ean13) ||
          'Barcode is not valid (EAN-13)',
      ],
      productPriceRules: [(v) => !!v || 'Price is required'],
    };
  },
  watch: {
    value(val) {
      if (val) {
        this.product = this.selected
          ? new Product(this.selected)
          : new Product();
        Product.api().$fetch();
      }
    },
  },
  computed: {
    products() {
      return Product.all();
    },
  },
  methods: {
    onCancel() {
      this.$emit('input', false);
      this.$emit('on-cancel');
      this.$refs.form.resetValidation();
    },
    onConfirm() {
      if (this.$refs.form.validate()) {
        this.product.uuid = this.selected?.uuid;
        this.$emit('input', false);
        this.$emit('on-confirm', this.product);
        this.$refs.form.resetValidation();
      }
    },
  },
};
</script>
