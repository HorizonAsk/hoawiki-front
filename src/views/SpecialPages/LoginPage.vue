<template>
  <n-space justify="center" style="width: 100%">
    <div
      v-if="$store.getters['user/isLoggedIn']"
      class="text-center"
      style="text-align: center"
    >
      <div v-html="t('auth.login.logged_message')"></div>
      <h3>{{ t("exception.page_jump_after_time", { jumpTime: jumpTime }) }}</h3>
      <meta content="2; URL=/" http-equiv="refresh" />
    </div>
    <div v-else class="text-center" style="text-align: center">
      <n-space>
        <n-card>
          <template #header>
            <h1>{{ t("auth.login.login_button_name") }}</h1>
          </template>

          <n-form
            ref="formRef"
            :model="loginForm"
            :rules="rules"
            :label-width="80"
          >
            <n-form-item :label="t('auth.login.email')" path="userEmail">
              <n-input v-model:value="loginForm.userEmail"></n-input>
            </n-form-item>
            <n-form-item :label="t('auth.login.password')" path="password">
              <n-input
                v-model:value="loginForm.password"
                type="password"
              ></n-input>
            </n-form-item>
            <n-form-item style="display: flex; justify-content: center">
              <n-space>
                <n-button type="primary" @click="submit($refs.formRef)">
                  {{ t("auth.login.submit") }}
                </n-button>
                <n-button @click="clear()">
                  {{ t("auth.login.clear") }}
                </n-button>
              </n-space>
            </n-form-item>
          </n-form>
        </n-card>
      </n-space>
    </div>
  </n-space>
</template>
<script lang="ts">
import { setUserLogin } from "@/services/api/auth.ts";
import Message from "@/components/Message/index";
import { useI18n } from "vue-i18n";
import { defineComponent, reactive } from "vue";

export default defineComponent({
  name: "LoginPage",
  setup() {
    const { t } = useI18n({
      // inheritLocale: true,
      useScope: "global",
    });
    const rules = reactive({
      userEmail: [
        {
          required: true,
          message: t("validation.email_must_given"),
          trigger: ["blur"],
        },
        {
          type: "email",
          message: t("validation.email_incorrect"),
          trigger: ["blur", "change"],
        },
      ],
      password: [
        {
          required: true,
          message: t("validation.password_must_given"),
          trigger: ["blur"],
        },
        {
          min: 8,
          max: 40,
          message: t("validation.password_length_wrong"),
          trigger: ["blur", "change"],
        },
      ],
    });
    return { t, rules };
  },
  data: () => ({
    loginForm: {
      userEmail: "",
      password: "",
    },
    jumpTime: 3,
  }),
  methods: {
    submit(formIs): void {
      if (!formIs) return;
      formIs.validate((notValid) => {
        if (notValid) {
          Message.error("Check your information!");
        } else {
          console.debug({
            password: this.loginForm.password,
            userEmail: this.loginForm.userEmail,
          });
          setUserLogin({
            password: this.loginForm.password,
            userEmail: this.loginForm.userEmail,
          });
        }
      });
    },
    clear(): void {
      this.loginForm = {
        userEmail: "",
        password: "",
      };
    },
    leftTime(): void {
      this.jumpTime > 0 ? this.jumpTime-- : null;
    },
  },
  created() {
    setInterval(this.leftTime, 1000);
  },
});
</script>
