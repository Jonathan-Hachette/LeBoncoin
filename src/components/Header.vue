<script setup>
import BtnPublish from './BtnPublish.vue'
</script>

<template>
  <header>
    <div class="container">
      <div class="topPart">
        <div>
          <img src="../assets/imgs/logo.svg" alt="Logo leboncoin" />
        </div>

        <div class="PublishAndInput">
          <BtnPublish />
          <form>
            <input type="text" placeholder="Rechercher sur leboncoin" />
            <button><font-awesome-icon :icon="['fas', 'search']" /></button>
          </form>
        </div>

        <div class="connection">
          <font-awesome-icon :icon="['far', 'user']" />
          se connecter
        </div>
      </div>

      <div class="botPart">
        <a href="">Immobilier</a>
        <font-awesome-icon :icon="['fas', 'circle']" />

        <a href="">Véhicules</a>
        <font-awesome-icon :icon="['fas', 'circle']" />

        <a href="">Locations de vacances</a>
        <font-awesome-icon :icon="['fas', 'circle']" />

        <a href="">Emploi</a>
        <font-awesome-icon :icon="['fas', 'circle']" />

        <a href="">Mode</a>
        <font-awesome-icon :icon="['fas', 'circle']" />

        <a href="">Maison & Jardin</a>
        <font-awesome-icon :icon="['fas', 'circle']" />

        <a href="">Famille</a>
        <font-awesome-icon :icon="['fas', 'circle']" />

        <a href="">Electronique</a>
        <font-awesome-icon :icon="['fas', 'circle']" />

        <a href="">Loisirs</a>
        <font-awesome-icon :icon="['fas', 'circle']" />

        <a href="">Autres</a>
      </div>
    </div>
  </header>
</template>

<style scoped>
header {
  height: var(--header-height);
  margin-bottom: 50px;
  border-bottom: 1px solid var(--grey);
  position: sticky;
}

.container {
  padding: 10px 0 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

/* TOP PART */

/* LEFT BLOC */
.topPart {
  display: flex;
  justify-content: space-between;
}

.topPart img {
  width: 150px;
}

/* MIDDLE BLOC */

.PublishAndInput {
  display: flex;
  gap: 10px;
  align-items: center;
}

form {
  display: flex;
  background-color: var(--grey-light);
  padding: 7px;
  border-radius: 10px;
  width: 300px;
}

.PublishAndInput input {
  background-color: inherit;
  border: none;
  flex: 1;
  outline: none;
}

.PublishAndInput button {
  display: flex;
  align-items: center;
  border: none;
  background-color: var(--orange);
  border-radius: 10px;
  padding: 8px;
  cursor: pointer;
}

/* RIGHT BLOC */

.connection {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
}

/* BOTTOM PART */

.botPart {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.botPart svg {
  font-size: 3px;
}
</style>
