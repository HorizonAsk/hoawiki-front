<template>
  <n-layout-content
    content-style="padding: 24px"
    style="min-height: 400px; background-color: dimgray"
  >
    <n-space style="justify-content: center">
      <div
        v-if="$store.getters['user/isLoggedIn']"
        class="text-center"
        style="text-align: center"
      >
        <div v-html="t('auth.login.logged_message')"></div>
        <h3>
          {{ t("exception.page_jump_after_time", { jumpTime: jumpTime }) }}
        </h3>
        <meta content="2; URL=/" http-equiv="refresh" />
      </div>
      <div v-else class="text-center" style="text-align: center">
        <n-space>
          <n-card>
            <template #header>
              <div class="card-header">
                <h1>{{ t("auth.login.register_button_name") }}</h1>
              </div>
              <h5 v-html="t('auth.register.restrictions')"></h5>
            </template>

            <n-form
              ref="formRef"
              :label-width="80"
              :model="registerForm"
              :rules="rules"
            >
              <n-form-item
                :label="t('auth.login.nickname')"
                path="userNickName"
              >
                <n-input v-model:value="registerForm.userNickName"></n-input>
              </n-form-item>
              <n-form-item :label="t('auth.login.email')" path="userEmail">
                <n-input v-model:value="registerForm.userEmail"></n-input>
              </n-form-item>
              <n-form-item :label="t('auth.login.password')" path="password">
                <n-input
                  v-model:value="registerForm.password"
                  type="password"
                ></n-input>
              </n-form-item>
              <n-form-item path="checkbox">
                <n-checkbox
                  v-model:checked="registerForm.checkbox"
                  :label="t('auth.login.checked')"
                  size="large"
                ></n-checkbox>
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
  </n-layout-content>
</template>
<script lang="ts">
import Message from "@/components/Message/index";
import { useI18n } from "vue-i18n";
import { defineComponent, reactive } from "vue";
import { setUserRegister } from "@/services/api/auth";

export default defineComponent({
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
    jumpTime: 3,
    showTerm: false,
  }),

  methods: {
    submit(formIs): void {
      if (!formIs) return;
      formIs.validate((notValid) => {
        if (notValid) {
          Message.error(this.t("validation.wrong_validation_common"));
        } else {
          console.debug({
            password: this.registerForm.password,
            userEmail: this.registerForm.userEmail,
            userName: this.registerForm.userNickName,
          });
          setUserRegister({
            password: this.registerForm.password,
            userEmail: this.registerForm.userEmail,
            userName: this.registerForm.userNickName,
          });
        }
      });
    },
    clear(): void {
      this.registerForm = {
        userNickName: "",
        userEmail: "",
        password: "",
        checkbox: false,
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
