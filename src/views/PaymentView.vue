<script setup>
import { loadStripe } from '@stripe/stripe-js'
import axios from 'axios'
import { onBeforeMount, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const stripePromise = loadStripe(
  'pk_test_51PqXp22M0CmIqLAyppCf0t3bWu5skKTRyB3QN8ncRskeWaQYgidrxt6s8txg8JCIJC255cBJLEJmtcqWkdLk6qGA007Dezj1qO'
)

const cardElement = ref(null)

// Hook qui se déclenche avant le montage du composant
onBeforeMount(async () => {
  // Utilisation de l'instance de Stripe
  const stripe = await stripePromise

  // Obtention du gestionnaire d'élément Stripe
  const elements = stripe.elements()

  // Création d'un élément 'Card' qui sera stocké dans la 'ref' nommée 'cardElement'
  cardElement.value = elements.create('card', {
    style: {
      // Style appliqué à l'élément 'Card' au démarrage
      base: {
        fontSize: '14px',
        fontFamily: 'Nunito Sans, sans-serif',
        color: 'grey',
        border: '1px solid var(--grey-med)',
        '::placeholder': {
          color: 'grey'
        },
        iconColor: 'grey' // couleur de l'icône carte
      },
      // Style appliqué à l'élément 'Card' si le numéro est invalide
      invalid: {
        color: 'blue',
        iconColor: 'gold'
      }
    }
  })

  // Montage de l'élément 'Card' dans la 'div' ayant l'id 'card-element'
  cardElement.value.mount('#card-element')
})
const props = defineProps({
  id: Number
})

const firstname = ref('')
const name = ref('')
const phone = ref('')

const route = useRoute()

const offerId = route.params.id
const offerImageUrl = ref('')

const offerDetails = ref(null)

onMounted(async () => {
  try {
    const { data } = await axios.get(
      `https://site--strapileboncoin--2m8zk47gvydr.code.run/api/offers/${offerId}?populate[0]=pictures&populate[1]=owner.avatar`
    )
    offerDetails.value = data.data
    offerImageUrl.value = offerDetails.value.attributes.pictures.data[0].attributes.url
    console.log('PaymentView - offerDetails >>>', offerDetails.value)
  } catch (error) {
    console.error('PaymentView - Erreur de chargement >>>', error)
  }
})

//console.log(props)
</script>

<template>
  <main>
    <div class="container">
      <h1>Finalisez votre paiement</h1>
      <div class="columns">
        <div class="infosColumn">
          <div class="buyerInfosBloc">
            <form>
              <div>
                <h2>Informations personnelles</h2>
                <p>Une pièce d'identité vous sera demandée pour récupérer votre colis.</p>
                <div>
                  <label for="firstname">Prénom</label>
                  <input
                    type="text"
                    id="firstname"
                    name="firstname"
                    placeholder="Prénom"
                    v-model="firstname"
                  />
                </div>

                <div>
                  <label for="firstname">Nom</label>
                  <input type="text" id="name" name="name" placeholder="Nom" v-model="name" />
                </div>

                <div>
                  <label for="phone">Téléphone</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    placeholder="Téléphone"
                    v-model="phone"
                  />
                  <p>Recevoir un SMS pour l’arrivée de votre colis ou votre code de locker</p>
                </div>
              </div>

              <p>
                Vous ne serez débité que lorsque le vendeur aura confirmé la disponibilité de la
                commande.
              </p>

              <div>
                <h2>Coordonnées bancaires</h2>

                <div id="card-element"></div>

                <div class="submitBloc">
                  <button>Payer</button>
                  <p></p>
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
        </div>

        <div class="productColumn">
          <div v-if="offerImageUrl && offerDetails">
            <img :src="offerImageUrl" alt="" />
            <h3>{{ offerDetails.attributes.title }}</h3>
            <p class="price">{{ offerDetails.attributes.price }} €</p>
          </div>

          <div class="optionPart">
            <h3>Mode de remise</h3>

            <div>
              <input type="radio" name="" id="" />
              <label for=""
                ><p>Remise en main propre</p>
                <p class="smallText">Payez en ligne et récupérez vore achat en main</p>
                <p class="smallText">propre lors de votre rendez-vous avec le vendeur</p></label
              >
            </div>

            <div>
              <input type="radio" name="" id="" />
              <label for="">
                <p>Colissimo</p>
                <p class="smallText">à votre domicile sous 2-3 jours</p>
              </label>
              <p class="price">15,60€</p>
            </div>

            <div>
              <h3>Protection leboncoin</h3>
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
          <div class="total">
            <h2>Total</h2>

            <!-- //Penser à mettre en valeur dynamique + computed -->
            <p class="price">60,99€</p>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
/* GENERAL STYLE */

h1 {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
}

h2 {
  font-size: 18px;
  font-weight: bold;
}

h3 {
  flex: 1;
  font-weight: bold;
}

img {
  width: 80px;
  height: 80px;
  border-radius: 5px;
}

.price {
  font-weight: bold;
  color: var(--brown);
}

/* COLUMNS */
.columns {
  display: flex;
  gap: 25px;
  margin-bottom: 40px;
}

/* INFOS COLUMN */

.infosColumn p {
  margin: 5px 0;
  font-size: 12px;
}

/* FORM */

form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

form > div {
  background-color: #fff;
  padding: 20px 30px;
  box-shadow: 0 0 7px 3px var(--grey-med);
  border-radius: 7px;
}

form > div > div {
  display: flex;
  flex-direction: column;
}

label {
  margin-bottom: 10px;
  margin-top: 30px;
}

.buyerInfosBloc input {
  height: 45px;
  padding-left: 15px;
  border: 1px solid var(--grey-med);
  border-radius: 15px;
}

/* CARD ELEMENT */

#card-element {
  margin: 20px 0;
  border: 1.5px solid var(--grey-med);
  border-radius: 15px;
  padding: 15px;
  min-height: 45px;
}

/* SUBMIT BLOC */

.submitBloc {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

button {
  border: none;
  color: #fff;
  padding: 10px 15px;
  border-radius: 15px;
  font-weight: 700;
  font-size: inherit;
  background-color: var(--orange);
  margin-bottom: 10px;
  cursor: pointer;
  align-self: flex-start;
}

/* PRODUCT COLUMN */

.productColumn {
  width: 355px;
  box-shadow: 0 0 7px 3px var(--grey-med);
}

.productColumn div:nth-child(1) {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding: 15px;
}

/* OPTIONS  */

.optionPart {
  border-top: 1px solid var(--grey-med);
  border-bottom: 1px solid var(--grey-med);
  padding: 15px;
  margin: 20px 0;
}

.optionPart > div {
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: space-between;
  margin: 10px 0;
}

.optionPart > div:last-of-type {
  margin-top: 25px;
}

.optionPart label {
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 5px;
  flex: 1;
}

.optionPart > p {
  display: flex;
  margin-bottom: 10px;
  line-height: 20px;
}

.optionPart .smallText {
  font-size: 12px;
  color: var(--grey);
  margin: 5px 0;
}

.optionPart svg {
  color: var(--green);

  margin-right: 10px;
}

.total {
  display: flex;
  padding: 15px;
  justify-content: space-between;
}
</style>
