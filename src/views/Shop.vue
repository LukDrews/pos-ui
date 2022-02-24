<template>
  <section class="container h-full mx-auto bg-gray-200">
    <ConfirmDialog
      v-model:active="confirmDialog"
      @on-confirm="deleteItem(selected)"
    />

    <div class="flex h-full flex-row gap-x-4">
      <div class="w-3/4 p-4 h-full bg-white rounded">
        <div class="pb-4">
          <h3>Cart</h3>
        </div>

        <o-table :data="data">
          <o-table-column
            v-slot="props"
            field="product.name"
            label="Name"
            sortable
          >
            {{ props.row.product.name }}
          </o-table-column>

          <o-table-column v-slot="props" label="Price" sortable>
            {{ props.row.product.priceFormatted }}
          </o-table-column>

          <o-table-column
            v-slot="props"
            field="count"
            label="Count"
            width="130"
            sortable
          >
            <o-field>
              <o-input
                v-model="props.row.count"
                numeric
                group
                expanded
                icon="minus"
                icon-clickable
                icon-right="plus"
                icon-right-clickable
                @icon-click="decrementCount(props.row)"
                @icon-right-click="incrementCount(props.row)"
              >
              </o-input>
            </o-field>
          </o-table-column>
        </o-table>
      </div>
      <div class="w-1/4 p-4 h-full bg-white rounded">
        <h3 class="text-center font-semibold">User</h3>
        <br />
        <div>Name: {{ user.fullName }}</div>
        <div>Data: {{ user }}</div>
      </div>
    </div>
  </section>
</template>

<script>
import apiClientMixin from "../mixins/apiClientMixin";

import { barcode as validator } from "../utils/validators";
import { CartItem, User } from "../store/models";
import ConfirmDialog from "../components/dialogs/ConfirmDialog.vue";

export default {
  name: "ShopView",
  components: {
    ConfirmDialog,
  },
  mixins: [apiClientMixin],
  data() {
    return {
      apiClient: CartItem,

      barcode: "",

      user: new User(),

      selected: null,
      confirmDialog: false,
    };
  },
  computed: {
    data() {
      return CartItem.query().withAll().all();
    },
  },
  created() {
    window.addEventListener("keypress", this.processKey);
    this.getItems();
  },
  unmounted() {
    window.removeEventListener("keypress", this.processKey);
  },
  methods: {
    processKey(e) {
      if (
        e.key === "Enter" &&
        validator.isValidFormat(this.barcode, validator.formats.ean13)
      ) {
        this.addCartItem(this.barcode);
        this.barcode = "";
      } else if (
        e.key === "Enter" &&
        validator.isValidFormat(this.barcode, validator.formats.ean8)
      ) {
        User.api()
          .$getByBarcode(this.barcode)
          .then((res) => {
            this.user = User.find(res.response.data.uuid);
          });
        this.barcode = "";
      } else if (e.key >= "0" && e.key <= "9") {
        this.barcode += e.key;
      } else if (e.key === "Enter") {
        this.barcode = "";
      }
    },
    addCartItem(barcode) {
      this.addItem({ barcode });
    },
    decrementCount(cartItem) {
      const newItem = new CartItem(cartItem);
      newItem.count -= 1;
      this.updateItem(newItem);
    },
    incrementCount(cartItem) {
      const newItem = new CartItem(cartItem);
      newItem.count += 1;
      this.updateItem(newItem);
    },
    showConfirmDialog(item) {
      this.confirmDialog = true;
      this.selected = item;
    },
  },
};
</script>

<style>
.o-input {
  text-align: center;
}
</style>
