<template>
  <header class="header bg-teal q-pa-md q-gutter-sm">
    <q-bar dense class="bg-transparent text-white">
      <q-icon size="md" :name="fasCartShopping" />
      <div class="header__logo">Ecommerce</div>
      <q-space />
      <q-list dense  padding class="rounded-borders flex nav-list">
        <q-item v-for="(item, index) in navigation" :key="index" v-ripple>
          <q-item-section class="ml-2">
            <router-link
              class="nav-list__item text-white inline-block"
              :to="item.link"
              >{{ item.name }}</router-link
            >
          </q-item-section>
        </q-item>
      </q-list>
    </q-bar>
  </header>
</template>

<script>
import { fasCartShopping } from "@quasar/extras/fontawesome-v6";

export default {
  name: "HeaderCompon",
  data() {
    return {
      navigation: [
        {
          name: "home",
          link: "/",
        },
        {
          name: "create",
          link: "/create",
        },
        {
          name: "about",
          link: "/about",
        },
      ],
    };
  },
  setup() {
    return {
      fasCartShopping,
    };
  },
};
</script>

<style lang="scss" scoped>
.header{
  &__logo{
    font-size: 1.25rem;
    font-weight: 500;
  }
}
.nav-list{
  &__item{
    display: block;
    text-decoration: none;
    font-size: 1rem;
    margin-left: 1rem;
    text-transform: capitalize;
  }
}
</style>
