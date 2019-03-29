<template>
  <div>
    <el-button @click="showDialog" type="text">选择商品卖家</el-button>
    <el-dialog title="选择商品卖家" :visible.sync="isVisible" width="40%" center>
      <el-radio-group
        v-model="tempSelectedSellerId"
        @change="selectSellerChange"
        style="width:100%"
      >
        <el-table v-loading="loading" :data="tableData" border>
          <el-table-column prop="userName" label="商品卖家" show-overflow-tooltip>
            <template slot-scope="scope">
              <el-radio :label="scope.row.userId">{{scope.row.userName}}</el-radio>
            </template>
          </el-table-column>
          <el-table-column prop="status" label="状态"></el-table-column>
          <el-table-column prop="createTime" label="创建时间" show-overflow-tooltip></el-table-column>
          <el-table-column prop="creator" label="创建人"></el-table-column>
        </el-table>
      </el-radio-group>
      <el-pagination
        @prev-click="getData"
        @next-click="getData"
        @size-change="getData"
        @current-change="getData"
        :current-page.sync="currentPage"
        :page-size.sync="pageSize"
        layout="total, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeDialog(false)">取 消</el-button>
        <el-button type="primary" @click="closeDialog(true)">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "selectSeller",
  props: {
    selectedSellerId: ""
  },
  data() {
    return {
      isVisible: false,
      tableData: [],
      currentPage: 1,
      pageSize: 5,
      total: 0,
      loading: false,
      tempSelectedSeller: {},
      tempSelectedSellerId: this.selectedSellerId
    };
  },
  methods: {
    showDialog() {
      debugger;
      this.isVisible = true;
      this.tempSelectedSellerId = this.selectedSellerId;
      (this.currentPage = 1), (this.pageSize = 5);
      this.getData();
    },
    closeDialog(f) {
      if (f) {
        this.$emit("selectedSeller", this.tempSelectedSeller);
      }
      this.isVisible = false;
    },
    selectSellerChange(val) {
      this.tempSelectedSeller = this.tableData.find(q => q.userId == val);
    },
    getData() {
      this.tableData = [];
      this.loading = true;
      var query = {
        PageSize: this.pageSize,
        CurrentPage: this.currentPage,
        Keyword: this.keyword,
        Status: -1,
        TimeStamp: Date.now()
      };
      this.$get("/user/list", query).then(
        res => {
          this.loading = false;
          if (res.isSuccess) {
            if (query.TimeStamp == res.timeStamp) {
              this.tableData = res.data.userList;
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
  }
};
</script>

<style>
</style>