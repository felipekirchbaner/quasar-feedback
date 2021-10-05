<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          Feedback App
        </q-toolbar-title>

        <div>
          <q-btn
            @click="logout()"
            flat
            icon="logout"
            label="Sair"
          />
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list>
        <q-item-label
          header
        >
          Administrativo
        </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from 'components/EssentialLink.vue'
import { createNamespacedHelpers } from 'vuex'
const { mapGetters, mapActions } = createNamespacedHelpers('app')

const linksList = [
  {
    title: 'Feedbacks',
    icon: 'forum',
    link: '/feedbacks'
  },
  {
    title: 'Usuários',
    icon: 'people',
    link: '/users'
  }
]

import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink
  },

  setup () {
    const leftDrawerOpen = ref(false)

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  },
  methods: {
    ...mapActions(['logout'])
  },
  computed: {
    ...mapGetters(['session']),
    user () {
      return this.session.user
    }
  },
  watch: {
    user () {
      if (!this.user) {
        this.$router.push({ name: 'login' })
      }
    }
  }
})
</script>
