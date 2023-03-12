<template>
  <div v-if="loading">
    <LoaderSpin />
  </div>
  <div v-else className="details">
    <button type="button" className="details__body-toggle" onClick="{toggleSidebar}">
      <GiHamburgerMenu />
    </button>

    <Link to="/" className="details__body-back">
    <br />
    <span>&#8592;</span> Back to Repos
    </Link>
    <div className="details__body">
      <aside className="details__body-left">
        {/*
        <button type="button" className="slide_btn">
          <span></span>
          <span></span>
        </button>
        */}
        <img src="{details.owner.avatar_url}" alt="img" />
        <div className="details__body-owner">
          <h3>@{details.owner.login}</h3>
          <h4>Morenike Oyewole</h4>
          <div className="link">
            {" "}
            <a href="http://github.com/mo-renike" target="_blank" rel="noopener noreferrer">
              <AiOutlineLink /> Github Profile Page
            </a>
            <a href="https://mo-renike.github.io/portfolio-page/" target="_blank" rel="noopener noreferrer">
              <AiOutlineLink /> Portfolio Website
            </a>
            <a href="http://twitter.com/mo_renike_" target="_blank" rel="noopener noreferrer">
              {" "}
              <AiOutlineTwitter /> Twitter
            </a>
            <a href="http://linkedin.com/in/morenike-oyewole" target="_blank" rel="noopener noreferrer">
              {" "}
              <AiFillLinkedin /> LinkedIn
            </a>
            <a href="https://wa.link/xvyhzl" target="_blank" rel="noopener noreferrer">
              {" "}
              <AiOutlineWhatsApp /> Whatsapp Me
            </a>
            <a href="mailto:herroyalpianist@gmail.com" target="_blank" rel="noopener noreferrer">
              {" "}
              <AiFillMail /> Send a mail
            </a>
          </div>
        </div>
      </aside>
      <main className="details__body-main">
        <h1>{details.name}</h1>
        <br />
        <p>
          {details.description ? details.description : "No description added
          yet"}
        </p>
        <p className="dim">Primary Language: {details.language}</p>
        <p className="dim">
          {" "} Created on {new Date( details.created_at ).toDateString()} ||
          Last Updated on{" "} {new Date(details.updated_at).toDateString()}
        </p>
        {" "}
        <div className="d-flex">
          <p>
            <AiOutlineStar />{" "}
            <span>{details.stargazers_count} Stars</span>
          </p>
          <p>
            <AiOutlineFork /> <span>{details.forks} Forks</span>
          </p>
          <a :href="details.homepage ? details.homepage : '#'" target="_blank" rel="noopener noreferrer">
            <AiOutlineLink /> Hosted Link
          </a>
          <a href="{details.html_url}" target="_blank" rel="noopener noreferrer">
            <AiOutlineLink /> Github Link
          </a>{" "}
        </div>
        <p>
          <span className="dim">Repo size: {details.size}kb</span>
        </p>
        <div className="d-flex">
          {details.topics ? ( details.topics.map((topic) => (
          <span className="topic" key="{topic}"> {topic} </span>
          )) ) : (
          <span className="topic">No topic added yet</span>
          )}
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import LoaderSpin from "@/components/LoaderSpin.vue";

export default {
  data() {
    return {
      repo: [],
      loading: false,
      error: null,
    };
  },
  methods: {
    fetchRepo() {
      this.loading = true;
      fetch(`https://api.github.com/repos/mo-renike/${this.$route.params.name}`)
        .then((response) => response.json())
        .then((data) => {
          this.repo = data;
        })
        .catch((error) => {
          this.error = error.toString();
        })
        .finally(() => {
          this.loading = false;
        });
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
  components: { LoaderSpin },
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
      padding: 1rem;
      // margin-top: 0.6rem;
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