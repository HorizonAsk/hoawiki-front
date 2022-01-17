<template>
  <v-app-bar-title> HoaWiki</v-app-bar-title>
  <v-app-bar-title>
    {{ pagename }}
  </v-app-bar-title>
  <v-spacer></v-spacer>
  <LocaleChanger></LocaleChanger>
</template>

<script>
import LocaleChanger from "@/components/LocaleChanger.vue";

export default {
  name: "AppBar",
  components: {
    LocaleChanger,
  },
  data() {
    return {
      pagename: "",
    };
  },
};
</script>

<style scoped></style>
