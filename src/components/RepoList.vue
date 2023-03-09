<template>
  <div class="repos">

    <h1>My GitHub Repositories</h1>
    <ul>
      <li v-for="repo in repos" :key="repo.id">
        <router-link :to="'/repo/' + repo.name">{{ repo.name }}</router-link>
      </li>
    </ul>
    <div v-if="loading">Loading...</div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else-if="!repos.length">No repositories found.</div>
    <nav>
      <button v-if="page > 1" @click="prevPage">Previous</button>
      <button v-if="page < totalPages" @click="nextPage">Next</button>
    </nav>

  </div>
</template>

<script>
export default {
data(){
  return {
    repos: [],
    loading: true,
    error: null,
    page: 1,
    totalPages: 1,
    perPage: 10,
    sort: 'updated',
    direction: 'desc'
  }
},

methods : {
  async fetchRepos() {
    this.loading = true
    try {
      const response = await fetch(`https://api.github.com/users/mo-renike/repos?page=${this.page}&per_page=${this.perPage}&sort=${this.sort}&direction=${this.direction}`)
      this.repos = await response.json()
      this.totalPages = Math.ceil(response.headers['x-total-count'] / this.perPage);
    } catch (error) {
      this.error = error.toString()
    } finally {
      this.loading = false
    }
  },
  nextPage() {
    this.page++
    this.fetchRepos()
  },
  prevPage() {
    this.page--
    this.fetchRepos()
  }
},

created() {
  this.fetchRepos()
}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}</style>
