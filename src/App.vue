<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style>
.el-container {
  height: 100%;
}

html {
  display: flex;
  flex-direction: column;
  height: 100%;
}

body {
  flex: 1;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}

.setting-div > .el-pagination {
  float: right;
}

.setting-div {
  display: flex;
  flex-direction: column;
}

.search-div {
  margin-bottom: 20px;
}

.search-div > .el-input {
  width: 250px;
  float: left;
}

.search-div > .el-button-group {
  float: right;
}
</style>
