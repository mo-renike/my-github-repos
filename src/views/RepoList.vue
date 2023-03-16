<template>
  <div class="repos">

    <div class="repos__header">
      <h2>
        Showing all {{ repos.length }} Repos sorted by <u><i> {{ sort }} </i></u> and in <u><i>
            {{ order === 'asc' ? 'ascending' :
              'descending' }} order.
          </i></u>
      </h2>
      <!-- Sort repo  -->
      <div class="repos__sort">
        <div class="repos__sort-sort">
          <label for="sort">Sort by:</label>
          <select name="sort" id="sort" v-model="sort">
            <option value="date updated">Updated</option>
            <option value="date created">Created</option>
            <option value="date pushed">Pushed</option>
            <option value="name">Name</option>
          </select>
        </div>
        <div class="repos__sort-order">
          <label for="order">Order:</label>
          <select name="order" id="order" v-model="order">
            <option value="desc">Descending</option>
            <option value="asc">Ascending</option>
          </select>
        </div>
      </div>
    </div>
    <ul class="repos__list">
      <li v-for="repo in currentRepos" :key="repo.id">
        <router-link :to="`/repos/${repo.name}`" class="repos__list-item" :key="repo.id">
          <div class="repos__list-header">
            <h2>
              {{ repo.name }} <small>({{ repo.visibility }})</small>
            </h2>
            <p>
              <Icon icon="material-symbols:star-rate-rounded" /> <span>{{ repo.stargazers_count }}</span>
            </p>
          </div>

          <p class="my-1">
            {{ repo.description ? repo.description.length > 70 ? repo.description.slice(0, 70) + " ..." : repo.description : "No description added" }}
          </p>
          <div class="dets">
            <p>
              <small>
                {{ repo.language ? repo.language : "No language Set" }}
              </small>
            </p>
            <p>
              <small>
                Last Updated on {{ new Date(repo.updated_at).toDateString() }}
              </small>
            </p>
          </div>
        </router-link>

      </li>
    </ul>
    <div v-if="loading">
      <loader-spin title="Loading..." />
    </div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else-if="!repos.length">No repositories found.</div>
    <PaginationComponent :repos="repos" :currentPage="currentPage" :reposPerPage="reposPerPage" :pageNumbers="pageNumbers"
      :paginate="paginate" />
  </div>
</template>

<script>
import LoaderSpin from '@/components/LoaderSpin.vue';
import PaginationComponent from '@/components/PaginationComponent.vue';
import { ref, watch, computed } from 'vue';
import { Icon } from "@iconify/vue"


export default {
  setup() {
    const repos = ref([]);
    const loading = ref(true);
    const error = ref(null);
    const page = ref(1);
    const totalPages = ref(1);
    const perPage = ref(100);
    const sort = ref('date updated');
    const order = ref('desc');

    const fetchRepos = async () => {
      loading.value = true;
      try {
        const response = await fetch(`https://api.github.com/users/mo-renike/repos?page=${page.value}&per_page=${perPage.value}&sort=${sort.value}&direction=${order.value}`);
        repos.value = await response.json();
        totalPages.value = Math.ceil(repos.value.length / perPage.value);
      } catch (error) {
        error.value = error.toString();
      } finally {
        loading.value = false;
      }
    };
    // set order and sort 

    watch(() => sort.value, () => {
      fetchRepos();
    });
    watch(() => order.value, () => {
      fetchRepos();
    });

    // Set dynamic repos per page value according to screen size
    const dynamicPerPage = ref(window.innerWidth <= 768 ? 3 : 6);
    // Implement pagination 
    const currentPage = ref(1);
    const reposPerPage = computed(() => dynamicPerPage.value);
    const indexOfLastRepo = computed(() => currentPage.value * reposPerPage.value);
    const indexOfFirstRepo = computed(() => indexOfLastRepo.value - reposPerPage.value);
    const currentRepos = computed(() => repos.value.slice(indexOfFirstRepo.value, indexOfLastRepo.value));
    const paginate = (pageNumber) => {
      currentPage.value = pageNumber;
    };
    const pageNumbers = computed(() => {
      const pageNumbers = [];
      for (let i = 1; i <= Math.ceil(repos.value.length / reposPerPage.value); i++) {
        pageNumbers.push(i);
      }
      return pageNumbers;
    });

    // Watch for screen size change
    watch(() => window.innerWidth, (width) => {
      dynamicPerPage.value = width <= 768 ? 3 : 6;
    }, { immediate: true });

    // Fetch repos on component created
    fetchRepos();

    // Return reactive values and functions
    return {
      repos,
      loading,
      error,
      currentPage,
      reposPerPage,
      currentRepos,
      paginate,
      pageNumbers,
      sort,
      order
    };

  },
  components: { LoaderSpin, PaginationComponent, Icon }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.repos {
  padding: 3rem;
  margin-top: 1.4rem;

  @media screen and (max-width: 768px) {
    padding: 1rem;
  }

  &__list {
    display: grid;
    grid-template-columns: 50% 50%;
    grid-gap: 1rem;
    margin-top: 1.6rem;

    @media (max-width: 768px) {
      grid-template-columns: 100%;
    }

    &-item {
      border-radius: 10px;
      background-color: var(--secondary-color);
      box-shadow: var(--box-shadow);
      padding: 1rem;
      cursor: pointer;
      border: 1px solid transparent;
      transition: all 0.3s ease-in-out;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .dets {
        display: flex;
        justify-content: space-between;
        align-items: center;

        @media (max-width: 768px) {
          flex-direction: column;
          align-items: flex-start;
          padding: 0;
        }
      }

      h2 {
        font-size: 1.4rem;

        @media (max-width: 768px) {
          font-size: 1.3rem;
        }

        small {
          opacity: 0.3;
          font-size: 1rem;
        }
      }

      p {
        small {
          opacity: 0.3;
        }
      }

      &:hover {
        box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.7);
        border-left: 1px solid var(--accent-color);
      }
    }

    &-header {
      display: flex;
      align-items: center;
      justify-content: space-between;

      p {
        display: flex;
        align-items: center;
        justify-content: space-between;
        opacity: 0.4;
      }
    }
  }

  &__pagination {
    margin: 2rem 0;
    text-align: center;
  }

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;

    @media (max-width: 768px) {
      flex-direction: column;
      align-items: flex-start;

      >* {
        margin-bottom: 1rem;
      }
    }
  }

  label {
    font-size: 1.2rem;
    color: var(--accent-color);
    margin-right: 5px;

    @media (max-width: 768px) {
      font-size: 1rem;
    }
  }

  &__sort {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: auto;

    @media screen and (max-width: 768px) {
      flex-direction: column;
      align-items: flex-start;
      margin-bottom: 1rem;
    }

    >* {
      margin: 0.6rem;
    }
  }

  &__search {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    input {
      padding: 0.6rem 1rem;
      border-radius: 5px;
      background-color: var(--secondary-color);
      border: none;
      margin: 5px 0;
      color: var(--text-color);
      width: 220px;
    }

    &_list {
      background-color: var(--secondary-color);
      border-radius: 5px;
      padding: 0.3rem;
      position: absolute;
      top: 4.3rem;
      width: 220px;
      z-index: 10;
      left: 0;
      box-shadow: var(--box-shadow);
      overflow-y: scroll;
      max-height: 13rem;
      height: auto;

      &::-webkit-scrollbar {
        display: none;
      }

      &-item {
        display: flex;
        background-color: var(--primary-color);
        padding: 0.5rem;
        margin: 0.3rem 0;
        justify-content: space-between;
        border-radius: inherit;
        align-items: center;
        cursor: pointer;
        animation: all 0.7s ease;

        p {
          opacity: 0.5;
        }

        font-weight: bold;

        &:hover {
          background-color: var(--accent-color);

          p {
            opacity: 1;
            color: var(--primary-color);
          }
        }

        img {
          width: 2rem;
          height: 2rem;
          border-radius: 50%;
          margin-left: 0.5rem;
        }
      }
    }
  }
}

li {
  list-style: none;
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

select {
  padding: 0.2rem 0.7rem;
  border-radius: 5px;
  background-color: var(--secondary-color);
  border: none;
  margin: 1px;
  color: var(--text-color);
}
</style>
