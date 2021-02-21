<template lang="pug">
.content
  sql2go
</template>

<script>
import sql2go from './components/sql2go'

export default {
  name: 'App',
  components: {
    sql2go,
  }
}
</script>

<style lang="scss" scoped>
.content {
  display: flex;
  justify-content: center;
}
</style>

<style lang="scss">
body {
  margin: 0 auto;
  font-family: "Monaco", Times, Monospace;
}

#app {
  display: flex;
  justify-content: center;
}
</style>
