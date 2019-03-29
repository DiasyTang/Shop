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
          <el-form-item label="商品卖家" prop="seller">
            <el-input
              v-model="searchForm.seller"
              placeholder="商品卖家"
              @keyup.enter.native="getData(-1)"
            ></el-input>
          </el-form-item>
          <el-form-item label="商品状态" prop="status">
            <el-select :clearable="true" v-model="searchForm.status" placeholder="商品状态">
              <el-option label="正常" :value="1"></el-option>
              <el-option label="下架" :value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="上架日期" prop="putOn">
            <el-date-picker v-model="searchForm.putOn" type="date" placeholder="选择上架日期"></el-date-picker>
          </el-form-item>
          <el-form-item label="下架日期" prop="putOff">
            <el-date-picker v-model="searchForm.putOff" type="date" placeholder="选择下架日期"></el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" :loading="loading" @click="getData(-1)">查询</el-button>
          </el-form-item>
        </el-form>
      </el-collapse-item>
      <el-collapse-item title="列表" name="2">
        <el-button-group>
          <el-tooltip content="删除" placement="top">
            <el-button type="default" icon="el-icon-delete" @click="deleteGoods"></el-button>
          </el-tooltip>
          <el-tooltip content="下架" placement="top">
            <el-button type="default" icon="el-icon-close" @click="changeGoods(2)"></el-button>
          </el-tooltip>
          <el-tooltip content="上架" placement="top">
            <el-button type="default" icon="el-icon-check" @click="changeGoods(1)"></el-button>
          </el-tooltip>
          <el-button type="primary" @click="addGood">新增商品</el-button>
        </el-button-group>
        <el-table
          :data="goodData"
          v-loading="loading"
          ref="gTable"
          tooltip-effect="dark"
          border
          style="width: 100%"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="goodName" label="商品名称">
            <template slot-scope="scope">
              <router-link :to="'good?goodId='+scope.row.goodId">{{scope.row.goodName}}</router-link>
            </template>
          </el-table-column>
          <el-table-column prop="seller" label="商品卖家"></el-table-column>
          <el-table-column prop="status" label="状态">
            <template slot-scope="scope">
              <el-tag
                :type="scope.row.status===1 ? 'primary' : 'success'"
                disable-transitions
              >{{scope.row.status===1?'正常':'下架'}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="putOn" label="上架时间"></el-table-column>
          <el-table-column prop="putOff" label="下架时间"></el-table-column>
          <el-table-column prop="count" label="总量"></el-table-column>
          <el-table-column prop="rest" label="剩余数量"></el-table-column>
          <el-table-column prop="desc" label="商品备注"></el-table-column>
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
    <good-info v-else :goodId="goodId"></good-info>
  </div>
</template>

<script>
import { Message } from "element-ui";
import goodInfo from "./goodInfo.vue";

export default {
  name: "good",
  components: {
    goodInfo
  },
  data() {
    return {
      openCollapse: ["1", "2"],
      goodData: [],
      currentPage: 1,
      pageSize: 20,
      loading: false,
      total: 0,
      goodId: "",
      searchForm: {
        goodName: "",
        status: "",
        seller: "",
        putOn: "",
        putOff: ""
      }
    };
  },
  methods: {
    getData(f = 0) {
      this.goodData = [];
      this.loading = true;
      if (f === -1) {
        this.currentPage = 1;
      }
      var timeStamp = Date.now();
      var param = {
        parameter: this.searchForm,
        currentPage: this.currentPage,
        pageSize: this.pageSize,
        timeStamp: timeStamp
      };
      this.$get("/good/list", param).then(
        res => {
          if (res.isSuccess) {
            if ((res.timeStamp = timeStamp)) {
              this.loading = false;
              this.goodData = res.data;
              this.total = res.total;
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
    },
    deleteGoods() {
      if (this.$refs.gTable.store.states.selection.length === 0) {
        Message.info("请选中需要删除的商品");
      } else {
        this.$confirm("请再次确认是否删除已选中的商品？")
          .then(_ => {
            this.$post("/good/delete", {
              ids: this.$refs.gTable.store.states.selection.map(q => q.goodId)
            }).then(res => {
              if (res.isSuccess) {
                Message.success(res.message);
              }
              this.getData(-1);
            });
          })
          .catch(_ => {});
      }
    },
    changeGoods(newStatus) {
      if (this.$refs.gTable.store.states.selection.length === 0) {
        Message.info(`请选中需要${newStatus === 1 ? "上架" : "下架"}的商品`);
      } else {
        this.$confirm(
          `请再次确认是否${newStatus === 1 ? "上架" : "下架"}已选中的商品？`
        )
          .then(_ => {
            this.$get("/good/changestatus", {
              ids: this.$refs.gTable.store.states.selection.map(q => q.goodId),
              status: newStatus
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
    addGood() {
      this.$router.push("good?goodId=0");
    }
  },
  watch: {
    "$route.query": {
      handler(newName, oldName) {
        this.goodId = newName.goodId;
        if (!this.goodId) {
          this.getData();
        }
      },
      immediate: true
    }
  }
};
</script>

<style>
.el-button-group {
  float: right;
  margin: 0 0 20px 0;
}
</style>