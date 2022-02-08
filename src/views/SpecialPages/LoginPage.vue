<template>
  <v-space style="width: 100%">
    <div
      v-if="$store.getters['user/isLoggedIn']"
      class="text-center"
      style="text-align: center"
    >
      <div v-html="t('auth.login.logged_message')"></div>
      <meta content="5; URL=/" http-equiv="refresh" />
    </div>
    <div v-else class="text-center" style="text-align: center">
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
  </v-space>
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
          setUserLogin({
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
});
</script>
