<template>
  <el-container>
    <el-aside class="left-wrap">
      left
    </el-aside>
    <el-main class="right-wrap">
      <div></div>
      <router-view />
    </el-main>
  </el-container>
</template>

<style lang="scss" scoped>
.wrap{
  .left-wrap{
    width: 200px;
    min-height: 100vh;
  }
  .right-wrap{
    min-height: 100vh;
  }
}

</style>