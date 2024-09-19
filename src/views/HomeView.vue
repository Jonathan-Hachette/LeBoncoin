<script setup>
import axios from 'axios'
import { onMounted, ref, watchEffect } from 'vue'
import Filters from '../components/Filters.vue'
import OfferCard from '../components/OfferCard.vue'
import Pagination from '../components/Pagination.vue'
import TimeToSell from '../components/TimeToSell.vue'

const props = defineProps(['page', 'title', 'sort', 'pricemax', 'pricemin'])

const offersList = ref({})

onMounted(async () => {
  watchEffect(async () => {
    try {
      // Les filtres des prix ne peuvent pas être sans valeur sinon la requête crash. Donc on créé une string vide qui stockera le filtre prix minimum et prix maximum seulement s'ils sont demandés
      let pricefilters = ''

      if (props.pricemax) {
        pricefilters += `&filters[price][$lte]=${props.pricemax}`
      }
      if (props.pricemin) {
        pricefilters += `&filters[price][$gte]=${props.pricemin}`
      }

      // Requête au back hébergé sur Northflank

      const { data } = await axios.get(
        `https://site--backend-leboncoin--kp7nxd8w8yds.code.run/api/offers?populate[0]=pictures&populate[1]=owner.avatar&filters[title][$containsi]=${props.title}${pricefilters}&pagination[page]=${props.page}&pagination[pageSize]=10&sort=${props.sort}`
      )

      // Requête au back en local

      // const { data } = await axios.get(
      //   `http://localhost:1337/api/offers?populate[owner][populate]=avatar&populate[pictures]=true&filters[title][$containsi]=${props.title}${pricefilters}&pagination[page]=${props.page}&pagination[pageSize]=10&sort=${props.sort}`
      // )

      // Pour vérifer les informations reçues
      console.log('HomeView - data >>>', data)

      offersList.value = data
    } catch (error) {
      // Affiche l'erreur dans la console du navigateur
      console.log('HomeView - catch >>>', error)
    }
  })
})
</script>

<template>
  <main>
    <div class="container">
      <p v-if="!offersList.data" class="loader">Chargement en cours ...</p>

      <div v-else>
        <Filters :sort="sort" :pricemax="pricemax" :pricemin="pricemin" />

        <p class="topLine">
          Des millions de petites annonces et autant d’occasions de se faire plaisir
        </p>

        <TimeToSell />

        <div class="offersBloc">
          <OfferCard
            v-for="offer in offersList.data"
            :key="offer.id"
            :offerInfos="offer.attributes"
            :id="offer.id"
          />
        </div>

        <Pagination :pagination="offersList.meta.pagination" />
      </div>
    </div>
  </main>
</template>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - var(--header-height) - var(--footer-height));
  padding-bottom: 40px;
}
.loader {
  font-size: 32px;
  font-weight: bold;
}
.topLine {
  text-align: center;
  font-size: 24px;
  font-weight: 600;
  margin: 30px 0;
}
.offersBloc {
  display: flex;
  flex-wrap: wrap;
  gap: 40px 15px;
}

/* -------------------------------- */
/* -- MEDIA QUERY ----------------- */
/* -------------------------------- */
@media (max-width: 1050px) {
  .topLine {
    font-size: 20px;
  }
}

@media (max-width: 880px) {
  .topLine {
    font-size: 18px;
  }
}

@media (max-width: 650px) {
  .topLine {
    font-size: 14px;
    padding: 0 20px;
  }
}

@media (max-width: 460px) {
  .container {
    padding-top: 40px;
  }
  .offersBloc {
    justify-content: center;
  }
}
</style>
