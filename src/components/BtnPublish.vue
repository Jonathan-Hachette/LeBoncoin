<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <RouterLink :to="{ name: 'publish' }">
    <font-awesome-icon :icon="['far', 'plus-square']" />
    Déposer une annonce
  </RouterLink>
</template>

<style scoped>
a {
  padding: 10px;
  text-decoration: none;
  background-color: var(--orange);
  border-radius: 10px;
  color: white;
  font-weight: bold;
}

a svg {
  margin-right: 5px;
}
</style>
