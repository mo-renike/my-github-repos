// create a not-found component and use it in the router
<template>
  <div class="wrapper">
      <img src="../assets/R.png" alt="not found">
    <p>{{message}} Are you lost?</p> <br>
    <router-link class="button" to="/">Go back Home</router-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: 'Oops... Page Not Found!'
    }
  },

}

</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90vh;
  flex-direction: column;
}
img{
  width: 35%;
}
.button {
  padding: 0.4rem 1rem;
  border: 1px solid var(--primary-color);
  border-radius: 5px;

  font-weight: bold;
  cursor: pointer;
  margin: 1px;
  transition: all 0.5s ease;
     background-color: var(--accent-color);
    color: var(--primary-color);


  &:hover {
   background-color: var(--secondary-color);  
   color: var(--text-color);
  }
}
</style>