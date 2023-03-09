<template>
    <div>
        <h1>{{ repo.name }}</h1>
        <p>{{ repo.description }}</p>
        <ul>
            <li>Language: {{ repo.language }}</li>
            <li>Stars: {{ repo.stargazers_count }}</li>
            <li>Forks: {{ repo.forks_count }}</li>
        </ul>
    </div>
</template>

<script>
export default {
    data() {
        return {
            repo: null,
            loading: false,
            error: null,

        }
    },
    methods: {
fetchRepo(){
    this.loading = true
    fetch(`https://api.github.com/repos/mo-renike/${this.$route.params.name}`)
    .then(response => response.json())
    .then(data => {
        this.repo = data
    })
    .catch(error => {
        this.error = error.toString()
    })
    .finally(() => {
        this.loading = false
    })
}
    },
    created() {
        this.fetchRepo()
    },
    watch: {
        '$route.params.name'() {
            this.fetchRepo()
        }
    }
}


</script>

<style lang="scss" scoped></style>