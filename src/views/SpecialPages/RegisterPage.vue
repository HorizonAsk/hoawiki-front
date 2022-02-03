<template>
  <div class="text-center">
    <el-space>
      <el-card>
        <template #header>
          <div class="card-header">
            <h1>{{ t("auth.login.register_button_name") }}</h1>
          </div>
          <h5 v-html="t('auth.register.restrictions')"></h5>
        </template>

        <el-form
          ref="formRef"
          :model="registerForm"
          :rules="rules"
          label-width="80px"
          status-icon
        >
          <el-form-item :label="t('auth.login.nickname')" prop="userNickName">
            <el-input v-model="registerForm.userNickName"></el-input>
          </el-form-item>
          <el-form-item :label="t('auth.login.email')" prop="userEmail">
            <el-input v-model="registerForm.userEmail"></el-input>
          </el-form-item>
          <el-form-item :label="t('auth.login.password')" prop="password">
            <el-input
              v-model="registerForm.password"
              type="password"
            ></el-input>
          </el-form-item>
          <el-form-item prop="checkbox">
            <el-checkbox
              v-model="registerForm.checkbox"
              :label="t('auth.login.checked')"
              size="large"
            ></el-checkbox>
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
  name: "RegisterPage",
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
      userNickName: [
        {
          required: true,
          message: t("validation.nickname_must_given"),
          trigger: ["blur"],
        },
        {
          max: 50,
          message: t("validation.nickname_length_wrong"),
          trigger: ["blur", "change"],
        },
      ],
      checkbox: [
        {
          type: "enum",
          enum: [true],
          message: t("validation.checked_must"),
          trigger: ["blur", "change"],
        },
      ],
    });
    return { t, rules };
  },
  data: () => ({
    registerForm: {
      userNickName: "",
      userEmail: "",
      password: "",
      checkbox: false,
    },
  }),

  methods: {
    submit(formIs): void {
      if (!formIs) return;
      formIs.validate((isValid) => {
        if (!isValid) {
          Message.error(this.t("validation.wrong_validation_common"));
        } else {
          console.debug({
            password: this.registerForm.password,
            userEmail: this.registerForm.userEmail,
            userName: this.registerForm.userNickName,
          });
          store.commit("user/setUserRegister", {
            password: this.registerForm.password,
            userEmail: this.registerForm.userEmail,
            userName: this.registerForm.userNickName,
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
