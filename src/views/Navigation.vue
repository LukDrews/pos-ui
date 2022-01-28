<template>
  <div>
    <v-navigation-drawer
      app
      v-model="drawer"
      :mini-variant="mini"
      mini-variant-width="56"
      permanent
    >
      <v-list-item class="px-2">
        <v-btn icon @click.stop="mini = !mini">
          <v-icon v-if="!mini">mdi-chevron-left</v-icon>
          <v-icon v-if="mini">mdi-chevron-right</v-icon>
        </v-btn>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item
          class="ma-2"
          v-for="item in items"
          :key="item.title"
          :to="item.path"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app></v-app-bar>
  </div>
</template>

<script>
export default {
  name: 'Navigation',
  data: () => ({
    drawer: true,
    items: [
      { title: 'Home', icon: 'mdi-home-outline', path: '/' },
      { title: 'Shop', icon: 'mdi-store-outline', path: '/shop' },
      { title: 'Products', icon: 'mdi-tag-outline', path: '/products'},
      { title: 'Users', icon: 'mdi-account-outline', path: '/users' },
      { title: 'Orders', icon: 'mdi-cart-outline', path: '/orders' },
      { title: 'Statistics', icon: 'mdi-finance', path: '/statistics' },
      { title: 'Transactions', icon: 'mdi-credit-card-outline', path: '/transactions' },
      { title: 'Roles', icon: 'mdi-account-lock-open-outline', path: '/roles' },
    ],
    mini: false,
  }),
};
</script>

<style>
</style>
