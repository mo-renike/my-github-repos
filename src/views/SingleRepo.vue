<template>
  <div v-if="loading">
    <LoaderSpin title="Loading Details..." />
  </div>
  <div v-else class="details">
    <br> <br>
    <button type="button" class="details__body-toggle" @click="toggleSidebar">
      <Icon icon="ci:hamburger" />
    </button>
    <br>

    <div class="details__body">
      <aside class="details__body-left">

        <img :src="details.owner.avatar_url" alt="img" />
        <div class="details__body-owner">
          <h3>@{{ details.owner.login }}</h3>
          <h4>Morenike Oyewole</h4>
          <div class="link">
            <a href="http://github.com/mo-renike" target="_blank" rel="noopener noreferrer">
              <Icon icon="mdi:github" /> Github Profile
            </a>
            <a href="https://morenike.ninja" target="_blank" rel="noopener noreferrer">
              <Icon icon="mdi:link" /> Portfolio Website
            </a>
            <a href="http://twitter.com/mo_renike_" target="_blank" rel="noopener noreferrer">
              <Icon icon="mdi:twitter" /> Twitter
            </a>
            <a href="http://linkedin.com/in/morenike-oyewole" target="_blank" rel="noopener noreferrer">
              <Icon icon="mdi:linkedin" /> LinkedIn
            </a>
            <a href="https://wa.link/xvyhzl" target="_blank" rel="noopener noreferrer">
              <Icon icon="mdi:whatsapp" /> Whatsapp Me
            </a>
            <a href="mailto:herroyalpianist@gmail.com" target="_blank" rel="noopener noreferrer">
              <Icon icon="material-symbols:mail" /> Send a mail
            </a>
          </div>
        </div>
      </aside>

      <main class="details__body-main">
        <h1>{{ details.name }}</h1>
        <br />
        <p>
          {{ details.description ? details.description : "No description added yet" }}
        </p>
        <p class="dim">Primary Language: {{ details.language }}</p>
        <p class="dim">
          Created on {{ new Date(details.created_at).toDateString() }} ||
          Last Updated on {{ new Date(details.updated_at).toDateString() }}
        </p>
        <div class="d-flex">
          <p>
            <Icon icon="mdi:star" /> <span>{{ details.stargazers_count }} Stars</span>
          </p>
          <p>
            <Icon icon="icon-park-twotone:fork" /> <span>{{ details.forks }} Forks</span>
          </p>
          <a :href="details.homepage ? details.homepage : '#'" target="_blank" rel="noopener noreferrer">
            <Icon icon="mdi:link" /> Hosted Link
          </a>
          <a :href="details.html_url" target="_blank" rel="noopener noreferrer">
            <Icon icon="mdi:link" /> Github Link
          </a>
        </div>
        <p>
          <Icon icon="material-symbols:folder-open-rounded" /> <span class="dim">Repo size: {{ details.size }}kb</span>
        </p>
        <div class="d-flex">
          <template v-if="details.topics">
            <span v-for="topic in details.topics" :key="topic" class="topic">
              {{ topic }}
            </span>
          </template>
          <template v-else>
            <span class="topic">No topic added yet</span>
          </template>
        </div>
          <router-link to="/" class="details__body-back">

        <span>&#8592;</span> Back to Repos
      </router-link>
      </main>

  
  
      </div>
  </div>
</template>

<script>
import LoaderSpin from "@/components/LoaderSpin.vue";
import { Icon } from "@iconify/vue";


export default {
  data() {
    return {
      loading: false,
      error: null,
      details: {},
    };
  },
  methods: {
    fetchRepo() {
      this.loading = true;
      fetch(`https://api.github.com/repos/mo-renike/${this.$route.params.id}`)
        .then((response) => response.json())
        .then((data) => {
          this.details = data;
        })
        .catch((error) => {
          this.error = error.toString();
        })
        .finally(() => {
          this.loading = false;
        });
    },
    toggleSidebar() {
      const body = document.querySelector(".details__body");
      body.classList.toggle("show-sidebar");
    },
  },
  created() {
    this.fetchRepo();
  },
  watch: {
    "$route.params.name"() {
      this.fetchRepo();
    },
  },
  components: {
    LoaderSpin,
    Icon
  },
};
</script>

<style lang="scss" scoped>
.details {
  height: calc(100vh - 4rem);
  max-width: 1440px;
  margin: auto;

  &__body {
    transition: 0.6s ease;
    display: grid;
    grid-template-columns: 21% 70%;
    grid-gap: 3%;
    padding: 2rem;

    @media screen and (max-width: 768px) {
      padding: 1rem;
      grid-template-columns: 5% 92%;

      aside {
        >* {
          display: none;
          opacity: 0;
        }
      }
    }

    &-back {
      transition: all 0.3s ease;
     &:hover{
        color: var(--accent-color);
     }
    }

    &.show-sidebar {
      grid-template-columns: 90% 5%;

      .details__body-main {
        >* {
          display: none;
          opacity: 0;
        }
      }

      aside {
        >* {
          display: initial;
          opacity: 1;
        }
      }
    }

    aside {
      padding: 1rem;
      border-radius: 5px;
      background-color: var(--secondary-color);
      box-shadow: var(--box-shadow);
      display: flex;
      opacity: 1;
      flex-direction: column;

      img {
        width: 6rem;
        border: 1px solid var(--primary-color);
        border-radius: 50%;
      }
    }

    &-main {
      padding: 1rem;
      box-shadow: inherit;
      border-radius: 5px;
      background-color: var(--secondary-color);
      box-shadow: var(--box-shadow);
    }

    &-owner {
      margin-top: 1rem;

      h4 {
        margin-top: 0.3rem;
        opacity: 0.4;
      }

      .link {
        margin-top: 1.4rem;
        display: flex;
        opacity: 0.4;
        flex-direction: column;

        a {
          align-items: center;
          justify-content: center;
          margin: 0.3rem 0;
          transition: 0.7s ease;

          &:hover {
            opacity: 1;
            color: var(--accent-color);
            text-decoration: underline;
          }
        }
      }
    }

    &-toggle {
      background: none;
      border: none;
      margin: 0.8rem 0 0 2rem;
      display: none;

      @media screen and (max-width: 768px) {
        margin: 0.8rem 0 0 1rem;
        display: flex;
      }

      >* {
        font-size: 1.5rem;
      }
    }
  }
}

// .slide_btn {
//   margin: 0.6rem 0;
//   text-align: center;
//   color: var(--accent-color);

//   // @media screen and (min-width: 768px) {
//   //   display: none;
//   // }

//   span {
//     height: 3px;
//     width: 3px;
//     cursor: pointer;
//   }
// }

.topic {
  background-color: var(--secondary-color);
  border: 1px solid var(--primary-color);
  box-shadow: var(--box-shadow-sm);
  padding: 0.5rem 1rem;
  border-radius: 10px;
  font-size: 0.8rem;
  margin: 5px 5px 5px 0;
}
</style>
