<template>
  <div class="export-info-div">
    <div class="export-info-header">
      <label>请选择需要导出的资料类型：</label>
      <el-select v-model="option" :loading="loading" placeholder="请选择需要导出的资料类型">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </div>
  </div>
</template>

<script>
import { Message } from "element-ui";

export default {
  name: "info-export",
  data() {
    return {
      options: [],
      loading: false,
      option: ""
    };
  },
  methods: {},
  created() {
    this.loading = true;
    var timeStamp = Date.now();
    this.$get("/export/info", { TimeStamp: timeStamp }).then(
      res => {
        if (res.isSuccess) {
          if (res.timeStamp == timeStamp) {
            this.loading = false;
            this.options = res.data;
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
};
</script>

<style>
.export-info-div > .export-info-header {
  float: left;
}
</style>