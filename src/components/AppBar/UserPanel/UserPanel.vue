<template>
  <v-menu>
    <template v-slot:activator="{ props }">
      <v-btn v-if="$store.getters['user/isLoggedIn']" v-bind="props">
        <v-icon> mdi-account-details</v-icon>
      </v-btn>
      <v-btn v-else v-bind="props">
        <v-icon> mdi-account-plus</v-icon>
      </v-btn>
    </template>
    <div>
      <v-card right top>
        <v-list v-if="$store.getters['user/isLoggedIn']">
          <v-list-item v-for="item in items.Logged" :key="item.title">
            <v-btn @click="item.action">
              <v-icon>{{ item.icon }}</v-icon>
              <v-list-item-title>{{ t(item.title) }}</v-list-item-title>
            </v-btn>
          </v-list-item>
        </v-list>
        <v-list v-else>
          <v-list-item v-for="item in items.NotLogged" :key="item.title">
            <v-btn @click="item.action">
              <v-icon>{{ item.icon }}</v-icon>
              <v-list-item-title>{{ t(item.title) }}</v-list-item-title>
            </v-btn>
          </v-list-item>
        </v-list>
      </v-card>
    </div>
  </v-menu>
</template>

<script>
import { useI18n } from "vue-i18n";
import store from "@/store";

export default {
  name: "UserPanel",
  setup: () => {
    const { t } = useI18n({
      useScope: "global",
    });
    return { t };
  },
  data() {
    return {
      items: {
        Logged: [
          {
            title: "auth.logged.logout_button_name",
            icon: "mdi-account-off",
            action: this.LogOut,
          },
        ],
        NotLogged: [
          {
            title: "auth.login.login_button_name",
            icon: "mdi-account-box",
            action: this.ToLoginPage,
          },
          {
            title: "auth.login.register_button_name",
            icon: "mdi-account-edit",
            action: this.ToRegisterPage,
          },
        ],
      },
    };
  },
  methods: {
    ToLoginPage() {
      this.$router.push("/login");
    },
    ToRegisterPage() {
      this.$router.push("/register");
    },
    LogOut() {
      store.commit("user/setUserLogout");
    },
  },
};
</script>
