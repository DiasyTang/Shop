<template>
  <el-form
    :model="loginForm"
    :rules="rules"
    ref="loginForm"
    @keyup.enter.native="submitForm('loginForm')"
    class="loginForm"
  >
    <el-form-item label="用户名" prop="userName">
      <el-input v-model="loginForm.userName"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input type="password" v-model="loginForm.password" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" :loading="loading" @click="submitForm('loginForm')">提交</el-button>
      <el-button @click="resetForm('loginForm')">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { Message } from "element-ui";
import Vue from "vue";

export default {
  name: "login",
  data() {
    return {
      loading: false,
      loginForm: {
        userName: "",
        password: "",
        tip: ""
      },
      rules: {
        userName: [
          { required: true, message: "请输入用户名", trigger: "blue" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blue" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.loading = true;
          this.$get("/user/login", {
            username: this.loginForm.userName,
            password: this.loginForm.password
          }).then(
            response => {
              this.loading = false;
              if (response.isSuccess) {
                let expireDays = 1000 * 60 * 60;
                debugger;
                Vue.cookie.set("token", response.data.token, expireDays);
                sessionStorage.setItem(
                  "accessCodes",
                  response.data.accessCodes
                );
                this.$router.push("/");
              } else {
                Message.error(response.message);
              }
            },
            err => {
              this.loading = false;
              Message.error(response.message);
            }
          );
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style>
</style>