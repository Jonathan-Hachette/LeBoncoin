<script setup>
import axios from 'axios'
import { onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'

const offersList = ref([])

onMounted(async () => {
  try {
    const { data } = await axios.get(
      `https://site--strapileboncoin--2m8zk47gvydr.code.run/api/offers?populate[0]=owner&populate[1]=pictures&populate[2]=owner.avatar`
    )
    // Verification des données
    console.log('Data >>>>', data)

    offersList.value = data.data
  } catch (error) {
    console.log(error)
  }
})
</script>

<template>
  <RouterLink
    :to="{ name: 'offer' }"
    class="offersBloc"
    v-for="offer in offersList"
    :key="offer.id"
  >
    <div class="owner">
      <img :src="offer.attributes.owner.data.attributes?.avatar?.data?.attributes.url" alt="" />
      <p>{{ offer.attributes.owner.data.attributes.username }}</p>
    </div>

    <img :src="offer.attributes.pictures.data[0].attributes.url" alt="" />
    <p>{{ offer.attributes.title }}</p>
    <p>{{ offer.attributes.price }} €</p>
    <div class="botPart">
      <p>{{ offer.attributes.createdAt }}</p>
      <font-awesome-icon :icon="['far', 'heart']" />
    </div>
  </RouterLink>
</template>

<style scoped>
.offersBloc {
  width: 200px;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.owner {
  display: flex;
  align-items: center;
  gap: 5px;
}

.owner img {
  border-radius: 50%;
  width: 25px;
}

.owner + img {
  width: 200px;
  height: 240px;
  object-fit: cover;
  border-radius: 10px;
}
</style>
