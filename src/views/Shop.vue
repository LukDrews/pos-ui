<template>
  <v-card>
    <v-card-title class="d-flex justify-space-between mb-6">
      <h3>Cart</h3>
    </v-card-title>
    <v-data-table
      class="pa-4"
      :headers="headers"
      :items="cartItems"
      :items-per-page="-1"
      hide-default-footer
    >
      <template v-slot:item.count="{ item }">
        <v-text-field
          class="shrink"
          reverse
          v-model="item.count"
          single-line
          solo-inverted
          dense
          hide-details
          prepend-icon="mdi-minus"
          append-outer-icon="mdi-plus"
          @click:prepend="decrementCount(item)"
          @click:append-outer="incrementCount(item)"
        >
        </v-text-field>
      </template>

      <!-- <template v-slot:item.controls="{ item }">
          <div class="d-flex justify-end">
            <UserForm
              title="Edit user"
              :selectedUser="item"
              small
              @on-confirm="updateUser"
            >
              <v-icon>mdi-square-edit-outline</v-icon>
            </UserForm>
            <div class="ms-2"></div>
            <DeleteUserDialog :item="item" @delete-user="deleteUser" />
          </div>
        </template> -->
    </v-data-table>
  </v-card>
</template>

<script>
import { barcode as validator } from '../validators';
import { CartItem } from '../store/models';

export default {
  name: 'Shop',
  data() {
    return {
      barcode: '',
      headers: [
        { text: 'Product name', value: 'product.name' },
        { text: 'Price', value: 'product.price' },
        { text: 'Count', value: 'count', width: '153px' },
        {
          text: '',
          value: 'controls',
          sortable: false,
          align: 'right',
        },
      ],
    };
  },
  created() {
    window.addEventListener('keypress', this.processKey);
    this.getCartItems();
  },
  destroyed() {
    window.removeEventListener('keypress', this.processKey);
  },
  computed: {
    cartItems() {
      return CartItem.query().withAll().all();
    },
  },
  methods: {
    processKey(e) {
      if (
        e.key === 'Enter' &&
        validator.isValidFormat(this.barcode, validator.formats.ean13)
      ) {
        // call Api
        this.addCartItem(this.barcode);
        // reset barcode
        this.barcode = '';
      } else if (e.key >= '0' && e.key <= '9') {
        this.barcode += e.key;
      }
    },
    getCartItems() {
      CartItem.api().$fetch();
    },
    addCartItem(barcode) {
      CartItem.api().$create({ barcode });
    },
    updateCartItem(cartItem, selectedCartItem) {
      CartItem.api().$update(selectedCartItem.uuid, cartItem);
    },
    deleteCartItem(selectedCartItem) {
      CartItem.api().$delete(selectedCartItem.uuid);
    },
    decrementCount(cartItem) {
      const newItem = new CartItem(cartItem);
      newItem.count -= 1;
      CartItem.api().$update(cartItem.uuid, newItem);
    },
    incrementCount(cartItem) {
      const newItem = new CartItem(cartItem);
      newItem.count += 1;
      CartItem.api().$update(cartItem.uuid, newItem);
    },
  },
};
</script>
