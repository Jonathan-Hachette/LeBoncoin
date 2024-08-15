<script setup>
import BtnPublish from '@/components/BtnPublish.vue'
import Filters from '@/components/Filters.vue'
import OfferCard from '@/components/OfferCard.vue'
</script>

<template>
  <main>
    <section class="container">
      <Filters />

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
        <OfferCard />
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
