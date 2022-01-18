<template>
  <v-app>
    <v-app-bar absolute color="grey-lighten-2">
      <AppBar></AppBar>
    </v-app-bar>
    <v-navigation-drawer absolute color="grey-darken-2" permanent>
      <HelloI18n></HelloI18n>
      <HelloWorld></HelloWorld>
    </v-navigation-drawer>
    <v-main>
      <Message></Message>
      <router-view></router-view>
      <v-footer> </v-footer>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import HelloWorld from "./components/HelloWorld.vue";
import Message from "@/components/Message/Message.vue";
import HelloI18n from "@/components/HelloI18n.vue";
import AppBar from "@/components/AppBar/AppBar.vue";

export default defineComponent({
  name: "App",

  components: {
    AppBar,
    Message,
    HelloWorld,
    HelloI18n,
  },

  data() {
    return {
      //
    };
  },
});
</script>
