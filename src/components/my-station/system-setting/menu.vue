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
          <el-button type="default" icon="el-icon-delete" @click="deleteMenus"></el-button>
        </el-tooltip>
        <el-tooltip content="禁用" placement="top">
          <el-button type="default" icon="el-icon-close" @click="changeMenus(0)"></el-button>
        </el-tooltip>
        <el-tooltip content="启用" placement="top">
          <el-button type="default" icon="el-icon-check" @click="changeMenus(1)"></el-button>
        </el-tooltip>
        <el-button type="primary" @click="editMenu(null)">新增菜单</el-button>
      </el-button-group>
    </div>
    <el-table
      v-loading="loading"
      ref="mTable"
      :data="menuData"
      tooltip-effect="dark"
      style="width: 100%"
      border
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="menuName" label="菜单名称"></el-table-column>
      <el-table-column prop="requestUrl" label="请求地址"></el-table-column>
      <el-table-column prop="menuAlias" label="菜单别名"></el-table-column>
      <el-table-column prop="parentMenuName" label="上级菜单"></el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.status===1 ? 'primary' : 'success'"
            disable-transitions
          >{{scope.row.status===1?'正常':'禁用'}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="defaultRouter" label="默认路由">
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.defaultRouter===1 ? 'primary' : 'success'"
            disable-transitions
          >{{scope.row.defaultRouter===1?'是':'否'}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" show-overflow-tooltip></el-table-column>
      <el-table-column prop="creator" label="创建人"></el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="deleteMenu(scope.row)" type="text" size="small">删除</el-button>
          <el-button @click="editMenu(scope.row)" type="text" size="small">编辑</el-button>
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
    <el-dialog title="编辑菜单" :visible.sync="editVisible" width="30%" center>
      <el-form :model="ruleForm" :rules="rules" ref="mForm" label-width="100px">
        <el-form-item label="菜单名称" prop="menuName">
          <el-input v-model="ruleForm.menuName"></el-input>
        </el-form-item>
        <el-form-item label="菜单别名" prop="menuAlias">
          <el-input v-model="ruleForm.menuAlias"></el-input>
        </el-form-item>
        <el-form-item label="Url地址" prop="requestUrl">
          <el-input v-model="ruleForm.requestUrl"></el-input>
        </el-form-item>
        <el-form-item label="上级菜单" prop="parentMenuId">
          <label>{{ruleForm.parentMenuName}}</label>
          <el-tree
            v-loading="treeLoading"
            :data="menuTree"
            :props="defaultMenu"
            @node-click="nodeclick"
          ></el-tree>
        </el-form-item>
        <el-form-item label="菜单状态" prop="status">
          <el-switch
            active-text="启用"
            inactive-text="禁用"
            :active-value="1"
            :inactive-value="2"
            v-model="ruleForm.status"
          ></el-switch>
        </el-form-item>
        <el-form-item label="默认路由" prop="defaultRouter">
          <el-switch
            active-text="是"
            inactive-text="否"
            :active-value="1"
            :inactive-value="2"
            v-model="ruleForm.defaultRouter"
          ></el-switch>
        </el-form-item>
        <el-form-item label="备注" prop="desc">
          <el-input type="textarea" v-model="ruleForm.desc"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editVisible = false">取 消</el-button>
        <el-button type="primary" :loading="saveConfirm" @click="saveMenu">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { Message } from "element-ui";
export default {
  name: "sys_menu",
  data() {
    return {
      menuData: [],
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
        menuName: "",
        menuId: "",
        menuAlias: "",
        requestUrl: "",
        parentMenuName: "",
        parentMenuId: "",
        defaultRouter: 1,
        status: 1,
        desc: ""
      },
      rules: {
        menuName: [
          { required: true, message: "请输入菜单名称", trigger: "blur" }
        ],
        menuAlias: [
          { required: true, message: "请输入菜单别名", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    nodeclick(data) {
      this.ruleForm.parentMenuName = data.title;
      this.ruleForm.parentMenuId = data.guid;
    },
    saveMenu() {
      this.$refs.mForm.validate(valid => {
        if (valid) {
          this.saveConfirm = true;
          this.$post("/menu/edit", this.ruleForm).then(
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
    editMenu(row) {
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
      this.ruleForm = row || {
        menuName: "",
        menuId: "",
        menuAlias: "",
        requestUrl: "",
        parentMenuName: "",
        parentMenuId: "",
        defaultRouter: 1,
        status: 1,
        desc: ""
      };
    },
    deleteMenu(row) {
      var ids;
      if (row instanceof Array) {
        ids = row.map(q => q.menuId);
      } else {
        ids = [row.menuId];
      }

      this.$confirm("请再次确认是否删除已选中的菜单？")
        .then(_ => {
          this.$get("/menu/delete", {
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
    deleteMenus() {
      if (this.$refs.mTable.store.states.selection.length === 0) {
        Message.info("请选中需要删除的菜单");
      } else {
        this.deleteMenu(this.$refs.mTable.store.states.selection);
      }
    },
    changeMenus(status) {
      if (this.$refs.mTable.store.states.selection.length === 0) {
        Message.info(`请选中需要${status === 0 ? "禁用" : "启用"}的菜单`);
      } else {
        this.$confirm(
          `请再次确认是否${status === 0 ? "禁用" : "启用"}已选中的菜单？`
        )
          .then(_ => {
            this.$get("/menu/changestatus", {
              ids: this.$refs.mTable.store.states.selection.map(q => q.menuId),
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
      this.$get("/menu/list", query).then(
        res => {
          this.loading = false;
          if (res.isSuccess) {
            if (query.TimeStamp == res.timeStamp) {
              this.menuData = res.data;
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