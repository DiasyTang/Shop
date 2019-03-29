<template>
  <div class="goodInfo-div">
    <div class="title-div">
      <label>查看订单信息</label>
      <el-button type="primary" :loading="saveConfirm" @click="confirmOrder">确认收货</el-button>
      <el-button @click="goBack" type="text">返回</el-button>
    </div>
    <el-form :model="orderForm" ref="gForm" label-width="120px">
      <el-form-item label="订单编号" prop="orderId">
        <el-input v-model="orderForm.orderId" placeholder="订单编号" disabled></el-input>
      </el-form-item>
      <el-form-item label="订单价格" prop="orderPrice">
        <el-input v-model="orderForm.orderPrice" placeholder="订单价格" disabled></el-input>
      </el-form-item>
      <el-form-item label="商品数量" prop="count">
        <el-input-number v-model="orderForm.count" :min="0" label="商品数量" disabled></el-input-number>
      </el-form-item>
      <el-form-item label="订单状态" prop="status">
        <el-select v-model="orderForm.status" placeholder="商品状态" disabled>
          <el-option label="正在进行" :value="1"></el-option>
          <el-option label="已结束" :value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="订单创建时间" prop="orderStart">
        <el-date-picker v-model="orderForm.orderStart" type="date" placeholder="订单创建时间" disabled></el-date-picker>
      </el-form-item>
      <el-form-item label="订单结束时间" prop="orderDone">
        <el-date-picker v-model="orderForm.putOff" type="date" placeholder="订单结束时间" disabled></el-date-picker>
      </el-form-item>
      <el-form-item label="备注" prop="orderDone">
        <el-input type="textarea" v-model="orderForm.desc" disabled></el-input>
      </el-form-item>
    </el-form>
    <el-table :data="orderForm.goods" border style="width: 100%">
      <el-table-column prop="goodPic" label="商品图片">
        <template slot-scope="scope">
          <img :src="scope.row.goodPic">
        </template>
      </el-table-column>
      <el-table-column prop="goodName" label="商品名称"></el-table-column>
      <el-table-column prop="goodPrice" label="商品单价"></el-table-column>
      <el-table-column prop="goodCount" label="商品数量"></el-table-column>
      <el-table-column prop="amount" label="总价"></el-table-column>
      <el-table-column fixed="right" label="操作" width="120px">
        <template slot-scope="scope">
          <el-button @click="returnGood(scope.row)" type="text" size="small">退货</el-button>
          <el-button @click="confirmGood(scope.row)" type="text" size="small">确认收货</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { Message } from "element-ui";

export default {
  name: "orderInfo",
  data() {
    return {
      saveConfirm: false,
      orderForm: {
        orderStart: "",
        orderDone: "",
        desc: "",
        count: 0,
        status: 1,
        orderName: "",
        orderId: "",
        goods: [
          {
            goodId: "",
            goodName: "",
            goodPic: "",
            goodPrice: "",
            goodCount: 0,
            amount: 0
          }
        ]
      }
    };
  },
  methods: {
    goBack() {
      this.$router.push("order");
    },
    confirmOrder() {}
  }
};
</script>

<style>
.goodInfo-div > .title-div {
  display: flex;
  flex-direction: row;
  font-size: 25px;
  margin: 0 0 20px 0;
  border-bottom: solid 1px #dcdfe6;
  padding-bottom: 10px;
}

.goodInfo-div > .title-div > label {
  flex: auto;
  align-self: center;
  text-align: left;
  font-weight: bold;
}

.goodInfo-div > .el-form {
  margin: 0 30%;
}
</style>