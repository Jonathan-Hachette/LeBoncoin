<script setup>
import formatDate from '@/assets/utils/formatDate'
import axios from 'axios'
import { onMounted, ref } from 'vue'

//Valeur reactive qui recevra les infos de l'offre une fois la requête terminée
const offerInfos = ref({})

//Définition de la props 'id' required
const props = defineProps({
  id: { required: true }
})

//Requête au montage du composant

onMounted(async () => {
  try {
    // Requête pour récupérer les infos de l'offre
    const { data } = await axios.get(
      `https://site--strapileboncoin--2m8zk47gvydr.code.run/api/offers/${props.id}?populate[0]=owner&populate[1]=pictures&populate[2]=owner.avatar`
    )

    //Vérification des infos
    console.log('Data >>>>>', data)

    // Transmission des informations a la ref 'offerInfos'
    offerInfos.value = data.data
  } catch (error) {
    console.log('Catch >>>', error)
  }
})
</script>

<template>
  <p v-if="offerInfos.length === 0">Chargement en cours ...</p>

  <div class="offerDisplay container" v-else>
    <div class="offerBloc">
      <img :src="offerInfos.attributes?.pictures.data[0].attributes.url" alt="" />
      <h1>{{ offerInfos.attributes?.title }}</h1>
      <p>{{ offerInfos.attributes?.price }} €</p>
      <p class="date">{{ formatDate(offerInfos.attributes?.createdAt) }}</p>

      <h2 class="descriptionTitle">Description</h2>
      <p>{{ offerInfos.attributes?.description }}</p>

      <p class="city">
        <font-awesome-icon :icon="['fas', 'map-marker-alt']" />
        Agon-Coutainville (50230)
      </p>
    </div>

    <div class="ownerBloc">
      <div class="topPart">
        <div class="owner">
          <img
            :src="offerInfos.attributes?.owner.data.attributes?.avatar?.data?.attributes.url"
            alt=""
          />
          <p>{{ offerInfos.attributes?.owner.data.attributes.username }}</p>
        </div>

        <span>
          <font-awesome-icon :icon="['fas', 'check-double']" />
          Pièce d'identité vérifiée
        </span>
        <p>
          <font-awesome-icon :icon="['far', 'clock']" />
          Répond généralement en 1 heure
        </p>
      </div>
      <div class="botPart">
        <button>Acheter</button>
        <button>Message</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Géneral */

.container {
  padding: 10px 20px 20px;
}

h1 {
  font-size: 24px;
  font-weight: bold;
  margin: 30px 0;
}

h2 {
  border-top: 1px solid var(--grey-med);
  font-size: 18px;
  font-weight: bold;
  margin: 50px 0px 25px;
  padding-top: 20px;
}

.date {
  font-size: 12px;
  color: var(--grey);
  margin-top: 20px;
}

/* OFFER DISPLAY */
.offerDisplay {
  display: flex;
  justify-content: center;
  gap: 100px;
}

/* OFFER BLOC */

.offerBloc {
  display: flex;
  flex-direction: column;
  width: 67%;
}

.offerBloc img {
  width: 100%;
  object-fit: contain;
  height: 350px;
}

.offerBloc p:first-of-type {
  font-size: 18px;
  font-weight: bold;
}

.city {
  border-top: 1px solid var(--grey-med);
  margin: 50px 0px 25px;
  padding-top: 20px;
}

/* OWNER BLOC */

/* Top */
.ownerBloc {
  display: flex;
  flex-direction: column;
  width: 33%;
  height: 375px;
  box-shadow: 0 0 5px var(--grey-med);
  padding: 20px;
  border-radius: 2px;
  justify-content: space-between;
}

.ownerBloc p {
  font-size: 14px;
}

.topPart {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.owner img {
  border-radius: 50%;
  width: 60px;
}

.owner {
  display: flex;
  gap: 20px;
}

.owner p {
  font-size: 18px;
  font-weight: bold;
  text-transform: uppercase;
}

span {
  font-size: 12px;
  color: var(--brown);
  background-color: var(--orange-pale);
  border-radius: 10px;
  padding: 4px 7px;
  align-self: flex-start;
}

svg {
  margin-right: 5px;
}

/* Bottom */

.botPart {
  display: flex;
  flex-direction: column;
  gap: 10px;
  border-top: 1px solid var(--grey-med);
  padding: 15px 0px;
}

.botPart button {
  border: none;
  color: rgb(255, 255, 255);
  padding: 15px;
  border-radius: 15px;
  font-weight: 700;
  font-size: inherit;
}

.botPart button:nth-child(1) {
  background-color: var(--orange);
}

.botPart button:nth-child(2) {
  background-color: var(--blue-dark);
}
</style>
