<script setup>
import axios from 'axios'
import { inject, ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'

const router = useRouter()

const username = ref('')
const email = ref('')
const password = ref('')

const GlobalStore = inject('GlobalStore')

console.log('GlobalStore >>>', GlobalStore)

const isSubmitting = ref(false)
const errorMessage = ref('')

const handleSubmit = async () => {
  // console.log('submit ==>', {
  //   username: username.value,
  //   email: email.value,
  //   password: password.value
  // })

  //Changement de valeur au déclenchement de la soumission
  isSubmitting.value = true
  if (username.value && email.value && password.value) {
    try {
      // Requête au back
      const { data } = await axios.post(
        'https://site--strapileboncoin--2m8zk47gvydr.code.run/api/auth/local/register',
        {
          username: username.value,
          email: email.value,
          password: password.value
        }
      )

      console.log('response>>>>', data)

      //Appel de la fonction changeToken du fichier main.js pour stocker le token utilistaeur
      GlobalStore.changeUserInfos({
        username: data.user.username,
        token: data.jwt,
        id: data.user.id
      })

      //Enregistrement des infos dans un cookie
      $cookies.set('userInfos', { username: data.user.username, token: data.jwt, id: data.user.id })

      // Redirection vers la page home
      router.push({ name: 'home' })
    } catch (error) {
      console.log('error>>>', error)

      errorMessage.value = 'Une erreur est survenue, désolé !'
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
        <h2>Inscrivez-vous pour découvir toutes nos fonctionnalités.</h2>
      </div>
      <form @submit.prevent="handleSubmit">
        <div>
          <label for="username" id="username">Nom <span>*</span></label>
          <input type="text" v-model="username" @input="clearErrorMessage" />
        </div>

        <div>
          <label for="email" id="email">E-mail <span>*</span></label>
          <input type="text" v-model="email" @input="clearErrorMessage" />
        </div>

        <div>
          <label for="password" id="password">Mot de passe <span>*</span></label>
          <input type="password" v-model="password" @input="clearErrorMessage" />
        </div>

        <p v-if="isSubmitting">Inscription en cours ...</p>

        <button v-else>
          S'inscrire
          <font-awesome-icon :icon="['fas', 'arrow-right']" />
        </button>

        <p v-if="errorMessage">{{ errorMessage }}</p>
      </form>
      <p>
        Vous avez déjà un compte ? <RouterLink :to="{ name: 'login' }">Connectez-vous</RouterLink>
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

form div {
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
</style>
