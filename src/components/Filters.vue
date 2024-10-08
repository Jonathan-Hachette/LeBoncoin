<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const props = defineProps(['sort', 'pricemax', 'pricemin'])

// Les 'ref' sont initialisées avec la valeur des 'props' pour que les `input` affichent ces valeurs dès l'arrivée sur la page
const priceMin = ref(props.pricemin)
const priceMax = ref(props.pricemax)
const sort = ref('')

const route = useRoute()
const router = useRouter()

const handleSubmit = () => {
  // Copie des query existantes pour pouvoir les modifier
  const queries = { ...route.query }

  // SI la valeur existe, elle est ajoutée aux query, SINON la clé est retirée des query
  if (priceMin.value) {
    queries.pricemin = priceMin.value
  } else {
    delete queries.pricemin
  }

  if (priceMax.value) {
    queries.pricemax = priceMax.value
  } else {
    delete queries.pricemax
  }

  if (sort.value) {
    queries.sort = sort.value
  } else {
    delete queries.sort
  }

  // Pour toujours commencer à la première page de la recherche
  queries.page = 1

  // On navigue vers la route actuelle avec les query mises à jour
  router.push({ name: 'home', query: queries })
}
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <div class="pricePart">
      <p>Prix</p>

      <div>
        <div>
          <input
            type="number"
            name="priceMin"
            id="priceMin"
            placeholder="Minimum"
            min="0"
            v-model="priceMin"
          />
          <label for="priceMin">€</label>
        </div>

        <div>
          <input
            type="number"
            name="priceMax"
            id="priceMax"
            placeholder="Maximum"
            :min="priceMin"
            v-model="priceMax"
          />
          <label for="priceMax">€</label>
        </div>
      </div>
    </div>

    <div class="sortPart">
      <p>Tri</p>

      <div>
        <label for="priceAsc">
          Prix croissants
          <input type="radio" value="price:asc" id="priceAsc" v-model="sort" />
        </label>

        <label for="priceDesc">
          Prix décroissants
          <input type="radio" value="price:desc" id="priceDesc" v-model="sort" />
        </label>

        <label for="noSort">
          Pas de tri
          <input type="radio" value="" id="noSort" v-model="sort" />
        </label>
      </div>
    </div>

    <button>Rechercher</button>
  </form>
</template>

<style scoped>
form {
  margin: 40px 0;
  gap: 50px;
  display: flex;
  justify-content: space-between;
}

input {
  outline: none;
}
p {
  font-weight: bold;
  margin-bottom: 10px;
}

/* -- Price Part ------------ */
.pricePart div {
  display: flex;
}
.pricePart > div {
  gap: 20px;
}
.pricePart input {
  height: 43px;
  width: 150px;
  border: 1px solid var(--grey-med);
  border-radius: 15px 0 0 15px;
  padding-left: 10px;
}
.pricePart input::placeholder {
  color: grey;
  font-size: 16px;
}
.pricePart label {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 43px;
  width: 45px;
  border: 1px solid var(--grey-med);
  border-left: none;
  border-radius: 0 15px 15px 0;
  font-size: 14px;
}
/* -- Sort Part ------------ */
.sortPart {
  display: flex;
  flex-direction: column;
}
.sortPart > div {
  flex: 1;
  display: flex;
  align-items: center;
}
.sortPart label:not(:last-child) {
  margin-right: 15px;
}

/* -- Button ----------- */
button {
  align-self: center;
  background-color: var(--orange);
  padding: 10px;
  border: none;
  border-radius: 10px;
  color: white;
  font-weight: bold;
  font-size: 14px;
  cursor: pointer;
}

/* INPUT APPEARANCE */

/* Suppression des flèches du champ de saisie des prix sur les navigateurs Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Suppression des flèches du champ de saisie des prix sur le navigateur Firefox */
input[type='number'] {
  appearance: none;
}

/* -------------------------------- */
/* -- MEDIA QUERY ----------------- */
/* -------------------------------- */
@media (max-width: 1050px) {
  form {
    justify-content: space-around;
    margin-bottom: 90px;
  }
  form > div {
    gap: 50px;
    flex-direction: column;
  }
  button {
    font-size: 16px;
  }
  form {
    flex-direction: column;
    align-items: center;
  }
  .pricePart,
  .sortPart {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  p {
    margin-bottom: 20px;
    font-size: 18px;
  }
}

@media (max-width: 650px) {
  form {
    margin-bottom: 50px;
  }
  .pricePart input {
    height: 35px;
    width: 100px;
    border-radius: 12px 0 0 12px;
  }
  .pricePart label {
    height: 35px;
    width: 30px;
    border-radius: 0 12px 12px 0;
  }
  .pricePart input::placeholder {
    font-size: 13px;
  }
  .displayIconSmall {
    display: inline;
  }
  .hideSmall {
    display: none;
  }
}
</style>
