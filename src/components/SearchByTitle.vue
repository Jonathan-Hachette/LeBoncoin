<script setup>
import { ref } from 'vue'

const searchText = ref('')

const emit = defineEmits(['handleSearch', 'whenBecomeEmpty'])
</script>

<template>
  <form @submit.prevent="$emit('handleSearch', searchText)">
    <input
      type="text"
      name="search"
      id="search"
      placeholder="Rechercher sur leboncoin"
      v-model="searchText"
      @input="(event) => $emit('whenBecomeEmpty', event.target.value)"
    />

    <button>
      <font-awesome-icon :icon="['fas', 'search']" />
    </button>
  </form>
</template>

<style scoped>
form {
  display: flex;
  background-color: var(--grey-light);
  padding: 7px;
  border-radius: 10px;
  width: 300px;
}
input {
  background-color: inherit;
  border: none;
  flex: 1;
  outline: none;
}
svg {
  background-color: var(--orange);
  padding: 8px;
  box-sizing: content-box;
  border-radius: 7px;
}
input::placeholder {
  color: var(--grey);
  font-size: 16px;
}
form button {
  display: flex;
  align-items: center;
  border: none;
  background-color: #ffffff00;
  padding: 0;
}

/* -------------------------------- */
/* -- MEDIA QUERY ----------------- */
/* -------------------------------- */
@media (max-width: 650px) {
  form {
    width: 100%;
  }
}
</style>
