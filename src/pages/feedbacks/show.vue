<template>
  <q-page :padding="true">
    <div>
      <q-breadcrumbs>
        <q-breadcrumbs-el label="Home" to="/" />
        <q-breadcrumbs-el label="Feedbacks" to="/feedbacks" />
        <q-breadcrumbs-el label="Visualizar" />
      </q-breadcrumbs>
    </div>
    <div v-if="feedback.id" class="q-mt-md">
      <q-card class="my-card">
        <q-card-section>
          <div class="text-h6 text-blue-grey-9">{{ feedback.user.username }}</div>
          <div class="text-subtitle2 text-blue-grey-9">{{ feedback.user.email }}</div>
        </q-card-section>

        <q-card-section>
          <q-list>
            <q-item>
              <q-item-section>
                <q-item-label>Data</q-item-label>
                <q-item-label caption lines="2">{{ formattedDate(feedback.date) }}</q-item-label>
              </q-item-section>
            </q-item>

            <q-separator spaced inset />

            <q-item>
              <q-item-section>
                <q-item-label>Pontos a melhorar</q-item-label>
                <q-item-label caption>{{ feedback.improve }}</q-item-label>
              </q-item-section>
            </q-item>

            <q-separator spaced inset />

            <q-item>
              <q-item-section>
                <q-item-label>Pontos a manter</q-item-label>
                <q-item-label caption>{{ feedback.maintain }}</q-item-label>
              </q-item-section>
            </q-item>

            <q-separator spaced inset />

            <q-item>
              <q-item-section>
                <q-item-label>Sugestões</q-item-label>
                <q-item-label caption>{{ feedback.suggestion }}</q-item-label>
              </q-item-section>
            </q-item>

            <q-separator spaced inset />

            <q-item>
              <q-item-section>
                <q-item-label>Feedback final</q-item-label>
                <q-item-label caption>{{ feedback.feedback }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>

        <q-separator dark />

        <q-card-actions>
          <q-btn flat :to="{ name: 'feedback_edit', params: { id: feedback.id }}">Editar</q-btn>
          <q-btn flat @click="destroyFeedback(feedback.id)">Excluir</q-btn>
        </q-card-actions>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapActions, mapGetters, mapMutations } = createNamespacedHelpers(
  'feedback'
)
import { date } from 'quasar'
export default {
  async created () {
    await this.showFeedback(this.$route.params.id)
  },
  computed: {
    ...mapGetters(['feedback'])
  },
  methods: {
    ...mapActions(['showFeedback', 'deleteFeedback']),
    ...mapMutations(['setPage']),
    formattedDate (value) {
      const formattedString = date.formatDate(value, 'DD/MM/YYYY')
      return formattedString
    },
    destroyFeedback (feedbackId) {
      this.$q.dialog({
        title: 'Atenção!',
        message: 'Tem certeza que deseja remover esse feedback?',
        cancel: true,
        color: 'primary'
      }).onOk(async () => {
        this.deleteFeedback(feedbackId).then(() => {
          this.$router.push('/feedbacks')
        })
      })
    }
  }

}
</script>

<style>

</style>
