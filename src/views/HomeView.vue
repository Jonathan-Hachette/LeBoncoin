<script setup>
import BtnPublish from '@/components/BtnPublish.vue'
import Filters from '@/components/Filters.vue'
import OfferCard from '@/components/OfferCard.vue'
import axios from 'axios'
import { onMounted, ref, watchEffect } from 'vue'

const props = defineProps(['sort', 'pricemin', 'pricemax'])

const offersList = ref([])

onMounted(() => {
  watchEffect(async () => {
    try {
      let priceFilters = ''

      if (props.pricemax) {
        priceFilters += `&filters[price][$lte]=${props.pricemax}`
      }

      if (props.pricemin) {
        priceFilters += `&filters[price][$gte]=${props.pricemin}`
      }

      const { data } = await axios.get(
        `https://site--strapileboncoin--2m8zk47gvydr.code.run/api/offers?populate[0]=owner&populate[1]=pictures&populate[2]=owner.avatar${priceFilters}&sort=${props.sort}`
      )
      // Verification des données
      console.log('Data >>>>', data)

      // Transmition des données dans la ref 'offersList'
      offersList.value = data.data
    } catch (error) {
      console.log(error)
    }
  })
})
</script>

<template>
  <main>
    <p v-if="offersList.length === 0" class="container loading">Chargement en cours</p>

    <section class="container" v-else>
      <Filters :sort="sort" :pricemax="pricemax" :pricemin="pricemin" />

      <p class="topLine">
        Des millions de petites annonces et autant d'occassions de se faire plaisir
      </p>

      <div class="sellBloc">
        <img src="../assets/imgs/onde-corail.svg" alt="" />
        <div>
          <p>C'est le moment de vendre</p>
          <BtnPublish />
        </div>
        <img src="../assets/imgs/feuille-bleue.svg" alt="" />
      </div>

      <div class="offersBloc">
        <OfferCard
          v-for="offer in offersList"
          :key="offer.id"
          :offerInfos="offer.attributes"
          :id="offer.id"
        />
      </div>
    </section>
  </main>
</template>

<style scoped>
.topLine {
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  margin: 30px 0;
}

.offersBloc {
  display: flex;
  flex-wrap: wrap;
  gap: 40px 15px;
}

.sellBloc {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--orange-pale);
  border-radius: 20px;
  margin-bottom: 35px;
}

.sellBloc > div {
  display: flex;
  align-items: center;
  gap: 20px;
  font-weight: 700;
}

.sellBloc p {
  font-size: 20px;
  font-weight: bold;
}

.sellBloc img:first-child {
  border-radius: 15px 0 0 15px;
}

.sellBloc img:last-child {
  border-radius: 0 15px 15px 0;
}

.loading {
  font-size: 30px;
  font-weight: bold;
  text-align: center;
  padding-top: 60px;
}

/* MEDIA */

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
</style>
