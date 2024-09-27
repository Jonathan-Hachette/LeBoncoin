<script setup>
import { inject } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'

import BtnPublishOffer from './BtnPublishOffer.vue'
import SearchByTitle from './SearchByTitle.vue'

const GlobalStore = inject('GlobalStore')

const route = useRoute()
const router = useRouter()

const disconnection = () => {
  $cookies.remove('userInfos')

  GlobalStore.changeUserInfos({
    id: '',
    username: '',
    token: ''
  })

  router.replace({ name: 'home' })
}

const handleSearch = (searchText) => {
  console.log('searchText>>', searchText)
  const queries = { ...route.query }

  if (searchText) {
    queries.title = searchText
  } else {
    delete queries.title
  }

  queries.page = 1

  router.push({ name: 'home', query: queries })
}

const whenBecomeEmpty = (value) => {
  if (value === '') {
    // Copie des query existantes pour pouvoir les modifier
    const queries = { ...route.query }

    // Suppression de la query 'title'
    delete queries.title

    // On navigue vers la route actuelle avec les query mises à jour
    router.push({ name: 'home', query: queries })
  }
}
</script>

<template>
  <header>
    <div class="container">
      <div class="topBloc">
        <RouterLink :to="{ name: 'home' }">
          <img src="../assets/img/logo.svg" alt="" />
        </RouterLink>

        <div class="middlePart">
          <div class="hideBtnSmall">
            <BtnPublishOffer />
          </div>

          <div class="hideInputSmall">
            <!-- Transformation du formulaire en composant pour plus de clareté car il disparait à partir d'un certaine taille d'écran pour apparaître à un autre endroit  -->
            <SearchByTitle
              v-on:handleSearch="handleSearch"
              v-on:whenBecomeEmpty="whenBecomeEmpty"
            />
          </div>
        </div>

        <div class="rightPart">
          <div v-if="GlobalStore.userInfos.value.username">
            <div class="connection">
              <font-awesome-icon :icon="['far', 'user']" />

              <RouterLink :to="{ name: 'profile' }">
                <p>{{ GlobalStore.userInfos.value.username }}</p></RouterLink
              >
            </div>

            <div>
              <font-awesome-icon
                :icon="['fas', 'sign-out-alt']"
                @click="disconnection"
                class="disconnection"
              />
            </div>
          </div>

          <RouterLink :to="{ name: 'login' }" class="connection" v-else>
            <font-awesome-icon :icon="['far', 'user']" />

            <p>Se connecter</p>
          </RouterLink>
        </div>
      </div>

      <!-- Apparait seulement sur les petits écrans -->
      <div class="displayInputSmall">
        <SearchByTitle v-on:handleSearch="handleSearch" v-on:whenBecomeEmpty="whenBecomeEmpty" />
      </div>

      <div class="bottomBloc">
        <span>Immobilier</span>

        <font-awesome-icon :icon="['fas', 'circle']" />

        <span>Véhicules</span>

        <font-awesome-icon :icon="['fas', 'circle']" />

        <span>Locations de vacances</span>

        <font-awesome-icon :icon="['fas', 'circle']" />

        <span>Emploi</span>

        <font-awesome-icon :icon="['fas', 'circle']" />

        <span>Mode</span>

        <font-awesome-icon :icon="['fas', 'circle']" />

        <span>Maison & Jardin</span>

        <font-awesome-icon :icon="['fas', 'circle']" />

        <span>Famille</span>

        <font-awesome-icon :icon="['fas', 'circle']" />

        <span>Electronique</span>

        <font-awesome-icon :icon="['fas', 'circle']" />

        <span>Loisirs</span>

        <font-awesome-icon :icon="['fas', 'circle']" />

        <span>Autres</span>
      </div>
    </div>
  </header>
</template>

<style scoped>
header {
  border-bottom: 1px solid var(--grey);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #fff;
  z-index: 5;
  height: var(--header-height);
}
.container {
  padding: 10px 0 20px 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
img {
  width: 140px;
}

/* -- TOP BLOC ---------------- */
.topBloc {
  display: flex;
  justify-content: space-between;
}
.topBloc p {
  font-size: 12px;
}
.middlePart {
  display: flex;
  align-items: center;
  gap: 20px;
}
.rightPart > div {
  display: flex;
  align-items: center;
  gap: 30px;
  height: 100%;
  font-size: 16px;
}
.disconnection {
  cursor: pointer;
  color: var(--grey);
}
.connection {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  border: none;
  background-color: #ffffff00;
}

/* -- BOTTOM BLOC ---------------- */
.bottomBloc {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
}
.bottomBloc svg {
  color: var(--black);
  font-size: 2px;
}
.displayInputSmall {
  display: none;
}
/* -------------------------------- */
/* -- MEDIA QUERY ----------------- */
/* -------------------------------- */
@media (max-width: 1090px) {
  .container {
    padding: 10px 20px 20px 20px;
  }
}
@media (max-width: 970px) {
  .hideBtnSmall {
    display: none;
  }

  .bottomBloc {
    justify-content: flex-start;
    gap: 13px;
    overflow: scroll hidden;
    -ms-overflow-style: none; /* Hide scrollbar for Edge */
    scrollbar-width: none; /* Hide scrollbar for Firefox */
  }

  /* Hide scrollbar for Chrome, Safari and Opera */
  .bottomBloc::-webkit-scrollbar {
    display: none;
  }

  .bottomBloc :is(span) {
    flex-shrink: 0;
  }
}
@media (max-width: 650px) {
  header {
    height: fit-content;
  }
  .hideInputSmall {
    display: none;
  }
  .displayInputSmall {
    display: block;
    margin: 25px 0;
  }
}
</style>
