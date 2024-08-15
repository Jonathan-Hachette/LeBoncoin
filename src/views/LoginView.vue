<script setup>
import axios from 'axios'
import { inject, ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'

const router = useRouter()

const email = ref('')
const password = ref('')

const GlobalStore = inject('GlobalStore')

const isSubmitting = ref(false)
const errorMessage = ref('')
const displayPassword = ref('false')

const handleSubmit = async () => {
  // console.log('submit ==>', {
  //   email: email.value,
  //   password: password.value
  // })

  //Changement de valeur au déclenchement de la soumission
  isSubmitting.value = true
  if (email.value && password.value) {
    try {
      // Requête au back
      const { data } = await axios.post(
        'https://site--strapileboncoin--2m8zk47gvydr.code.run/api/auth/local',
        {
          identifier: email.value,
          password: password.value
        }
      )
      // Visualisation des données
      console.log('Response>>>>', data)

      //Appel de la fonction changeUserInfos définie dans main.js
      GlobalStore.changeUserInfos({ username: data.user.username, token: data.jwt })

      $cookies.set('userInfos', { username: data.user.username, token: data.jwt })

      //Navigation vers la page home
      router.push({ name: 'home' })
    } catch (error) {
      console.log('error>>>', error)

      errorMessage.value = 'Un problème est survenu, veuillez essaye à nouveau'
    }
  } else {
    errorMessage.value = 'Veuillez remplir tous les champs'
  }
  isSubmitting.value = false
}

const clearErrorMessage = () => {
  if (errorMessage.value) {
    errorMessage.value = ''
  }
}
</script>

<template>
  <div class="container">
    <div>
      <div>
        <h1>Bonjour !</h1>
        <h2>Connectez-vous pour découvrir toutes nos fonctionnalités</h2>
      </div>
      <form @submit.prevent="handleSubmit">
        <div>
          <label for="email" id="email">E-mail <span>*</span></label>
          <input type="text" v-model="email" @input="clearErrorMessage" />
        </div>

        <div>
          <label for="password" id="password">Mot de passe <span>*</span></label>

          <div class="passwordInput">
            <input
              :type="displayPassword ? 'text' : 'password'"
              v-model="password"
              @input="clearErrorMessage"
            />
            <div>
              <font-awesome-icon
                :icon="['far', 'eye-slash']"
                v-if="!displayPassword"
                @click="displayPassword = !displayPassword"
              />
              <font-awesome-icon
                :icon="['far', 'eye']"
                @click="displayPassword = !displayPassword"
                v-else
              />
            </div>
          </div>
        </div>

        <p v-if="isSubmitting">Connexion en cours ...</p>

        <button v-else>
          Se connecter
          <font-awesome-icon :icon="['fas', 'arrow-right']" />
        </button>

        <p v-if="errorMessage">{{ errorMessage }}</p>
      </form>
      <p>
        Envie de nous rejoindre ? <RouterLink :to="{ name: 'signup' }">Créer un compte</RouterLink>
      </p>
    </div>
  </div>
</template>

<style scoped>
/* GENERAL */

a {
  font-weight: bold;
  text-decoration: underline;
}

h1 {
  font-weight: bold;
  font-size: 24px;
  margin-bottom: 15px;
}

h2 {
  font-size: 16px;
}

span {
  color: var(--grey);
}

p {
  text-align: center;
}

/* CONTAINER */

.container {
  height: calc(100vh - var(--header-height) - var(--footer-height));
  background-image: url(../assets/imgs/illustration.png);
  background-repeat: no-repeat;
  background-size: contain;
  background-position: bottom;
  display: flex;
  align-items: safe center;
  justify-content: center;
}

.container > div {
  box-shadow: 0 0 7px 1px var(--grey-med);
  background-color: #fff;
  border-radius: 15px;
  padding: 30px;
  height: 490px;
  width: 480px;
  display: flex;
  flex-direction: column;
}

/* FORM */

form {
  display: flex;
  flex: 1;
  margin: 30px 0;
  flex-direction: column;
  justify-content: space-between;
}

form > div {
  display: flex;
  flex-direction: column;
}

label {
  margin-bottom: 7px;
}

input {
  border: 1px solid var(--grey);
  border-radius: 15px;
  height: 45px;
  padding-left: 10px;
}

button {
  border: none;
  border-radius: 15px;
  background-color: var(--orange);
  color: white;
  height: 45px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
}

button svg {
  font-size: 14px;
}

.passwordInput {
  display: flex;
}

.passwordInput input {
  flex: 1;
  border-radius: 15px 0 0 15px;
}

.passwordInput > div {
  border: 1px solid var(--grey);
  display: flex;
  align-items: center;
  border-left: none;
  color: var(--grey);
  height: 45px;
  border-radius: 0 15px 15px 0;
  width: 40px;
  padding: 10px;
}
</style>
