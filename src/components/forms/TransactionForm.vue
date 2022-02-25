<template>
  <o-modal v-model:active="isActive" scroll="clip" :can-cancel="false">
    <div class="p-4">
      <div class="pb-4">
        <h5>{{ title }}</h5>
      </div>
      <div class="pb-4">
        <o-field grouped label="User">
          <o-autocomplete
            v-model="searchString"
            :custom-formatter="userFormatter"
            expanded
            :data="filteredDataArray"
            placeholder="User"
            icon="search"
            clearable
            @select="(user) => (selectedUser = user)"
          >
            <template #empty>No results found</template>
          </o-autocomplete>
        </o-field>
        <o-field grouped label="Type">
          <o-tabs v-model="transactionType" expanded type="toggle">
            <o-tab-item
              label="Deposit"
              value="deposit"
              icon="download"
            ></o-tab-item>
            <o-tab-item
              label="Withdraw"
              value="withdraw"
              icon="upload"
            ></o-tab-item>
          </o-tabs>
        </o-field>
        <o-field grouped label="Amount">
          <o-input
            v-model.number="amount"
            placeholder="Amount"
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
import { Transaction, User } from "../../store/models";

function initialState() {
  return {
    transactionType: "deposit",

    searchString: "",
    selectedUser: null,

    amount: null,
  };
}

export default {
  name: "AddTransactionForm",
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
    return initialState();
  },
  computed: {
    isActive: {
      get() {
        return this.active;
      },
      set(newValue) {
        this.$emit("update:active", newValue);
      },
    },
    users() {
      return User.query().with("group").all();
    },
    filteredDataArray() {
      return this.users.filter((user) => {
        return (
          user.fullName
            .toString()
            .toLowerCase()
            .indexOf(this.searchString.toLowerCase()) >= 0
        );
      });
    },
  },
  watch: {
    active(val) {
      if (val) {
        this.resetComponent();
        Transaction.api().$fetch();
        User.api().$fetch();
      }
    },
  },
  methods: {
    userFormatter(user) {
      console.log(user);
      if (user.group) {
        return `${user.fullName} - ${user.group.name}`;
      }
      return `${user.fullName}`;
    },
    resetComponent() {
      Object.assign(this.$data, initialState());
    },
    onCancel() {
      this.isActive = false;
      this.$emit("on-cancel");
    },
    async onConfirm() {
      const transaction = new Transaction();
      transaction.userUuid = this.selectedUser?.uuid;
      transaction.amount =
        this.transactionType === "deposit" ? this.amount : -this.amount;
      console.log(transaction);
      this.isActive = false;
      this.$emit("on-confirm", transaction);
    },
  },
};
</script>

<style scoped>
>>> .o-tabs__content {
  display: none;
}
</style>
