<template>
  <n-dropdown
    v-if="$store.getters['user/isLoggedIn']"
    :options="options.Logged"
    :render-icon="renderDropdownIcon"
    :render-label="renderDropdownLabel"
    placement="bottom-start"
    trigger="click"
  >
    <n-button>
      <n-icon>
        <UserRegular />
      </n-icon>
    </n-button>
  </n-dropdown>
  <n-dropdown
    v-else
    :options="options.NotLogged"
    :render-icon="renderDropdownIcon"
    :render-label="renderDropdownLabel"
    placement="bottom-start"
    trigger="click"
  >
    <n-button>
      <n-icon>
        <UserProfileAlt />
      </n-icon>
    </n-button>
  </n-dropdown>
</template>

<script lang="ts">
import { defineComponent, h } from "vue";
import { useI18n } from "vue-i18n";
import type { DropdownOption } from "naive-ui";
import { NIcon } from "naive-ui";
import I18nKey from "@/components/template/I18nKey.vue";
import { LogIn, LogOut } from "@vicons/ionicons5";
import { UserPlus, UserRegular } from "@vicons/fa";
import { UserProfileAlt } from "@vicons/carbon";

import { setUserLogout } from "@/services/api/auth";

export default defineComponent({
  name: "UserPanel",
  setup: () => {
    const { t } = useI18n({
      useScope: "global",
    });
    return { t };
  },
  components: {
    UserRegular,
    UserProfileAlt,
  },
  data() {
    return {
      options: {
        type: "group",
        Logged: [
          {
            title: "auth.logged.logout_button_name",
            icon: LogOut,
            props: {
              onClick: () => {
                this.LogOut();
              },
            },
          },
        ],
        NotLogged: [
          {
            title: "auth.login.login_button_name",
            icon: LogIn,
            props: {
              onClick: () => {
                this.ToLoginPage();
              },
            },
          },
          {
            title: "auth.login.register_button_name",
            icon: UserPlus,
            props: {
              onClick: () => {
                this.ToRegisterPage();
              },
            },
          },
        ],
      },
    };
  },
  methods: {
    renderDropdownLabel(option: DropdownOption) {
      return h(I18nKey, { inkey: option.title });
    },
    renderDropdownIcon(option: DropdownOption) {
      return h(NIcon, null, h(option.icon));
    },
    ToLoginPage() {
      this.$router.push("/login");
    },
    ToRegisterPage() {
      this.$router.push("/register");
    },
    LogOut() {
      setUserLogout();
      this.$router.go(0);
    },
  },
});
</script>
