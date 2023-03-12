<template>
    <div class="repos__pagination">
        <!-- pagination with prev and next buttons -->
        <button @click="paginate(currentPage - 1)" :disabled="currentPage === 1" class="prev">
            Prev
        </button>

        <button v-for="number in pageNumbers" :key="number" @click="paginate(number)"
            :class="{ 'button': true, 'active': number === currentPage }">
            {{ number }}
        </button>

        <button @click="paginate(currentPage + 1)" :disabled="currentPage === Math.ceil(repos.length / reposPerPage)"
            class="next">
            Next
        </button>
    </div>
</template>

<script>
export default {
    name: "PaginationComponent",
    props: {
        currentPage: Number,
        paginate: Function,
        pageNumbers: Array,
        repos: Array,
        reposPerPage: Number,
    },
};
</script>

<style lang="scss" scoped>
.repos__pagination {

    margin: 2rem 0;
    text-align: center;

}

.button {
    padding: 0.4rem 1rem;
    border: 1px solid var(--primary-color);
    border-radius: 5px;
    color: var(--text-color);
    font-weight: bold;
    cursor: pointer;
    margin: 1px;
    transition: all 0.5s ease;
    background-color: var(--secondary-color);

    &:hover {
        background-color: var(--accent-color);
        color: var(--primary-color);
    }

    &.active {
        background-color: var(--accent-color);
    }
}

.prev,
.next {
    padding: 0.4rem 1rem;
    border-radius: 5px;
    border: none;
    margin: 1px;
    color: var(--primary-color);
}
</style>
