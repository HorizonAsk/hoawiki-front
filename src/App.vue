<template>
  <v-app>
    <Message></Message>
    <v-main>
      <HelloWorld />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import HelloWorld from "./components/HelloWorld.vue";
import Message from "@/components/Message/Message.vue";

export default defineComponent({
  name: "App",

  components: {
    Message,
    HelloWorld,
  },

  data() {
    return {
      //
    };
  },
});
</script>
