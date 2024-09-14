<script setup>
import { loadStripe } from '@stripe/stripe-js'
import axios from 'axios'
import { computed, inject, onBeforeMount, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const GlobalStore = inject('GlobalStore')
const router = useRouter()

// Création d'une instance de Stripe
const stripePromise = loadStripe(
  'pk_test_51PqXp22M0CmIqLAyppCf0t3bWu5skKTRyB3QN8ncRskeWaQYgidrxt6s8txg8JCIJC255cBJLEJmtcqWkdLk6qGA007Dezj1qO'
)

// Récupération du 'params' en 'props'
const props = defineProps({
  id: {
    required: true
  }
})

const offerInfos = ref({})
const firstname = ref('')
const lastname = ref('')
const phone = ref('')
const option = ref('faceToFace')
const errorMessage = ref('')
const processing = ref(false)
// Valeur réactive qui stockera l'élément 'Card'
const cardElement = ref(null)

onBeforeMount(async () => {
  // Utilisation de l'instance de Stripe
  const stripe = await stripePromise

  // Obtention du gestionnaire d'élément Stripe
  const elements = stripe.elements()

  // Création d'un élément 'Card' qui sera stocké dans la 'ref' nommée 'cardElement'
  cardElement.value = elements.create('card')

  // Montage de l'élément 'Card' dans la 'div' ayant l'id 'card-element'
  cardElement.value.mount('#card-element')
})

onMounted(async () => {
  try {
    //Requête en local
    // const { data } = await axios.get(
    //   `http://localhost:1337/api/offers/${props.id}?populate[0]=pictures`
    // )

    //Requête au back Northflank

    const { data } = await axios.get(
      `https://site--backend-leboncoin--kp7nxd8w8yds.code.run/api/offers/${props.id}?populate[0]=pictures`
    )

    console.log('PaymentView - data >>>', data.data)

    offerInfos.value = data.data
  } catch (error) {
    console.log('PaymentView - catch >>>', error)
  }
})

// Calcul du prix total de l'achat
const total = computed(() => {
  let optionPrice = 0

  if (option.value === 'delivery') {
    optionPrice = 15.6
  }

  return 0.99 + optionPrice + offerInfos.value.attributes.price
})

const handlePayment = async () => {
  try {
    errorMessage.value = ''

    if (!firstname.value || !lastname.value) {
      return (errorMessage.value = 'Votre nom et prénom sont obligatoires')
    }
    processing.value = true

    // Utilisation de l'instance de Stripe
    const stripe = await stripePromise

    // Création du TOKEN de Stripe
    const { token } = await stripe.createToken(cardElement.value)

    // Stocke l'id du TOKEN de Stripe dans une variable
    const stripeToken = token.id

    const response = await axios.post(
      'https://site--backend-leboncoin--kp7nxd8w8yds.code.run/api/offers/buy',
      {
        token: stripeToken,
        amount: total.value,
        title: offerInfos.value.attributes.title
      },
      {
        headers: {
          Authorization: 'Bearer ' + GlobalStore.userInfos.value.token,
          'Content-Type': 'multipart/form-data'
        }
      }
    )

    // Si la transaction a été éffectué avec succès
    if (response.data.status === 'succeeded') {
      alert(
        `Paiement de ${total.value} € validé pour l'achat du produit ${offerInfos.value.attributes.title} par ${firstname.value} ${lastname.value}`
      )

      router.replace({ name: 'home' })
    }
  } catch (error) {
    console.log('PaymentView - payment - catch>>', error)

    errorMessage.value = 'Il y a eu un problème, veuillez réessayer'
  }
  processing.value = false
}
</script>

<template>
  <main>
    <div class="container">
      <h1>Finalisez votre paiement</h1>

      <div class="columns">
        <div class="firstCol">
          <form @submit.prevent="handlePayment">
            <div>
              <h2>Informations personnelles</h2>

              <p>Une pièce d’identité vous sera demandée pour récupérer votre colis.</p>

              <div class="inputs">
                <label for="firstname">Prénom</label>
                <input
                  type="text"
                  placeholder="Prénom"
                  id="firstname"
                  v-model="firstname"
                  @input="() => (message = '')"
                />

                <label for="lastname">Nom</label>
                <input
                  type="text"
                  placeholder="Nom"
                  id="lastname"
                  v-model="lastname"
                  @input="() => (message = '')"
                />

                <label for="phone">Téléphone</label>
                <input
                  type="text"
                  placeholder="Téléphone"
                  id="phone"
                  v-model="phone"
                  @input="() => (message = '')"
                />
              </div>

              <p>Recevoir un SMS pour l’arrivée de votre colis ou votre code de locker</p>
            </div>

            <p>
              Vous ne serez débité que lorsque le vendeur aura confirmé la disponibilité de la
              commande.
            </p>

            <div>
              <h2>Coordonnées bancaires</h2>

              <div id="card-element"></div>

              <div class="submitBloc">
                <button :disabled="processing">Payer</button>
                <p>{{ errorMessage }}</p>
              </div>

              <p>
                Paiement sécurisé Votre banque peut vous demander d’autoriser le paiement pour
                compléter votre achat.
              </p>

              <p>
                Vous êtes sur un serveur de paiement sécurisé par les normes ssl (https) et pcidss
                de nos partenaires bancaires. Vos données sont encryptées pour plus de sécurité.
              </p>
            </div>
          </form>
        </div>

        <!---- SECOND COLUMN --------------------------------->

        <div class="container" v-if="!offerInfos.attributes">Chargement en cours...</div>

        <div class="secondCol" v-else>
          <div>
            <img
              :src="offerInfos.attributes.pictures.data[0].attributes.url"
              :alt="offerInfos.attributes.title"
            />

            <h3>{{ offerInfos.attributes.title }}</h3>

            <p class="price">
              {{ offerInfos.attributes.price.toFixed(2).toString().replace('.', ',') }} €
            </p>
          </div>

          <div class="optionsPart">
            <h4>Mode de remise</h4>

            <div>
              <input type="radio" value="faceToFace" v-model="option" id="faceToFace" />

              <label for="faceToFace">
                <p>Remise en main propre</p>

                <p class="smallText">Payez en ligne et récupérez votre achat en main</p>

                <p class="smallText">propre lors de votre rendez-vous avec le vendeur</p>
              </label>
            </div>

            <div>
              <input type="radio" value="delivery" v-model="option" id="delivery" />

              <label for="delivery">
                <p>Colissimo</p>

                <p class="smallText">à votre domicile sous 2-3 jours</p>
              </label>

              <p class="price">15,60 €</p>
            </div>

            <div>
              <h4>Protection leboncoin</h4>

              <p class="price">0,99 €</p>
            </div>

            <p>
              <font-awesome-icon :icon="['fas', 'check']" />
              <span>Votre argent est sécurisé et versé au bon moment</span>
            </p>

            <p>
              <font-awesome-icon :icon="['fas', 'check']" />
              <span>Notre service client dédié vous accompagne</span>
            </p>
          </div>

          <div>
            <h2>Total</h2>

            <p class="price">{{ total }} €</p>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
.container {
  padding-top: 40px;
}

h1,
h2,
h3,
h4 {
  font-weight: bold;
}

h1 {
  font-size: 24px;

  margin-bottom: 20px;
}

h2 {
  font-size: 18px;
}

h3 {
  flex: 1;
}

.columns {
  display: flex;
  gap: 25px;
  margin-bottom: 40px;
}

/* -- First column ------------------- */

.firstCol {
  flex: 1;
}

.firstCol p {
  font-size: 12px;
  margin: 5px 0;
}

.inputs,
form {
  display: flex;
  flex-direction: column;
}

form {
  gap: 20px;
}

form > div {
  background-color: #fff;
  box-shadow: 0 0 7px 3px var(--grey-med);
  padding: 20px 30px;
  border-radius: 7px;
}

.firstCol label {
  margin-top: 30px;
  margin-bottom: 10px;
}

.firstCol input {
  height: 45px;
  border: 1.5px solid var(--grey-med);
  border-radius: 15px;
  padding-left: 15px;
}

#card-element {
  margin: 20px 0;
  border: 1.5px solid var(--grey-med);
  border-radius: 15px;
  padding: 15px;
  min-height: 45px;
}

button {
  border: none;
  color: white;
  padding: 10px 15px;
  border-radius: 15px;
  font-weight: bold;
  font-size: inherit;
  background-color: var(--orange);
  margin-bottom: 10px;
  cursor: pointer;
}

button:disabled {
  opacity: 0.5;
  cursor: normal;
}

.submitBloc {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.submitBloc p {
  color: var(--orange);
  font-size: 16px;
}

/* -- Second column ------------------- */

.secondCol {
  width: 355px;
  align-self: flex-start;
  background-color: #fff;
  box-shadow: 0 0 7px 3px var(--grey-med);
  border-radius: 7px;
}

.secondCol > div:not(:nth-child(2)) {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  gap: 10px;
}

img {
  width: 80px;
  height: 80px;
  border-radius: 5px;
  object-fit: cover;
}

.optionsPart {
  border-top: 1px solid var(--grey-med);
  border-bottom: 1px solid var(--grey-med);
  padding: 15px;
  margin: 20px 0;
}

.optionsPart > div {
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: space-between;
  margin: 10px 0;
}

.optionsPart > div:last-of-type {
  margin-top: 25px;
}

.optionsPart input {
  margin: 0;
}

.optionsPart label {
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 5px;
  flex: 1;
}

.optionsPart .smallText {
  font-size: 12px;
  color: var(--grey);
  margin: 5px 0;
}

.price {
  font-weight: bold;
  color: var(--brown);
}

.optionsPart > p {
  display: flex;
  margin-bottom: 10px;
  line-height: 20px;
}

.optionsPart svg {
  color: var(--green);
  font-size: 20px;
  margin-right: 10px;
}
</style>
