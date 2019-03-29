<template>
  <div>
    <el-collapse v-if="!goodId" v-model="openCollapse">
      <el-collapse-item title="筛选" name="1">
        <el-form :inline="true" :model="searchForm" style="float:left">
          <el-form-item label="商品名称" prop="goodName">
            <el-input
              v-model="searchForm.goodName"
              placeholder="商品名称"
              @keyup.enter.native="getData(-1)"
            ></el-input>
          </el-form-item>
          <el-form-item label="订单状态" prop="status">
            <el-select :clearable="true" v-model="searchForm.status" placeholder="商品状态">
              <el-option label="正在进行" :value="1"></el-option>
              <el-option label="已完成" :value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="订单创建时间" prop="orderStart">
            <el-date-picker v-model="searchForm.orderStart" type="date" placeholder="选择订单创建时间"></el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" :loading="loading" @click="getData(-1)">查询</el-button>
          </el-form-item>
        </el-form>
      </el-collapse-item>
      <el-collapse-item title="列表" name="2">
        <el-button-group>
          <el-tooltip content="删除" placement="top">
            <el-button type="default" icon="el-icon-delete" @click="deleteOrder(null)"></el-button>
          </el-tooltip>
        </el-button-group>
        <el-table
          :data="orderData"
          v-loading="loading"
          ref="gTable"
          tooltip-effect="dark"
          border
          style="width: 100%"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="orderId" label="订单编号">
            <template slot-scope="scope">
              <router-link :to="'order/'+scope.row.orderId">{{scope.row.orderId}}</router-link>
            </template>
          </el-table-column>
          <el-table-column prop="orderPrice" label="订单价格"></el-table-column>
          <el-table-column prop="status" label="订单状态">
            <template slot-scope="scope">
              <el-tag
                :type="scope.row.status===1 ? 'primary' : 'success'"
                disable-transitions
              >{{scope.row.status===1?'正在进行':'已结束'}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="orderStart" label="订单创建时间"></el-table-column>
          <el-table-column prop="orderDone" label="订单结束时间"></el-table-column>
          <el-table-column fixed="right" label="操作" width="100">
            <template slot-scope="scope">
              <el-button @click="deleteOrder(scope.row)" type="text" size="small">删除</el-button>
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
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
export default {
  name: "order",
  data() {
    return {
      openCollapse: ["1", "2"],
      total: 0,
      loading: false,
      currentPage: 1,
      pageSize: 20,
      searchForm: {
        goodName: "",
        status: 1,
        orderStart: ""
      },
      orderData: []
    };
  },
  methods: {
    getData(f = 0) {
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
      this.$get("/order/list", query).then(
        res => {
          this.loading = false;
          if (res.isSuccess) {
            if (query.TimeStamp == res.timeStamp) {
              this.orderData = res.data;
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
    },
    deleteOrder(row) {}
  },
  created() {
    this.getData();
  }
};
</script>

<style>
.el-button-group {
  float: right;
  margin: 0 0 20px 0;
}
</style>