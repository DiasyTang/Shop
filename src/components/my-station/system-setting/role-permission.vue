<template>
  <div class="role-permission-div">
    <div class="table-div">
      <div class="header-div">
        <label>角色列表</label>
        <el-button icon="el-icon-refresh" size="mini" circle @click="refresh"></el-button>
      </div>
      <el-table
        :show-header="false"
        :data="rData"
        v-loading="loading"
        ref="rTable"
        border
        highlight-current-row
        @current-change.self="handleCurrentChange"
      >
        <el-table-column prop="roleName"></el-table-column>
      </el-table>
    </div>
    <div class="tree-div">
      <div class="header-div">
        <label>权限列表</label>
        <el-button size="mini" :loading="savePermissionConfirm" @click="saveRolePermission" round>保存</el-button>
      </div>
      <el-tree
        v-loading="treeLoading"
        :expand-on-click-node="false"
        default-expand-all
        :data="pTree"
        :props="defaultMenu"
        class="role-permission-tree"
      >
        <span class="custom-tree-node" slot-scope="{ node,data }">
          <span>{{ node.label }}</span>
          <span>
            <el-checkbox
              @change="checkedPermission($event,p.code)"
              v-for="p in data.permissions"
              v-bind:key="p.code"
              v-model="p.isAssignedToRole"
            >{{p.name}}</el-checkbox>
          </span>
        </span>
      </el-tree>
    </div>
  </div>
</template>

<script>
import { Message } from "element-ui";

export default {
  name: "role-permission",
  data() {
    return {
      rData: [],
      pTree: [],
      savePermissionConfirm: false,
      loading: false,
      treeLoading: false,
      selectedPermissions: [],
      defaultMenu: { children: "children", label: "title", id: "guid" }
    };
  },
  methods: {
    checkedPermission(checked, code) {
      if (checked) {
        this.selectedPermissions.push(code);
      } else {
        this.selectedPermissions = this.selectedPermissions.filter(
          q => q != code
        );
      }
    },
    saveRolePermission() {
      if (this.pTree && this.pTree.length > 0) {
        this.savePermissionConfirm = true;
        this.$post("/role/changepermission", this.selectedPermissions).then(
          res => {
            this.savePermissionConfirm = false;
            if (res.isSuccess) {
              Message.success(res.message);
            } else {
              Message.error(res.message);
            }
          },
          err => {
            Message.error(err.message);
            this.savePermissionConfirm = false;
          }
        );
      } else {
        Message.info("请选择角色来设置角色权限");
      }
    },
    handleCurrentChange(row) {
      this.treeLoading = true;
      var timeStamp = Date.now();
      this.$get("/permission/tree", {
        TimeStamp: timeStamp,
        id: row.roleId
      }).then(
        res => {
          if (res.isSuccess) {
            if (timeStamp == res.timeStamp) {
              if (this.rData && this.rData.length > 0) {
                this.pTree = res.data.tree;
                this.selectedPermissions = res.data.selectedPermissions;
              }
              this.treeLoading = false;
            }
          } else {
            this.treeLoading = false;
            Message.error(res.message);
          }
        },
        err => {
          this.loading = false;
          Message.error(err.message);
        }
      );
    },
    refresh() {
      this.pTree = [];
      this.$refs.rTable.setCurrentRow(null);
      this.getRoleData();
    },
    getRoleData() {
      this.rData = [];
      this.loading = true;
      var timeStamp = Date.now();
      this.$get("/role/list_no_page", {
        TimeStamp: timeStamp
      }).then(
        res => {
          if (res.isSuccess) {
            if (timeStamp == res.timeStamp) {
              this.rData = res.data;
              this.loading = false;
            }
          } else {
            this.loading = false;
            Message.error(res.message);
          }
        },
        err => {
          this.loading = false;
          Message.error(err.message);
        }
      );
    }
  },
  created() {
    this.getRoleData();
  }
};
</script>

<style>
.header-div {
  background-color: lightgray;
  display: flex;
  padding: 10.5px;
  border-radius: 10px;
}

.header-div > label {
  flex: auto;
}

.role-permission-div {
  display: flex;
  flex-direction: row;
}

.role-permission-div > .table-div {
  flex: 1;
}

.role-permission-div > .tree-div {
  flex: 2;
  margin-left: 30px;
}

.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-right: 8px;
}

.el-tree-node__content {
  font-size: 25px;
  padding: 10px;
  border-bottom: solid 1px #ebeef5;
}

.el-tree-node__expand-icon {
  font-size: 25px;
}
</style>