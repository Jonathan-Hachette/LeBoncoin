<script setup>
import { inject, ref } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import BtnPublish from './BtnPublish.vue'

const route = useRoute()

const router = useRouter()

const search = ref('')

const GlobalStore = inject('GlobalStore')

const disconnectUser = () => {
  GlobalStore.changeUserInfos(null)
  $cookies.remove('userInfos')
}

const handleSubmit = () => {
  console.log('handleSubmit>>>', search.value, route.query)

  const queries = { ...route.query }
  if (search.value) {
    queries.title = search.value
  } else {
    delete queries.title
  }

  queries.page = 1

  router.push({ name: 'home', query: queries })
}
</script>

<template>
  <header>
    <div class="container">
      <div class="topPart">
        <div>
          <RouterLink :to="{ name: 'home' }"
            ><img src="../assets/imgs/logo.svg" alt="Logo leboncoin" />
          </RouterLink>
        </div>

        <div class="PublishAndInput">
          <BtnPublish />
          <form @submit.prevent="handleSubmit">
            <input type="text" placeholder="Rechercher sur leboncoin" v-model="search" />
            <button>
              <font-awesome-icon :icon="['fas', 'search']" />
            </button>
          </form>
        </div>

        <div class="connection">
          <RouterLink :to="{ name: 'login' }" v-if="!GlobalStore.userInfos.value">
            <font-awesome-icon :icon="['far', 'user']" />
            <p>Se connecter</p>
          </RouterLink>

          <div v-else>
            <div>
              <font-awesome-icon :icon="['far', 'user']" />
              <p>{{ GlobalStore.userInfos.value.username }}</p>
            </div>

            <font-awesome-icon
              class="signoutIcon"
              :icon="['fas', 'sign-out-alt']"
              @click="disconnectUser"
            />
          </div>
        </div>
      </div>

      <div class="botPart">
        <a href="">Immobilier</a>
        <font-awesome-icon :icon="['fas', 'circle']" />

        <a href="">Véhicules</a>
        <font-awesome-icon :icon="['fas', 'circle']" />

        <a href="">Locations de vacances</a>
        <font-awesome-icon :icon="['fas', 'circle']" />

        <a href="">Emploi</a>
        <font-awesome-icon :icon="['fas', 'circle']" />

        <a href="">Mode</a>
        <font-awesome-icon :icon="['fas', 'circle']" />

        <a href="">Maison & Jardin</a>
        <font-awesome-icon :icon="['fas', 'circle']" />

        <a href="">Famille</a>
        <font-awesome-icon :icon="['fas', 'circle']" />

        <a href="">Electronique</a>
        <font-awesome-icon :icon="['fas', 'circle']" />

        <a href="">Loisirs</a>
        <font-awesome-icon :icon="['fas', 'circle']" />

        <a href="">Autres</a>
      </div>
    </div>
  </header>
</template>

<style scoped>
header {
  height: var(--header-height);
  border-bottom: 1px solid var(--grey);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: white;
  z-index: 5;
}

.container {
  padding: 10px 0 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

/* TOP PART */

/* LEFT BLOC */
.topPart {
  display: flex;
  justify-content: space-between;
}

.topPart img {
  width: 150px;
}

.topPart p {
  font-size: 12px;
}

.signoutIcon {
  cursor: pointer;
  color: var(--grey);
  font-size: 16px;
}

/* MIDDLE BLOC */

.PublishAndInput {
  display: flex;
  gap: 20px;
  align-items: center;
}

form {
  display: flex;
  background-color: var(--grey-light);
  padding: 6px;
  border-radius: 10px;
  width: 300px;
}

.PublishAndInput input {
  background-color: inherit;
  border: none;
  flex: 1;
  outline: none;
}

.PublishAndInput button {
  display: flex;
  align-items: center;
  border: none;
  background-color: var(--orange);
  border-radius: 10px;
  padding: 8px;
  cursor: pointer;
}

/* RIGHT BLOC */

.connection > div {
  display: flex;
  align-items: center;
  gap: 30px;
}

.connection > div > div {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}

.connection a {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  gap: 5px;
}

/* BOTTOM PART */

.botPart {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.botPart svg {
  font-size: 3px;
}

/* Input appearance */

input[type='text']::placeholder {
  font-size: 16px;
  color: var(--grey);
}
</style>
