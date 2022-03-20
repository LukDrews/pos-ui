<template>
  <section class="container h-full mx-auto bg-gray-200">
    <ConfirmDialog
      v-model:active="confirmDialog"
      @on-confirm="deleteItem(selected)"
    />

    <div class="flex h-full flex-row gap-x-4">
      <div class="w-3/4 p-4 h-full bg-white rounded">
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
              ></o-input>
            </o-field>
          </o-table-column>
        </o-table>
      </div>
      <div
        class="w-1/4 p-4 h-full bg-white rounded flex flex-col justify-between"
      >
        <div>
          <div class="pb-4 flex flex-row justify-center">
            <img
              class="h-32 aspect-square object-cover rounded-full border border-inherit drop-shadow"
              :src="user.imageUrl"
            />
          </div>
          <ul class="">
            <li
              v-for="item in userData"
              :key="item.label"
              class="flex flex-row justify-between pb-2"
            >
              <span> {{ item.label }} </span>
              <span>{{ item.value }}</span>
            </li>
          </ul>
        </div>
        <div>
          <o-button
            expanded
            variant="success"
            :disabled="disablePayment"
            @click="createOrder"
          >
            Pay
          </o-button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import apiClientMixin from "../mixins/apiClientMixin";

import { barcode as validator } from "../utils/validators";
import { CartItem, User, Group, Order } from "../store/models";
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
      userBarcode: "",

      selected: null,
      confirmDialog: false,
    };
  },
  computed: {
    data() {
      return CartItem.query().withAll().all();
    },
    userData() {
      return [
        { label: "Name:", value: this.user?.fullName || "-" },
        { label: "Birthdate:", value: this.user?.birthDate || "-" },
        { label: "Goup:", value: this.user?.group?.name || "-" },
        { label: "Balance:", value: this.user?.balanceFormatted },
      ];
    },
    disablePayment() {
      return this.user.uuid === null || this.data.length === 0;
    },
    user() {
      const currUser =
        User.query().with("group").where("barcode", this.userBarcode).first() ??
        new User();
      return currUser;
    },
  },
  created() {
    window.addEventListener("keydown", this.processKey);
  },
  unmounted() {
    window.removeEventListener("keydown", this.processKey);
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
        this.userBarcode = this.barcode;
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
    createOrder() {
      if (this.user.uuid) {
        Order.api()
          .$create({ userUuid: this.user.uuid })
          .then(() => {
            CartItem.deleteAll();
            this.userBarcode = "";
          });
      }
    },
    showConfirmDialog(item) {
      this.confirmDialog = true;
      this.selected = item;
    },
  },
};
</script>

<style scoped>
.o-input {
  text-align: center;
}
</style>
