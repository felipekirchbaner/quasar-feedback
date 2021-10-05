<template>
  <q-page :padding="true">
    <div>
      <q-breadcrumbs>
        <q-breadcrumbs-el label="Home" to="/" />
        <q-breadcrumbs-el label="Feedbacks" to="/feedbacks" />
        <q-breadcrumbs-el :label="$route.params.id ? 'Editar' : 'Adicionar'" />
      </q-breadcrumbs>
    </div>
    <div>
      <h5>{{ $route.params.id ? 'Editar Feedback' : 'Adicionar Feedback' }}</h5>
    </div>
    <div class="q-pa-md">
      <q-form
        ref="feedbackForm"
        @submit="onSubmit"
        @reset="onReset"
        class="q-gutter-md"
      >
        <q-select
          :options="userOptions"
          label="Usuário"
          v-model="feedbackInput.user_id"
          emit-value
          map-options
          :rules="[ val => val && val > 0 || 'Campo obrigatório']"
        />
        <q-input
          fit
          v-model="feedbackInput.improve"
          label="Pontos a melhorar"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Campo obrigatório']"
        />
        <q-input
          fit
          v-model="feedbackInput.maintain"
          label="Pontos a manter"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Campo obrigatório']"
        />
        <q-input
          fit
          v-model="feedbackInput.suggestion"
          label="Sugestões"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Campo obrigatório']"
        />
        <q-input
          fit
          v-model="feedbackInput.feedback"
          label="Feedback final"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Campo obrigatório']"
        />
        <q-input
          v-model="feedbackInput.date"
          mask="##/##/####"
          label="Data"
          lazy-rules
          :rules="
            [
              val => (!val || isValidDate(val) ) || 'Digite uma data válida',
              val => val && val.length > 0 || 'Campo obrigatório'
            ]
          "
        >
          <template v-slot:append>
            <q-icon
              name="event"
              class="cursor-pointer"
            >
              <q-popup-proxy
                transition-show="scale"
                transition-hide="scale"
              >
                <q-date
                  v-model="feedbackInput.date"
                  mask="DD/MM/YYYY"
                >
                  <div class="row justify-end">
                    <q-btn
                      v-close-popup
                      :label="'OK'"
                      :color="'primary'"
                      :flat="true"
                    />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
        <div>
          <q-btn label="Salvar" type="submit" color="primary"/>
          <q-btn label="Limpar" type="reset" color="primary" flat class="q-ml-sm" />
        </div>
      </q-form>
    </div>
  </q-page>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import { date } from 'quasar'
const { mapActions, mapGetters, mapMutations } = createNamespacedHelpers(
  'feedback'
)
export default {
  data () {
    return {
      feedbackInput: {
        user_id: '',
        date: '',
        improve: '',
        maintain: '',
        suggestion: '',
        feedback: ''
      },
      userOptions: []
    }
  },
  async mounted () {
    await this.getUsers()

    if (this.$route.params.id) {
      await this.showFeedback(this.$route.params.id)

      this.feedbackInput.user_id = this.feedback.user_id
      this.feedbackInput.date = this.formattedDatePtBr(this.feedback.date)
      this.feedbackInput.improve = this.feedback.improve
      this.feedbackInput.maintain = this.feedback.maintain
      this.feedbackInput.suggestion = this.feedback.suggestion
      this.feedbackInput.feedback = this.feedback.feedback
    }
  },
  computed: {
    ...mapGetters(['users', 'feedback'])
  },
  methods: {
    ...mapActions(['storeFeedback', 'showFeedback', 'updateFeedback']),
    ...mapMutations(['setPage']),
    onSubmit () {
      const params = {
        user_id: this.feedbackInput.user_id,
        date: this.formattedDate(this.feedbackInput.date),
        improve: this.feedbackInput.improve,
        maintain: this.feedbackInput.maintain,
        suggestion: this.feedbackInput.suggestion,
        feedback: this.feedbackInput.feedback
      }

      if (this.$route.params.id) {
        params.id = this.$route.params.id
        this.updateFeedback(params)
      } else {
        this.storeFeedback(params).then(() => {
          this.onReset()
          this.$refs.feedbackForm.resetValidation()
        })
      }
    },
    onReset () {
      this.feedbackInput.user_id = ''
      this.feedbackInput.date = ''
      this.feedbackInput.improve = ''
      this.feedbackInput.maintain = ''
      this.feedbackInput.suggestion = ''
      this.feedbackInput.feedback = ''
    },
    isValidDate: (val) => {
      const pattern = /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/
      return pattern.test(val)
    },
    getUsers () {
      this.$axios
        .get('/users')
        .then(({ data }) => {
          this.userOptions = data.map((option) => {
            return {
              value: option.id,
              label: option.username
            }
          })
        })
        .catch(error => {
          this.$q.notify({
            message: error,
            position: 'top',
            color: 'red'
          })
        })
    },
    formattedDate (value) {
      const dateExtract = date.extractDate(value, 'DD/MM/YYYY')
      return date.formatDate(dateExtract, 'YYYY-MM-DD')
    },
    formattedDatePtBr (value) {
      const formattedString = date.formatDate(value, 'DD/MM/YYYY')
      return formattedString
    }
  }
}
</script>

<style>

</style>
