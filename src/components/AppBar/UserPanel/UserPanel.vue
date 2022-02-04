<template>
  <el-sub-menu class="el-sub-menu__title el-sub-menu__hide-arrow" index="3">
    <template #title>
      <div v-if="$store.getters['user/isLoggedIn']">
        <el-icon>
          <user />
        </el-icon>
      </div>
      <div v-else>
        <el-icon>
          <user-filled />
        </el-icon>
      </div>
    </template>
    <div v-if="$store.getters['user/isLoggedIn']">
      <el-menu-item
        v-for="item in items.Logged"
        :key="item.title"
        @click="item.action"
      >
        <el-icon>
          <component v-bind:is="item.icon"></component>
        </el-icon>
        {{ t(item.title) }}
      </el-menu-item>
    </div>
    <div v-else>
      <el-menu-item
        v-for="item in items.NotLogged"
        :key="item.title"
        @click="item.action"
      >
        <el-icon>
          <component v-bind:is="item.icon"></component>
        </el-icon>
        {{ t(item.title) }}
      </el-menu-item>
    </div>
  </el-sub-menu>
</template>

<script>
import { useI18n } from "vue-i18n";
import store from "@/store";
import {
  User,
  UserFilled,
  Plus,
  SwitchButton,
  Avatar,
} from "@element-plus/icons-vue";
import { setUserLogout } from "@/services/api/auth";

export default {
  name: "UserPanel",
  components: {
    User,
    UserFilled,
    Plus,
    SwitchButton,
    Avatar,
  },
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
            icon: "SwitchButton",
            action: this.LogOut,
          },
        ],
        NotLogged: [
          {
            title: "auth.login.login_button_name",
            icon: "plus",
            action: this.ToLoginPage,
          },
          {
            title: "auth.login.register_button_name",
            icon: "Avatar",
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
      setUserLogout();
    },
  },
};
</script>
