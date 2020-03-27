<template>
  <div id="app">
    <header>
        <div class="header-wrapper" @click="$router.push({ name: 'users' })">
          <img src="./assets/Creatio.png" alt="" class="logo">
        </div>
      </header>
      <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'app',
  components: {}
}
</script>

<style lang="scss" scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  padding-left: 60px;
  .header-wrapper {
    height: 100px;
  }
  .logo {
    cursor: pointer;
    max-width: 180px;
    max-height: 60px;
  }
}
</style>
