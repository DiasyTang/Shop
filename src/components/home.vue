<template>
  <el-container>
    <el-header height="auto">
      <img width="200px" src="../assets/icon.jpg">
      <el-menu class="el-menu-demo" mode="horizontal" router :default-active="activeIndex">
        <el-menu-item index="/mystation">我的工作区</el-menu-item>
        <!-- <el-submenu index="2">
          <template slot="title">我的工作台</template>
          <el-menu-item index="2-1">选项1</el-menu-item>
          <el-menu-item index="2-2">选项2</el-menu-item>
          <el-menu-item index="2-3">选项3</el-menu-item>
          <el-submenu index="2-4">
            <template slot="title">选项4</template>
            <el-menu-item index="2-4-1">选项1</el-menu-item>
            <el-menu-item index="2-4-2">选项2</el-menu-item>
            <el-menu-item index="2-4-3">选项3</el-menu-item>
          </el-submenu>
        </el-submenu>-->
        <el-menu-item index="/info-export">资料导出</el-menu-item>
      </el-menu>
    </el-header>
    <el-main>
      <router-view/>
    </el-main>
    <el-footer>Footer</el-footer>
  </el-container>
</template>

<script>
export default {
  name: "home",
  data() {
    return {
      menus: [],
      activeIndex: "",
      imgUrl: require("../assets/icon.jpg")
    };
  },
  watch: {
    "$route.path": {
      handler(newName, oldName) {
        this.activeIndex = newName.includes("/mystation")
          ? "/mystation"
          : "/info-export";
      },
      deep: true,
      immediate: true
    }
  },
  beforeCreate() {},
  methods: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.el-header,
.el-footer {
  color: #333;
  text-align: center;
  padding: 0;
}

.el-menu-demo {
  display: inline-flex;
  border: 0;
}

.el-header img {
  float: left;
}

.el-aside {
  color: #333;
  text-align: center;
}

.el-submenu div span {
  letter-spacing: 5px;
  font-size: larger;
  font-weight: bold;
}

li > span {
  font-size: medium;
}

.el-menu-vertical-demo {
  height: 100%;
}

.el-main {
  color: #333;
  text-align: center;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>
