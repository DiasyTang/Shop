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
          <el-button type="default" icon="el-icon-delete" @click="deleteRoles"></el-button>
        </el-tooltip>
        <el-tooltip content="禁用" placement="top">
          <el-button type="default" icon="el-icon-close" @click="changeRoles(0)"></el-button>
        </el-tooltip>
        <el-tooltip content="启用" placement="top">
          <el-button type="default" icon="el-icon-check" @click="changeRoles(1)"></el-button>
        </el-tooltip>
        <el-button type="primary" @click="editRole(null)">新增角色</el-button>
      </el-button-group>
    </div>
    <el-table
      v-loading="loading"
      ref="pTable"
      :data="roleData"
      tooltip-effect="dark"
      style="width: 100%"
      border
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="roleName" label="角色名称"></el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.status===1 ? 'primary' : 'success'"
            disable-transitions
          >{{scope.row.status===1?'正常':'禁用'}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="isBuild" label="内置">
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.isBuild ? 'primary' : 'success'"
            disable-transitions
          >{{scope.row.isBuild?'是':'否'}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="isAdministrator" label="超级管理员">
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.isAdministrator ? 'primary' : 'success'"
            disable-transitions
          >{{scope.row.isAdministrator?'是':'否'}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" show-overflow-tooltip></el-table-column>
      <el-table-column prop="creator" label="创建人"></el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="deleteRole(scope.row)" type="text" size="small">删除</el-button>
          <el-button @click="editRole(scope.row)" type="text" size="small">编辑</el-button>
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
    <el-dialog title="编辑角色" :visible.sync="editVisible" width="30%" center>
      <el-form :model="ruleForm" :rules="rules" ref="pForm" label-width="100px">
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="ruleForm.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色状态" prop="status">
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
        <el-button type="primary" :loading="saveConfirm" @click="saveRole">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { Message } from "element-ui";
export default {
  name: "role",
  data() {
    return {
      roleData: [],
      keyword: "",
      total: 0,
      pageSize: 20,
      currentPage: 1,
      loading: false,
      editVisible: false,
      saveConfirm: false,
      ruleForm: {
        roleName: "",
        roleId: "",
        status: 2,
        desc: ""
      },
      rules: {
        roleName: [
          { required: true, message: "请输入角色名称", trigger: "blur" }
        ],
        desc: [{ required: false, message: "角色备注信息", trigger: "blur" }]
      }
    };
  },
  methods: {
    saveRole() {
      this.$refs.pForm.validate(valid => {
        if (valid) {
          this.saveConfirm = true;
          this.$post("/role/edit", this.ruleForm).then(
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
    editRole(row) {
      this.editVisible = true;
      if (row) {
        this.ruleForm = row;
      }
    },
    deleteRole(row) {
      var ids;
      if (row instanceof Array) {
        ids = row.map(q => q.roleId);
      } else {
        ids = [row.roleId];
      }

      this.$confirm("请再次确认是否删除已选中的角色？")
        .then(_ => {
          this.$get("/role/delete", {
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
    deleteRoles() {
      if (this.$refs.pTable.store.states.selection.length === 0) {
        Message.info("请选中需要删除的角色");
      } else {
        this.deleteRole(this.$refs.pTable.store.states.selection);
      }
    },
    changeRoles(status) {
      if (this.$refs.pTable.store.states.selection.length === 0) {
        Message.info(`请选中需要${status === 0 ? "禁用" : "启用"}的角色`);
      } else {
        this.$confirm(
          `请再次确认是否${status === 0 ? "禁用" : "启用"}已选中的角色？`
        )
          .then(_ => {
            this.$get("/role/changestatus", {
              ids: this.$refs.pTable.store.states.selection.map(q => q.roleId),
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
      this.$get("/role/list", query).then(
        res => {
          this.loading = false;
          if (res.isSuccess) {
            if (query.TimeStamp == res.timeStamp) {
              this.roleData = res.data;
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