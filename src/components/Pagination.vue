<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()

const props = defineProps(['title', 'sort', 'pricemin', 'pricemax', 'page', 'numOfPages'])

const changePage = (num) => {
  const queries = { ...props }

  delete queries.numOfPages

  queries.page = num
  router.push({ name: 'home', query: queries })
}
</script>

<template>
  <section>
    <font-awesome-icon
      :icon="['fas', 'angle-left']"
      @click="changePage(page - 1)"
      v-if="page > 1"
    />
    <font-awesome-icon :icon="['fas', 'angle-left']" class="disabled" v-else />

    <div>
      <p v-for="num in numOfPages" @click="changePage(num)" :class="{ selected: num === page }">
        {{ num }}
      </p>
    </div>
    <font-awesome-icon
      :icon="['fas', 'angle-right']"
      @click="changePage(page + 1)"
      v-if="page < numOfPages"
    />
    <font-awesome-icon :icon="['fas', 'angle-right']" v-else class="disabled" />
  </section>
</template>

<style scoped>
section {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
  gap: 10px;
}

div {
  display: flex;
  justify-content: center;
  align-items: center;
}

div svg {
  cursor: pointer;
}

div p {
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  border-radius: 3px;
}

.selected {
  background-color: var(--black);
  color: white;
}
.disabled {
  color: var(--grey-med);
  cursor: auto;
}
</style>
