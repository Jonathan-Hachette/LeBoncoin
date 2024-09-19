<script setup>
import BtnPublishOffer from './BtnPublishOffer.vue'
</script>

<template>
  <div class="bloc">
    <img src="../assets/img/onde-corail.svg" alt="" />

    <div>
      <p>C'est le moment de vendre</p>

      <BtnPublishOffer />
    </div>

    <img src="../assets/img/feuille-bleue.svg" alt="" />
  </div>
</template>

<style scoped>
.bloc {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--orange-pale);
  border-radius: 20px;
  margin-bottom: 35px;
}
.bloc > div {
  display: flex;
  align-items: center;
  gap: 20px;
  font-weight: bold;
}
p {
  font-size: 20px;
}
img:first-child {
  border-radius: 15px 0 0 15px;
}
img:last-child {
  border-radius: 0 15px 15px 0;
}
/* -------------------------------- */
/* -- MEDIA QUERY ----------------- */
/* -------------------------------- */
@media (max-width: 880px) {
  p {
    font-size: 18px;
  }
  .bloc {
    height: 100px;
  }
  img {
    height: 100%;
    object-fit: cover;
    object-position: left;
    width: 29%;
  }
  img:first-child {
    object-position: right;
  }
  img:last-child {
    object-position: left;
  }
  .bloc > div {
    flex-direction: column;
  }
}

@media (max-width: 650px) {
  p {
    font-size: 15px;
  }
  .bloc {
    height: 90px;
    justify-content: center;
    position: relative;
  }
  .bloc > div {
    z-index: 1;
  }
  img {
    width: 20%;
    position: absolute;
  }
  img:first-child {
    object-position: right;
    bottom: 0;
    left: 0;
  }
  img:last-child {
    object-position: left;
    top: 0;
    right: 0;
  }
}
</style>
