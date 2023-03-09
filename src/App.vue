<template>
  <div id="app">
    <RepoList />
    <SingleRepo />
  </div>
</template>

<script>
import RepoList from './components/RepoList.vue'
import SingleRepo from './components/SingleRepo.vue'

export default {
  name: 'App',
  components: {
    RepoList,
    SingleRepo,
  }
}
</script>

<style>
#app {
  background-color: #18222b;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #efefef;
  margin-top: 60px;
}
</style>
