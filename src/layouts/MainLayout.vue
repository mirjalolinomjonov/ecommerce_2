<template>
  <q-layout view="lHh Lpr lFf">
    <HeaderCom/>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import HeaderCom from 'src/components/Header.vue'

export default {
  components: { HeaderCom },
  name: 'MainLayout',

  data () {
    return {
    }
  }
}
</script>
