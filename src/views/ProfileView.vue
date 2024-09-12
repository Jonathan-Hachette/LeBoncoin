<script setup>
import BtnPublishOffer from '@/components/BtnPublishOffer.vue'
import axios from 'axios'
import { computed, inject, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

// Injection du GlobalStore pour récupérer le token de l'utilisateur
const GlobalStore = inject('GlobalStore')
const router = useRouter()

// Ref initialisé à un objet vide pour y stocker les données reçus après requête
const userInfos = ref(null)

// console.log('GlobalStore>>>>', GlobalStore.userInfos.value)

onMounted(async () => {
  try {
    // Requête au back en local

    // const { data } = await axios.get(
    //   `http://localhost:1337/api/users/me?populate=avatar&populate=offers.pictures`,
    //   {
    //     // Envoi du Bearer token obligatoire
    //     headers: {
    //       Authorization: 'Bearer ' + GlobalStore.userInfos.value.token,
    //       'Content-Type': 'multipart/form-data'
    //     }
    //   }
    // )

    //Requête au back sur Northflank

    const { data } = await axios.get(
      `https://site--backend-leboncoin--kp7nxd8w8yds.code.run/api/users/me?populate=avatar&populate=offers.pictures`,
      {
        // Envoi du Bearer token obligatoire
        headers: {
          Authorization: 'Bearer ' + GlobalStore.userInfos.value.token,
          'Content-Type': 'multipart/form-data'
        }
      }
    )

    // Vérification des données
    console.log('Profile View - data >>>', data)

    // Affectation des données reçu à la ref userInfos
    userInfos.value = data

    // console.log('userInfos >>>>', userInfos.value)
  } catch (error) {
    console.log(error)
  }
})

const totalOffers = computed(() => {
  const numOfOffers = userInfos?.value?.offers?.length || 0

  if (numOfOffers === 1) {
    return `${numOfOffers} annonce`
  } else {
    return `${numOfOffers} annonces`
  }
})

const deleteOffer = async (offerId) => {
  try {
    // Requête pour supprimer l'offre avec l'ID spécifié
    await axios.delete(`http://localhost:1337/api/offers/${offerId}`, {
      headers: {
        Authorization: 'Bearer ' + GlobalStore.userInfos.value.token
      }
    })

    // Mettre à jour la liste des offres après suppression
    router.go()
  } catch (error) {
    console.error("Erreur lors de la suppression de l'offre:", error)
  }
}
</script>

<template>
  <main>
    <div class="container">
      <!-- Message de chargement si userInfos est null -->
      <p v-if="!userInfos" class="loading">Chargement en cours...</p>

      <!-- Bloc utilisateur uniquement si userInfos est défini -->
      <div v-else>
        <div class="userBloc">
          <img v-if="userInfos.avatar" :src="userInfos.avatar.url" alt="" />
          <div v-else class="avatarReplacement">
            <p>
              {{ userInfos.username[0] }}
            </p>
          </div>
          <div class="infos">
            <p>{{ userInfos.username }}</p>
            <p>{{ userInfos.email }}</p>
          </div>
        </div>
      </div>

      <!-- Bloc s'il n'y a pas d'annonce -->
      <div class="noOffer" v-if="userInfos?.offers?.length === 0">
        <p>Vous n'avez aucune annonce en ligne</p>
        <BtnPublishOffer />
      </div>

      <!-- Bloc s'il y a des annonces -->
      <div v-else>
        <h2>{{ totalOffers }}</h2>

        <div class="offerBloc">
          <div v-for="offer in userInfos?.offers" :key="offer.id" class="offer">
            <img :src="offer.pictures[0].url" alt="" />

            <div>
              <p class="title">{{ offer.title }}</p>
              <p class="price">{{ offer.price }} €</p>
            </div>

            <font-awesome-icon
              :icon="['fas', 'trash']"
              class="trash"
              @click="deleteOffer(offer.id)"
            />
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
.container {
  min-height: calc(100vh - var(--header-height) - var(--footer-height));
}

h2 {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 20px;
}

img {
  width: 100px;
  height: 100px;
  object-fit: cover;
}

/* USER BLOC */

.userBloc {
  display: flex;
  gap: 20px;
  border: 1px solid var(--grey);
  padding: 15px;
  border-radius: 15px;
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}

.avatarReplacement {
  width: 100px;
  height: 100px;
  background-color: var(--grey);
  color: white;
  font-size: 40px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.infos {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
}

.infos p:nth-child(1) {
  font-weight: bold;
  font-size: 24px;
}

/* NO OFFER */

.noOffer p {
  margin-bottom: 30px;
}

/* OFFER BLOC */

.offerBloc {
  border: 1px solid var(--grey-med);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  border-radius: 15px;
  padding: 25px 15px;
  margin-top: 15px;
}

.offer {
  width: 100%;
  height: 150px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  border-radius: 10px;
  box-shadow: 0 0 5px 3px var(--grey-med);
  padding: 15px;
}

.offer > div {
  display: flex;
  align-items: center;
  flex: 1;
  margin-left: 30px;
}

.offer img {
  height: 100%;
  width: 120px;
  border-radius: 5px;
  aspect-ratio: 1/1;
  object-fit: cover;
}

.title {
  font-size: 22px;
  font-weight: bold;
  width: 30%;
  white-space: nowrap;
  overflow: hidden; /* Cache l'excès de texte */
  text-overflow: ellipsis; /* Ajoute des points de suspension si le texte est trop long */
}

.price {
  font-size: 18px;
  color: var(--brown);
  font-weight: bold;
  text-align: center;
  width: 30%; /* Largeur fixe pour maintenir l'alignement */
}

/* trash icon */

.trash {
  cursor: pointer;
  color: var(--orange);
}
</style>
