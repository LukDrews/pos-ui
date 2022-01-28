<template>
  <v-container class="grow d-flex flex-column" fill-height>
    <v-row class="flex-grow-1">
      <v-col cols="8" class="pr-0">
        <v-card height="100%">
          <v-card-title>
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
            <template v-slot:item.controls="{ item }">
              <ConfirmDialog
                title="Delete item"
                @on-confirm="deleteCartItem(item)"
              />
            </template>
          </v-data-table>
        </v-card>
      </v-col>
      <v-col cols="4">
        <v-card height="100%">
          <v-card-title>Account Details</v-card-title>
          <v-card-title class="mt-8">
            <v-avatar size="150">
              <v-img aspect-ratio="1" :src="imageUrl" :alt="user.fullName" />
            </v-avatar>
          </v-card-title>
          <v-card-text>
            <div class="my-4 text-subtitle-1">{{ user.fullName }}</div>
            <!-- <p class="text-subtitle-1">Username:</p> -->
            <div class="my-4 text-subtitle-1">Balance:</div>

            <div class="text-subtitle-1"></div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { barcode as validator } from '../validators';
import { CartItem, User } from '../store/models';
import ConfirmDialog from '../components/dialogs/ConfirmDialog.vue';

export default {
  name: 'Shop',
  components: {
    // eslint-disable-next-line vue/no-unused-components
    ConfirmDialog,
  },
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
      user: new User(),
      defaultImageUrl: `${process.env.VUE_APP_API_URL}/static/images/default/avatar.png`,
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
    imageUrl() {
      return this.user?.imageUrl ? this.user.imageUrl : this.defaultImageUrl;
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
      } else if (
        e.key === 'Enter' &&
        validator.isValidFormat(this.barcode, validator.formats.ean8)
      ) {
        User.api()
          .$getByBarcode(this.barcode)
          .then((res) => {
            this.user = User.find(res.response.data.uuid);
          });
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
