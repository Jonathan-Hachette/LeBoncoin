<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps(['sort', 'pricemin', 'pricemax', 'title', 'page'])

const priceMin = ref(props.pricemin)
const priceMax = ref(props.pricemax)
const sort = ref(props.sort)

const router = useRouter()

const handleSubmit = () => {
  const queries = { ...props }

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

  queries.page = 1

  router.push({
    name: 'home',
    query: queries
  })
}
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <div class="filtersBloc">
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
              :min="priceMin"
              placeholder="Maximum"
              v-model="priceMax"
            />
            <label for="priceMax">€</label>
          </div>
        </div>
      </div>

      <div class="sortPart">
        <p>Tri</p>

        <div>
          <label>
            <span>Prix croissants</span>
            <input type="radio" id="priceAsc" value="price:asc" v-model="sort" />
          </label>

          <label for="priceDsc">
            <span>Prix décroissants</span>
            <input type="radio" id="priceDesc" value="price:dsc" v-model="sort" />
          </label>

          <label for="noSort">
            <span>Pas de tri</span>
            <input type="radio" id="noSort" value="" v-model="sort" />
          </label>
        </div>
      </div>
    </div>
    <button>Rechercher</button>
  </form>
</template>

<style scoped>
/* FORM */

form {
  display: flex;
  gap: 50px;
  justify-content: space-between;
  padding-top: 40px;
  margin-bottom: 40px;
}

form > div {
  display: flex;
  gap: 40px;
}

.filtersBloc {
  display: flex;
}

p {
  margin-bottom: 10px;
  font-weight: bold;
}

button {
  align-self: center;
  background-color: var(--orange);
  padding: 10px;
  border: none;
  border-radius: 10px;
  color: white;
  font-weight: bold;
  font-size: 14px;
}

/* Price Part */
.pricePart div {
  display: flex;
}

.pricePart > div {
  display: flex;
  gap: 15px;
}

.pricePart input {
  height: 43px;
  width: 150px;
  border: 1px solid var(--grey-med);
  border-radius: 15px 0 0 15px;
  outline: none;
  appearance: none;
  padding-left: 10px;
}

.pricePart label {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 43px;
  width: 45px;
  border: 1px solid var(--grey-med);
  border-radius: 0px 15px 15px 0px;
  border-left: none;
}

/* Sort Part */
.sortPart {
  display: flex;
  flex-direction: column;
}

.sortPart > div {
  display: flex;
  align-items: center;
  flex: 1;
}

.sortPart label {
  margin-right: 15px;
}
</style>
