<template>
  <div class="setting-div">
    <div class="search-div">
      <el-input
        placeholder="输入关键字搜索"
        suffix-icon="el-icon-search"
        v-model="keyword"
        @keyup.enter.native="getData(-1)"
      ></el-input>
      <el-button-group>
        <el-tooltip content="删除" placement="top">
          <el-button type="default" icon="el-icon-delete" @click="deletePermissions"></el-button>
        </el-tooltip>
        <el-tooltip content="禁用" placement="top">
          <el-button type="default" icon="el-icon-close" @click="changePermissions(0)"></el-button>
        </el-tooltip>
        <el-tooltip content="启用" placement="top">
          <el-button type="default" icon="el-icon-check" @click="changePermissions(1)"></el-button>
        </el-tooltip>
        <el-button type="primary" @click="editPermission(null)">新增权限</el-button>
      </el-button-group>
    </div>
    <el-table
      v-loading="loading"
      ref="pTable"
      :data="permissionData"
      tooltip-effect="dark"
      style="width: 100%"
      border
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="permissionName" label="权限名称"></el-table-column>
      <el-table-column prop="menuName" label="关联菜单"></el-table-column>
      <el-table-column prop="actionCode" label="操作码"></el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.status===1 ? 'primary' : 'success'"
            disable-transitions
          >{{scope.row.status===1?'正常':'禁用'}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" show-overflow-tooltip></el-table-column>
      <el-table-column prop="creator" label="创建人"></el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="deletePermission(scope.row)" type="text" size="small">删除</el-button>
          <el-button @click="editPermission(scope.row)" type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @prev-click="getData"
      @next-click="getData"
      @size-change="getData"
      @current-change="getData"
      :current-page.sync="currentPage"
      :page-sizes="[20,50,100, 200, 300, 400]"
      :page-size.sync="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
    <el-dialog title="编辑权限" :visible.sync="editVisible" width="30%" center>
      <el-form :model="ruleForm" :rules="rules" ref="pForm" label-width="100px">
        <el-form-item label="权限名称" prop="permissionName">
          <el-input v-model="ruleForm.permissionName"></el-input>
        </el-form-item>
        <el-form-item label="操作码" prop="actionCode">
          <el-input v-model="ruleForm.actionCode"></el-input>
        </el-form-item>
        <el-form-item label="菜单" prop="menuId">
          <label>{{ruleForm.menuName}}</label>
          <el-tree
            v-loading="treeLoading"
            :data="menuTree"
            :props="defaultMenu"
            @node-click="nodeclick"
          ></el-tree>
        </el-form-item>
        <el-form-item label="类型" prop="type">
          <el-select v-model="ruleForm.type" placeholder="请选择权限类型">
            <el-option label="菜单" :value="1"></el-option>
            <el-option label="动作" :value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-switch
            active-text="启用"
            inactive-text="禁用"
            :active-value="1"
            :inactive-value="2"
            v-model="ruleForm.status"
          ></el-switch>
        </el-form-item>
        <el-form-item label="备注" prop="desc">
          <el-input type="textarea" v-model="ruleForm.desc"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editVisible = false">取 消</el-button>
        <el-button type="primary" :loading="saveConfirm" @click="savePermission">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { Message } from "element-ui";
export default {
  name: "permission",
  data() {
    return {
      permissionData: [],
      keyword: "",
      total: 0,
      pageSize: 20,
      currentPage: 1,
      loading: false,
      editVisible: false,
      saveConfirm: false,
      treeLoading: false,
      menuTree: [],
      defaultMenu: { children: "children", label: "title", id: "guid" },
      ruleForm: {
        permissionName: "",
        permissionId: "",
        menuName: "",
        menuId: "",
        actionCode: "",
        status: 2,
        type: 1,
        desc: ""
      },
      rules: {
        permissionName: [
          { required: true, message: "请输入权限名称", trigger: "blur" }
        ],
        actionCode: [
          { required: true, message: "请输入操作码", trigger: "blur" }
        ],
        menuId: [
          { required: true, message: "请选择关联菜单", trigger: "change" }
        ],
        type: [
          {
            required: true,
            message: "请选择权限类型",
            trigger: "change"
          }
        ],
        status: [
          {
            required: true,
            message: "请选择权限状态",
            trigger: "change"
          }
        ],
        desc: [{ required: false, message: "权限备注信息", trigger: "blur" }]
      }
    };
  },
  methods: {
    nodeclick(data) {
      this.ruleForm.menuName = data.title;
      this.ruleForm.menuId = data.guid;
    },
    savePermission() {
      this.$refs.pForm.validate(valid => {
        if (valid) {
          this.saveConfirm = true;
          this.$post("/permission/edit", this.ruleForm).then(
            res => {
              if (res.isSuccess) {
                Message.success(res.message);
                this.editVisible = false;
                this.getData();
              } else {
                Message.error(res.message);
              }
              this.saveConfirm = false;
            },
            err => {
              this.saveConfirm = false;
              Message.error(err.message);
            }
          );
        } else {
          return false;
        }
      });
    },
    editPermission(row) {
      this.editVisible = true;
      let timeStamp = Date.now();
      this.treeLoading = true;
      this.$get("/menu/tree", {
        TimeStamp: timeStamp
      }).then(
        res => {
          this.treeLoading = false;
          if (res.isSuccess) {
            if (res.timeStamp == timeStamp) {
              this.menuTree = res.data;
            }
          } else {
            Message.error(res.message);
          }
        },
        err => {
          Message.error(err.message);
          this.treeLoading = false;
        }
      );
      if (row) {
        this.ruleForm = row;
      }
    },
    deletePermission(row) {
      var ids;
      if (row instanceof Array) {
        ids = row.map(q => q.permissionId);
      } else {
        ids = [row.permissionId];
      }

      this.$confirm("请再次确认是否删除已选中的权限？")
        .then(_ => {
          this.$get("/permission/delete", {
            ids: ids
          }).then(res => {
            if (res.isSuccess) {
              Message.success(res.message);
            }
            this.getData(-1);
          });
        })
        .catch(_ => {});
    },
    deletePermissions() {
      if (this.$refs.pTable.store.states.selection.length === 0) {
        Message.info("请选中需要删除的权限");
      } else {
        this.deletePermission(this.$refs.pTable.store.states.selection);
      }
    },
    changePermissions(status) {
      if (this.$refs.pTable.store.states.selection.length === 0) {
        Message.info(`请选中需要${status === 0 ? "禁用" : "启用"}的权限`);
      } else {
        this.$confirm(
          `请再次确认是否${status === 0 ? "禁用" : "启用"}已选中的权限？`
        )
          .then(_ => {
            this.$get("/permission/changestatus", {
              ids: this.$refs.pTable.store.states.selection.map(
                q => q.permissionId
              ),
              status: status
            }).then(
              res => {
                if (res.isSuccess) {
                  Message.success(res.message);
                }
                this.getData(-1);
              },
              err => Message.error(err.message)
            );
          })
          .catch(_ => {});
      }
    },
    getData(f = 1) {
      this.loading = true;
      if (f === -1) {
        this.currentPage = 1;
      }
      var query = {
        PageSize: this.pageSize,
        CurrentPage: this.currentPage,
        Keyword: this.keyword,
        Status: -1,
        TimeStamp: Date.now()
      };
      this.$get("/permission/list", query).then(
        res => {
          this.loading = false;
          if (res.isSuccess) {
            if (query.TimeStamp == res.timeStamp) {
              this.permissionData = res.data;
              this.total = res.total;
            }
          } else {
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
    this.getData();
  }
};
</script>

<style>
</style>