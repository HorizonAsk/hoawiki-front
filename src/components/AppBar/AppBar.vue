<template>
  <v-layout class=".flex-nowrap align-center" no-gutters="true">
    <v-col class="d-flex justify-space-around flex-row align-center" xs="0">
      <v-img :src="hoalogo" class="my-3" contain height="60" />
      <v-app-bar-title> HoaWiki</v-app-bar-title>
    </v-col>
    <v-col>
      <v-layout></v-layout>
    </v-col>
    <v-col class="d-flex justify-end flex-row">
      <v-card>
        <LocaleChanger></LocaleChanger>
      </v-card>
      <v-card>
        <UserPanel></UserPanel>
      </v-card>
      <v-card class="bg-transparent" elevation="0" min-width="50"></v-card>
    </v-col>
  </v-layout>
</template>

<script>
import LocaleChanger from "@/components/LocaleChanger.vue";
import UserPanel from "@/components/UserPanel/UserPanel.vue";
import hoalogo from "@/assets/hoalogo.jpg";

export default {
  name: "AppBar",
  components: {
    UserPanel,
    LocaleChanger,
  },
  data() {
    return {
      hoalogo,
    };
  },
};
</script>

<style scoped></style>
