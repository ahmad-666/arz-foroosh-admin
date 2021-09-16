<template>
  <v-app :style="{ 'background-color': backgroundColor }">
    <v-main>
      <Nuxt />
    </v-main>
  </v-app>
</template>
<script>
export default {
  computed: {
    backgroundColor() {
      return this.$vuetify.theme.themes.light.backgroundColor;
    },
  },
};
</script>
