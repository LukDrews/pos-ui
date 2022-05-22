<template>
  <section class="container mx-auto p-4 bg-white rounded">
    <UserForm v-model:active="inputForm" title="Add user" :selected="selected" @on-confirm="addOrUpdateItem" />
    <ConfirmDialog v-model:active="confirmDialog" @on-confirm="deleteItem(selected)" />

    <div class="flex justify-between items-center pb-4">
      <o-button @click.stop="showForm(null)">Add user</o-button>
      <div class="flex gap-2">
        <o-button @click="downloadBarcodes">Export</o-button>
        <o-upload v-model="importFile" accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet">
          <o-button tag="a" :icon-left="this.importFile ? '' : 'plus'">{{ this.importFile?.name || "import" }}
          </o-button>
        </o-upload>
        <o-button v-if="importFile" @click="importUsers">
          Apply
        </o-button>
        <o-button icon-right="redo" @click="getItems()" />
      </div>
    </div>

    <o-table :data="data" paginated per-page="15">
      <template #empty>
        <div class="m-4 text-center">No users found</div>
      </template>
      <o-table-column v-slot="props" width="56">
        <img class="w-8 aspect-square rounded-full border border-inherit" :src="props.row.imageUrl" />
      </o-table-column>

      <o-table-column v-slot="props" field="firstName" label="First Name" sortable>
        {{ props.row.firstName }}
      </o-table-column>

      <o-table-column v-slot="props" field="lastName" label="Last Name" sortable>
        {{ props.row.lastName }}
      </o-table-column>

      <o-table-column v-slot="props" field="group.name" label="Group" sortable>
        {{ props.row.group?.name }}
      </o-table-column>

      <o-table-column v-slot="props" field="birthDate" label="Date" sortable>
        {{ props.row.birthDate }}
      </o-table-column>

      <o-table-column v-slot="props" field="balanceFormatted" label="Balance" sortable>
        {{ props.row.balanceFormatted }}
      </o-table-column>

      <o-table-column v-slot="props" field="barcode" label="Barcode" sortable>
        {{ props.row.barcode }}
      </o-table-column>

      <o-table-column v-slot="props" width="80">
        <div class="float-right">
          <o-icon clickable class="w-6 h-6" icon="edit" @click.stop="showForm(props.row)" />
          <o-icon clickable class="w-6 h-6" icon="trash" @click.stop="showConfirmDialog(props.row)" />
        </div>
      </o-table-column>
    </o-table>
  </section>
</template>

<script>
import apiClientMixin from "../mixins/apiClientMixin";

import { User, Group } from "../store/models";
import UserForm from "../components/forms/UserForm.vue";
import ConfirmDialog from "../components/dialogs/ConfirmDialog.vue";

export default {
  name: "UserView",
  components: {
    UserForm,
    ConfirmDialog,
  },
  mixins: [apiClientMixin],
  data() {
    return {
      apiClient: User,

      selected: null,
      inputForm: false,
      confirmDialog: false,
      importFile: null,
    };
  },
  computed: {
    data() {
      return User.query().withAll().all();
    },
  },
  methods: {
    showForm(selected) {
      this.inputForm = true;
      this.selected = selected;
    },
    showConfirmDialog(selected) {
      this.confirmDialog = true;
      this.selected = selected;
    },
    importUsers() {
      if (this.importFile) {
        User.import(this.importFile)
        this.importFile = null;
      }
    },
    downloadBarcodes(){
      const users = User.query().all();
      const headers = ["barcode", "firstName", "lastName"]
      let data = headers.join(",") + "\n";

      for (const user of users) {
        let line = [];
        for (const header of headers) {
          line.push(user[header])
        }
        data += line.join(",") + "\n";
      }
      this.download("barcodes.csv", data)

    },
    download(filename, text) {
      var element = document.createElement('a');
      element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
      element.setAttribute('download', filename);

      element.style.display = 'none';
      document.body.appendChild(element);

      element.click();

      document.body.removeChild(element);
    }
  },
};
</script>

<style scoped>
:deep() .o-table__td {
  vertical-align: middle;
}
</style>
