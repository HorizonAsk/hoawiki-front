<template>
  <div v-if="$store.getters['user/isLoggedIn']" class="text-center">
    <h1>您已登录</h1>
    <h3>页面将跳转至首页。</h3>
    <meta content="5; URL=/" http-equiv="refresh" />
  </div>
  <div v-else class="text-center">
    <v-card>
      <v-card-text> 登录</v-card-text>
      <form>
        <v-text-field
          v-model="userEmail"
          :error-messages="userEmailErrors"
          label="E-mail"
          required
          @blur="v$.userEmail.$touch()"
          @input="v$.userEmail.$touch()"
        ></v-text-field>
        <v-text-field
          v-model="password"
          :counter="20"
          :error-messages="passwordErrors"
          label="password"
          required
          type="password"
          @blur="v$.password.$touch()"
          @input="v$.password.$touch()"
        ></v-text-field>
        <v-btn class="mr-4" @click="submit"> submit</v-btn>
        <v-btn @click="clear"> clear</v-btn>
      </form>
    </v-card>
  </div>
</template>
<script>
import useVuelidate from "@vuelidate/core";
import { required, maxLength, email, minLength } from "@vuelidate/validators";
import store from "@/store";
import Message from "@/components/Message/index";

export default {
  name: "LoginPage",
  setup() {
    return { v$: useVuelidate() };
  },
  validations() {
    return {
      userEmail: { required, email },
      password: { required, minLength: minLength(6), maxLength: maxLength(20) },
    };
  },
  data: () => ({
    userEmail: "",
    password: "",
    jumpTime: 5,
  }),

  computed: {
    userEmailErrors() {
      const errors = [];
      if (!this.v$.userEmail.$dirty) return errors;
      !this.v$.userEmail.email && errors.push("Must be valid e-mail");
      !this.v$.userEmail.required && errors.push("E-mail is required");
      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (!this.v$.password.$dirty) return errors;
      !this.v$.password.minLength &&
        errors.push("Password must be at least 6 characters long");
      !this.v$.password.maxLength &&
        errors.push("Password must be at most 20 characters long");
      !this.v$.password.required && errors.push("Password is required.");
      return errors;
    },
  },
  methods: {
    async submit() {
      const isValid = await this.v$.$validate();
      if (!isValid) {
        Message.warning("Check your information!");
        return false;
      } else {
        console.log({
          password: this.password,
          userEmail: this.userEmail,
        });
        store.commit("user/setUserLogin", {
          password: this.password,
          userEmail: this.userEmail,
        });
      }
    },
    clear() {
      this.v$.$reset();
      this.userEmail = "";
      this.password = "";
    },
  },
};
</script>
