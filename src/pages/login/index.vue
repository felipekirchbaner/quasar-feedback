<template>
  <q-page class="column flex flex-center">
    <img
      alt="Quasar logo"
      src="https://avendaz.com.br/wp-content/uploads/2020/11/viasoft.png"
      style="width: 123px; height: 15px"
    >
    <q-card class="q-mt-lg q-pa-sm" style="width: 350px">
      <q-card-section>
        Entre para iniciar uma nova sessão
      </q-card-section>

      <q-form @submit="submitLogin()">
        <q-card-section>
          <q-input
            dense
            outlined
            hint="Email"
            v-model="credentials.email"
            :rules="[ val => val && val.length > 0 || 'Campo obrigatório']"
          >
            <template v-slot:prepend>
              <q-icon name="email" />
            </template>
          </q-input>
          <q-input
            class="q-mt-lg"
            dense
            outlined
            hint="Senha"
            v-model="credentials.password"
            :type="isPwd ? 'password' : 'text'"
            :rules="[ val => val && val.length > 0 || 'Campo obrigatório']"
          >
            <template v-slot:prepend>
              <q-icon name="lock" />
            </template>
            <template v-slot:append>
              <q-icon
                :name="isPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwd = !isPwd"
              />
            </template>
          </q-input>

        </q-card-section>

        <q-separator dark />

        <q-card-actions align="center">
          <q-btn
            type="submit"
            class="full-width"
            color="primary"
            icon="login"
            label="Entrar"
          />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-page>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapActions, mapGetters } = createNamespacedHelpers('app')
export default {
  data () {
    return {
      credentials: {
        email: '',
        password: ''
      },
      isPwd: true
    }
  },
  methods: {
    ...mapActions(['login', 'logout']),
    submitLogin () {
      this.login(this.credentials).then(() => {
        this.$router.push('/feedbacks')
      })
    }
  },
  computed: {
    ...mapGetters(['session'])
  }
}
</script>

<style>

</style>
