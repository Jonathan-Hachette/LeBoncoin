<script setup>
import axios from 'axios'
import { inject, ref } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()

const GlobalStore = inject('GlobalStore')

const email = ref('')
const password = ref('')
const displayPassword = ref(false)
const isSubmitting = ref(false)
const errorMessage = ref('')

console.log('LoginView - params>>>', route.params)
const handleSubmit = async () => {
  try {
    isSubmitting.value = true

    if (email.value && password.value) {
      const { data } = await axios.post(
        'https://site--backend-leboncoin--kp7nxd8w8yds.code.run/api/auth/local',
        {
          identifier: email.value,
          password: password.value
        }
      )

      // console.log('LoginView - data>>', data)

      // Création de l'objet qui sera stocké dans le fournisseur de dépendance et les cookies
      const userInfos = {
        id: data.user.id,
        username: data.user.username,
        token: data.jwt
      }

      GlobalStore.changeUserInfos(userInfos)

      $cookies.set('userInfos', userInfos)

      // Modification suite au changement du Global Guard dans 'index.js' : la redirection se fait via le 'path' au lieu du 'name'
      router.push({ path: route.query.redirect || '/' })
    } else {
      errorMessage.value = 'Veuillez remplir tous les champs'
    }
  } catch (error) {
    console.log('LoginView - catch>>', error)
    if (error.response) {
      errorMessage.value = error.response.data.error.message
    } else {
      errorMessage.value = 'Un problème est survenu, veuillez essayer à nouveau'
    }
  }

  isSubmitting.value = false
}
</script>

<template>
  <main>
    <div class="container">
      <div>
        <div>
          <h2>Bonjour !</h2>

          <h1>Connectez-vous pour découvrir toutes nos fonctionnalités.</h1>
        </div>

        <form @submit.prevent="handleSubmit">
          <div>
            <label for="email">E-mail <span>*</span></label>
            <input
              type="email"
              name="email"
              id="email"
              v-model="email"
              @input="() => (errorMessage = '')"
            />
          </div>

          <div>
            <label for="password">Mot de passe <span>*</span></label>
            <div class="passwordInput">
              <input
                :type="displayPassword ? 'text' : 'password'"
                name="password"
                id="password"
                v-model="password"
                @input="() => (errorMessage = '')"
              />
              <div>
                <font-awesome-icon
                  :icon="['far', 'eye']"
                  v-if="displayPassword"
                  @click="() => (displayPassword = !displayPassword)"
                />
                <font-awesome-icon
                  :icon="['far', 'eye-slash']"
                  v-else
                  @click="() => (displayPassword = !displayPassword)"
                />
              </div>
            </div>
          </div>

          <button type="button" v-if="isSubmitting">Connexion en cours ...</button>
          <button v-else>Se connecter <font-awesome-icon :icon="['fas', 'arrow-right']" /></button>

          <p v-if="errorMessage">{{ errorMessage }}</p>
        </form>

        <p>
          Envie de nous rejoindre ?
          <RouterLink :to="{ name: 'signup' }">Créer un compte</RouterLink>
        </p>
      </div>
    </div>
  </main>
</template>

<style scoped>
.container {
  height: calc(100vh - var(--header-height) - var(--footer-height));
  background-image: url('../assets/img/login-illustration.png');
  background-repeat: no-repeat;
  background-size: contain;
  background-position: bottom;
  display: flex;
  /* Le mot clé 'safe' permet à cette propriété de repasser automatiquement ) la valeur 'flex-start' si la hauteur devient insuffisante. Cela évitera à l'utilisateur de ne pas pouvoir scroller pour voir le haut et le bas du bloc.  */
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
  justify-content: space-between;
}
h2 {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 15px;
}
form {
  flex: 1;

  margin: 40px 0;
  display: flex;
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
  height: 45px;
  border-radius: 15px;
  padding-left: 10px;
}
.passwordInput {
  display: flex;
}
.passwordInput input {
  border-radius: 15px 0 0 15px;
  flex: 1;
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
span {
  color: var(--grey);
}
button {
  background-color: var(--orange);
  border: none;
  border-radius: 15px;
  height: 45px;
  color: white;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
}
button > svg {
  font-size: 14px;
}
form > p {
  color: var(--orange);
}
p {
  text-align: center;
}
a {
  font-weight: bold;
  text-decoration: underline;
}
</style>
