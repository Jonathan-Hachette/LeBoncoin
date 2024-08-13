<script setup>
import OfferCard from '@/components/OfferCard.vue'
</script>

<template>
  <main>
    <section class="container">
      <p>Des millions de petites annonces et autant d'occassions de se faire plaisir</p>

      <div>
        <p>C'est le moment de vendre</p>
        <!-- <BtnPublish /> -->
      </div>
      <div class="offersBloc">
        <OfferCard />
      </div>
    </section>
  </main>
</template>

<style scoped>
.offersBloc {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}
</style>
