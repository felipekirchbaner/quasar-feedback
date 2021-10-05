<template>
  <q-page :padding="true">
    <div>
      <q-breadcrumbs>
        <q-breadcrumbs-el label="Home" to="/" />
        <q-breadcrumbs-el label="Usuários" />
    </q-breadcrumbs>
    </div>
    <div class="q-pa-md">
      <q-table
        title="Usuários"
        :rows="users"
        :columns="columns"
        row-key="name"
      />
    </div>
  </q-page>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapActions, mapGetters, mapMutations } = createNamespacedHelpers(
  'user'
)
export default {
  data () {
    return {
      columns: [
        {
          name: 'username',
          label: 'Usuário',
          field: 'username',
          sortable: true,
          align: 'left'
        },
        {
          name: 'email',
          label: 'Email',
          field: 'email',
          sortable: true,
          align: 'left'
        }
      ]
    }
  },
  async mounted () {
    await this.getUsers()
  },
  computed: {
    ...mapGetters(['users'])
  },
  methods: {
    ...mapActions(['getUsers']),
    ...mapMutations(['setPage'])
  }
}
</script>
