<template>
  <el-container>
    <el-aside width="200px">
      <el-menu class="el-menu-vertical-demo" router :default-active="activeIndex">
        <template v-for="item in menus">
          <el-submenu
            v-if="item.children&&item.children.length>=1"
            :key="`menu-${item.name}`"
            :index="`/${item.path}`"
          >
            <template slot="title">
              <span slot="title">{{item.meta.title}}</span>
            </template>
            <el-menu-item
              v-for="sItem in item.children"
              :key="`sub-menu-${sItem.name}`"
              :index="`/${item.path}/${sItem.path}`"
            >
              <span slot="title">{{sItem.meta.title}}</span>
            </el-menu-item>
          </el-submenu>
          <el-menu-item v-else :key="`menu-${item.name}`" :index="`/${item.path}`">
            <span slot="title">{{item.meta.title}}</span>
          </el-menu-item>
        </template>
      </el-menu>
    </el-aside>
    <el-main>
      <router-view/>
    </el-main>
  </el-container>
</template>

<script>
import { getMenuByRouter } from "../../libs/utils.js";

export default {
  name: "work-station",
  data() {
    return {
      menus: [],
      activeIndex: ""
    };
  },
  computed: {
    defaultRouter() {
      return this.$router.history.current.path;
    }
  },
  created() {
    this.$get("/user/get_info").then(response => {
      let stationRouter = this.$router.options.routes[0].children;
      console.log(stationRouter);
      this.menus = getMenuByRouter(stationRouter, response.data.accessPages);
      console.log(this.menus);
    });
  },
  watch: {
    "$route.path": {
      handler(newValue, oldValue) {
        var result = /^\/mystation\/business\/order\/((?:[^\/]+?))(?:\/(?=$))?$/i.test(
          newValue
        );
        if (result) {
          this.activeIndex = "/mystation/business/order";
        } else {
          this.activeIndex = newValue;
        }
      },
      immediate: true
    }
  }
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
