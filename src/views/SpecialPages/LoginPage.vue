<template>
  <div v-if="$store.getters['user/isLoggedIn']" class="text-center">
    <div v-html="t('auth.login.logged_message')"></div>
    <meta content="5; URL=/" http-equiv="refresh" />
  </div>
  <div v-else class="text-center">
    <el-space>
      <el-card>
        <template #header>
          <h1>{{ t("auth.login.login_button_name") }}</h1>
        </template>

        <el-form
          ref="formRef"
          :model="loginForm"
          :rules="rules"
          label-width="80px"
          status-icon
        >
          <el-form-item :label="t('auth.login.email')" prop="userEmail">
            <el-input v-model="loginForm.userEmail"></el-input>
          </el-form-item>
          <el-form-item :label="t('auth.login.password')" prop="password">
            <el-input v-model="loginForm.password" type="password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submit($refs.formRef)">
              {{ t("auth.login.submit") }}
            </el-button>
            <el-button @click="clear($refs.formRef)">
              {{ t("auth.login.clear") }}
            </el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </el-space>
  </div>
</template>
<script lang="ts">
import store from "@/store";
import Message from "@/components/Message/index";
import { useI18n } from "vue-i18n";
import { reactive } from "vue";

export default {
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
    jumpTime: 5,
  }),
  methods: {
    submit(formIs): void {
      if (!formIs) return;
      formIs.validate((isValid) => {
        if (!isValid) {
          Message.error("Check your information!");
        } else {
          console.debug({
            password: this.loginForm.password,
            userEmail: this.loginForm.userEmail,
          });
          store.commit("user/setUserLogin", {
            password: this.loginForm.password,
            userEmail: this.loginForm.userEmail,
          });
        }
      });
    },
    clear(formIs): void {
      if (!formIs) return;
      formIs.resetFields();
    },
  },
};
</script>
