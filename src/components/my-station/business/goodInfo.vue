<template>
  <div class="goodInfo-div">
    <div class="title-div">
      <label>编辑商品信息</label>
      <el-button @click="goBack" type="text">返回</el-button>
    </div>
    <el-form :model="goodForm" :rules="rules" ref="gForm" label-width="80px">
      <el-form-item label="商品名称" prop="goodName">
        <el-input v-model="goodForm.goodName" placeholder="商品名称"></el-input>
      </el-form-item>
      <el-form-item label="商品卖家" prop="sellerId">
        <label>{{seller.userName}}</label>
        <select-seller
          :selectedSellerId="goodForm.sellerId"
          @selectedSeller="seller=$event;goodForm.sellerId=$event.userId"
        ></select-seller>
      </el-form-item>
      <el-form-item label="商品数量" prop="count">
        <el-input-number v-model="goodForm.count" :min="0" label="商品数量"></el-input-number>
      </el-form-item>
      <el-form-item label="商品状态" prop="status">
        <el-select v-model="goodForm.status" placeholder="商品状态">
          <el-option label="正常" :value="1"></el-option>
          <el-option label="下架" :value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="上架日期" prop="putOn">
        <el-date-picker v-model="goodForm.putOn" type="date" placeholder="选择上架日期"></el-date-picker>
      </el-form-item>
      <el-form-item label="下架日期" prop="putOff">
        <el-date-picker v-model="goodForm.putOff" type="date" placeholder="选择下架日期"></el-date-picker>
      </el-form-item>
      <el-form-item label="备注" prop="desc">
        <el-input type="textarea" v-model="goodForm.desc"></el-input>
      </el-form-item>
      <el-form-item>
        <el-upload
          class="upload-demo"
          action="https://jsonplaceholder.typicode.com/posts/"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :on-success="onSuccess"
          :file-list="goodForm.pictures"
          list-type="picture"
        >
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :loading="saveConfirm" @click="addGood">立即创建</el-button>
        <el-button @click="goBack">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { Message } from "element-ui";
import selectSeller from "./selectSeller.vue";

export default {
  name: "goodInfo",
  components: {
    selectSeller
  },
  props: {
    goodId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      saveConfirm: false,
      seller: {},
      goodForm: {
        putOn: "",
        putOff: "",
        desc: "",
        count:0,
        status: 1,
        goodName: "",
        goodId: "",
        sellerId: "",
        pictures: []
      },
      rules: {
        goodName: [
          { required: true, message: "请输入商品名称", trigger: "blur" }
        ],
        sellerId: [
          { required: true, message: "请选择商品卖家", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    addGood() {
      this.$refs.gForm.validate(valid => {
        if (valid) {
          this.saveConfirm = true;
          this.$post("/good/edit", this.ruleForm).then(
            res => {
              if (res.isSuccess) {
                this.goodId = res.data;
                Message.success(res.message);
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
    goBack() {
      this.$router.push("good");
    },
    handleRemove(file, fileList) {
      this.goodForm.pictures = fileList;
    },
    handlePreview(picture) {
      window.open(picture.url);
    },
    onSuccess(response, file, fileList) {
      this.goodForm.pictures = fileList;
    }
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