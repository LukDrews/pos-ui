<template>
  <o-modal v-model:active="isActive" scroll="clip" :can-cancel="false">
    <div class="p-4">
      <div class="pb-4">
        <h5>{{ title }}</h5>
      </div>
      <div class="pb-4">
        <o-field grouped label="Name">
          <o-input v-model="product.name" placeholder="Name" expanded></o-input>
        </o-field>

        <o-field grouped label="Barcode">
          <o-input
            v-model="product.barcode"
            placeholder="Barcode"
            expanded
          ></o-input>
        </o-field>

        <o-field grouped label="Price">
          <o-input
            v-model.number="product.price"
            placeholder="Price"
            type="number"
            expanded
          ></o-input>
        </o-field>
      </div>
      <div class="flex flex-row justify-end gap-x-2">
        <o-button @click="onCancel()">{{ cancelText }}</o-button>
        <o-button @click="onConfirm()">{{ confirmText }}</o-button>
      </div>
    </div>
  </o-modal>
</template>

<script>
import { Product } from "../../store/models";
import { barcode as validator } from "../../validators";

export default {
  name: "AddProductForm",
  props: {
    title: {
      type: String,
      required: true,
    },
    confirmText: {
      type: String,
      default: "Save",
    },
    cancelText: {
      type: String,
      default: "Cancel",
    },
    selected: {
      type: Object,
      default: null,
    },
    active: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["update:active", "on-cancel", "on-confirm"],
  data() {
    return {
      product: new Product(),
      productNameRules: [
        (v) => !!v || "Name is required",
        (v) =>
          !this.products
            .map((r) => r.name)
            .filter((name) => name !== this.selected?.name)
            .includes(v) || "Name already used",
      ],
      productBarcodeRules: [
        (v) => !!v || "Barcode is required",
        (v) =>
          !this.products
            .map((r) => r.barcode)
            .filter((barcode) => barcode !== this.selected?.barcode)
            .includes(v) || "Barcode already used",
        (v) =>
          validator.isValidFormat(v, validator.formats.ean13) ||
          "Barcode is not valid (EAN-13)",
      ],
      productPriceRules: [(v) => !!v || "Price is required"],
    };
  },
  computed: {
    products() {
      return Product.all();
    },
    isActive: {
      get() {
        return this.active;
      },
      set(newValue) {
        this.$emit("update:active", newValue);
      },
    },
  },
  watch: {
    active(val) {
      if (val) {
        this.product = this.selected
          ? new Product(this.selected)
          : new Product();
        Product.api().$fetch();
      }
    },
  },
  methods: {
    onCancel() {
      this.$emit("update:active", false);
      this.$emit("on-cancel");
    },
    onConfirm() {
      this.product.uuid = this.selected?.uuid;
      this.$emit("update:active", false);
      this.$emit("on-confirm", this.product);
    },
  },
};
</script>
