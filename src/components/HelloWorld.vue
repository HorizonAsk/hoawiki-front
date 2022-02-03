<template>
  <el-row class="center">
    <el-col cols="12">
      <el-image :src="logo" />
    </el-col>
    <el-col cols="12">
      <div>getMessage: {{ message }}</div>
      <div>Log Status: {{ $store.getters["user/isLoggedIn"] }}</div>
    </el-col>
    <el-col class="mb-4">
      <h1 class="display-2 font-weight-bold mb-3">
        Welcome to Vuetify V3 Alpha
      </h1>

      <p class="subheading font-weight-regular">
        For help and collaboration with other Vuetify developers,
        <br />please join our online
        <a href="https://community.vuetifyjs.com" target="_blank"
        >Discord Community</a
        >
      </p>
    </el-col>

    <el-col class="mb-5" cols="12">
      <h2 class="headline font-weight-bold mb-5">What's next?</h2>

      <el-row justify="center">
        <a
          v-for="(next, i) in whatsNext"
          :key="i"
          :href="next.href"
          class="subheading mx-3"
          target="_blank"
        >
          {{ next.text }}
        </a>
      </el-row>
    </el-col>

    <el-col class="mb-5" cols="12">
      <h2 class="headline font-weight-bold mb-5">Important Links</h2>

      <el-row justify="center">
        <a
          v-for="(link, i) in importantLinks"
          :key="i"
          :href="link.href"
          class="subheading mx-3"
          target="_blank"
        >
          {{ link.text }}
        </a>
      </el-row>
    </el-col>

    <el-col class="mb-5" cols="12">
      <h2 class="headline font-weight-bold mb-5">Ecosystem</h2>

      <el-row justify="center">
        <a
          v-for="(eco, i) in ecosystem"
          :key="i"
          :href="eco.href"
          class="subheading mx-3"
          target="_blank"
        >
          {{ eco.text }}
        </a>
      </el-row>
    </el-col>
  </el-row>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import logo from "@/assets/logo.svg";
import axios from "@/utils/axios";
import Message from "@/components/Message/index";

export default defineComponent({
  name: "HelloWorld",
  mounted: function () {
    axios
      .get("/message")
      .then((res) => {
        console.log("Message got res as ", res);
        Message.info("Message got res as " + res.data.message);
        console.log();
        this.message = res.data.msg;
      })
      .catch(() => {
        Message.error("访问/message失败");
      });
  },
  data() {
    return {
      message: "Init",
      ecosystem: [
        {
          text: "vuetify-loader",
          href: "https://github.com/vuetifyjs/vuetify-loader",
        },
        {
          text: "github",
          href: "https://github.com/vuetifyjs/vuetify",
        },
        {
          text: "awesome-vuetify",
          href: "https://github.com/vuetifyjs/awesome-vuetify",
        },
      ],
      importantLinks: [
        {
          text: "Chat",
          href: "https://community.vuetifyjs.com",
        },
        {
          text: "Made with Vuetify",
          href: "https://madewithvuejs.com/vuetify",
        },
        {
          text: "Twitter",
          href: "https://twitter.com/vuetifyjs",
        },
        {
          text: "Articles",
          href: "https://medium.com/vuetify",
        },
      ],
      whatsNext: [
        {
          text: "Explore components",
          href: "https://vuetifyjs.com",
        },
        {
          text: "Roadmap",
          href: "https://vuetifyjs.com/en/introduction/roadmap/",
        },
        {
          text: "Frequently Asked Questions",
          href: "https://vuetifyjs.com/getting-started/frequently-asked-questions",
        },
      ],
      logo,
    };
  },
});
</script>
