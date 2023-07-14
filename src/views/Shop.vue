<template>
  <section class="container h-full mx-auto">
    <ConfirmDialog v-model:active="confirmDialog" @on-confirm="deleteItem(selected)" />

    <div class="flex h-full flex-row gap-x-4">
      <div class="w-3/4 p-4 h-full bg-white rounded">
        <o-table :data="data">
          <template #empty>
            <div class="m-4 text-center">
              No items found. Please scan an item.
            </div>
          </template>
          <o-table-column v-slot="props" field="product.name" label="Name" sortable>
            {{ props.row.product.name }}
          </o-table-column>

          <o-table-column v-slot="props" label="Price" sortable>
            {{ props.row.product.priceFormatted }}
          </o-table-column>

          <o-table-column v-slot="props" field="count" label="Count" width="130" sortable>
            <o-field>
              <o-input v-model="props.row.count" numeric group expanded
                :icon="props.row.count === 1 ? 'trash' : 'minus'" icon-clickable icon-right="plus" icon-right-clickable
                @icon-click="
                  props.row.count === 1
                    ? deleteItem(props.row)
                    : decrementCount(props.row)
                " @icon-right-click="incrementCount(props.row)"></o-input>
            </o-field>
          </o-table-column>
        </o-table>
      </div>
      <div class="w-1/4 p-4 h-full bg-white rounded flex flex-col justify-between">
        <div>
          <div class="pb-4 flex flex-row justify-center">
            <img class="h-32 aspect-square object-cover rounded-full border border-inherit drop-shadow"
              :src="user.imageUrl" />
          </div>
          <ul class="">
            <li v-for="item in userData" :key="item.label" class="flex flex-row justify-between gap-4 pb-2 last:pb-0">
              <span> {{ item.label }} </span>
              <span class="text-right	">{{ item.value }}</span>
            </li>
          </ul>
        </div>
        <div>
          <div class="flex flex-row justify-between pb-2">
            <span>Total:</span>
            <span>{{ paymentTotal }}</span>
          </div>
          <div class="flex flex-row justify-between pb-2">
            <span>Daily orders:</span>
            <span>{{ orderAmount }}</span>
          </div>
          <o-button expanded variant="success" :disabled="disablePayment" @click="createOrder">
            Pay
          </o-button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Dinero from "dinero.js";
import apiClientMixin from "../mixins/apiClientMixin";

import formatters from "../utils/formatters";
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
      orderAmount: 0,

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
        { label: "Group:", value: this.user?.group?.name || "-" },
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
    paymentTotal() {
      let total = Dinero();
      for (const item of this.data) {
        const itemCost = Dinero({ amount: item.product.price }).multiply(item.count)
        total = total.add(itemCost)
      }

      return formatters.toCurrencyFormat(total.getAmount());
    }
  },
  created() {
    window.addEventListener("keydown", this.processKey);
  },
  unmounted() {
    window.removeEventListener("keydown", this.processKey);
  },
  methods: {
    processKey(e) {
      console.log(e.key)
      if (e.key === "Enter") {
        const tmpBarcode = this.barcode;
        this.barcode = ""; // Always reset on enter
        console.log(validator.isProduct(tmpBarcode));
        if (validator.isProduct(tmpBarcode)) {
          this.addCartItem(tmpBarcode);
          return;
        }

        if (validator.isUser(tmpBarcode)) {
          this.userBarcode = tmpBarcode;
          this.dayOrder();
          return;
        }

        this.createOrder();

      } else if (e.key >= "0" && e.key <= "9") {
        this.barcode += e.key;
      } else {
        // Only used for development
        if (e.key === "u") {
          this.userBarcode = "95211893";
        } else if (e.key === "p") {
          this.addCartItem("4260107220015");
        } else if (e.key === "r") {
          const count = User.query().count()
          const random = Math.floor(Math.random() * count);
          const user = User.query().offset(random).limit(1).first();
          this.userBarcode = user.barcode
          console.log(this.userBarcode)
        }
      }

    },
    dayOrder() {
      let orders = Order.query().where("userUuid", this.user.uuid).all();
      let amount = 0;
      orders.forEach(order => {
        if(new Date (order.createdAt).toDateString() === new Date().toDateString()) {
          amount += order.amount;
        }
      });
      this.orderAmount = amount/100;
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
        this.orderAmount = 0;
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
