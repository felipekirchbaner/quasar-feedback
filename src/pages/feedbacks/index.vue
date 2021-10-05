<template>
  <q-page :padding="true">
    <div>
      <q-breadcrumbs>
        <q-breadcrumbs-el label="Home" to="/" />
        <q-breadcrumbs-el label="Feedbacks" />
    </q-breadcrumbs>
    </div>
    <div class="q-pa-md">
      <q-table
        title="Feedbacks"
        :rows="feedbacks"
        :columns="columns"
        row-key="name"
      >
        <template v-slot:top>
          <div class="text-h5 text-blue-grey-9">Feedbacks</div>
          <q-space />
          <q-btn
            flat
            icon="add"
            color="primary"
            label="Adicionar novo"
            :to="{ name: 'feedback_create' }"
          />
        </template>
        <template v-slot:body-cell-actions="props">
          <q-td :props="props">
            <q-btn-group flat>
              <q-btn
                flat
                icon="edit"
                color="blue-grey-9"
                :to="{ name: 'feedback_edit', params: { id: props.row.id }}"
              >
                <q-tooltip>Editar</q-tooltip>
              </q-btn>

              <q-btn
                flat
                icon="visibility"
                color="blue-grey-9"
                :to="{ name: 'feedback_show', params: { id: props.row.id }}"
              >
                <q-tooltip>Visualizar</q-tooltip>
              </q-btn>

              <q-btn
                flat
                icon="delete"
                color="red"
                @click="destroyFeedback(props.row.id)"
              >
                <q-tooltip>Remover</q-tooltip>
              </q-btn>
            </q-btn-group>
          </q-td>
        </template>
      </q-table>
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
      columns: [
        {
          name: 'user_id',
          label: 'Usuário',
          field: row => row.user.username,
          sortable: true,
          align: 'left'
        },
        {
          name: 'date',
          label: 'Data',
          field: row => this.formattedDate(row.date),
          sortable: true,
          align: 'left'
        },
        {
          name: 'feedback',
          label: 'Feedback',
          field: 'feedback',
          sortable: true,
          align: 'left'
        },
        {
          name: 'actions',
          label: 'Ações',
          required: true,
          align: 'center'
        }
      ]
    }
  },
  created () {
    this.getFeedbacks()
  },
  computed: {
    ...mapGetters(['feedbacks'])
  },
  methods: {
    ...mapActions(['getFeedbacks', 'deleteFeedback']),
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
          this.getFeedbacks()
        })
      })
    }
  }
}
</script>

<style>

</style>
