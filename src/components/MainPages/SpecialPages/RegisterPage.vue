<template>
  <div class="text-center">
    <v-card>
      <v-card-text> 注册</v-card-text>
      <form>
        <v-text-field
          v-model="userNickName"
          :counter="20"
          :error-messages="userNickNameErrors"
          label="Name"
          required
          @blur="v$.userNickName.$touch()"
          @input="v$.userNickName.$touch()"
        ></v-text-field>
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
        <v-checkbox
          v-model="checkbox"
          :error-messages="checkboxErrors"
          label="Do you agree?"
          required
          @blur="v$.checkbox.$touch()"
          @change="v$.checkbox.$touch()"
        ></v-checkbox>
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
  name: "RegisterPage",
  setup() {
    return { v$: useVuelidate() };
  },
  validations() {
    return {
      userNickName: { required, maxLength: maxLength(20) },
      userEmail: { required, email },
      password: { required, minLength: minLength(6), maxLength: maxLength(20) },
      checkbox: {
        checked(val) {
          return val;
        },
      },
    };
  },
  data: () => ({
    userNickName: "",
    userEmail: "",
    password: "",
    checkbox: false,
  }),

  computed: {
    checkboxErrors() {
      const errors = [];
      if (!this.v$.checkbox.$dirty) return errors;
      !this.v$.checkbox.checked && errors.push("You must agree to continue!");
      return errors;
    },
    userNickNameErrors() {
      const errors = [];
      if (!this.v$.userNickName.$dirty) return errors;
      !this.v$.userNickName.maxLength &&
        errors.push("userNickName must be at most 20 characters long");
      !this.v$.userNickName.required &&
        errors.push("userNickName is required.");
      return errors;
    },
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
          userName: this.userNickName,
        });
        store.commit("user/setUserRegister", {
          password: this.password,
          userEmail: this.userEmail,
          userName: this.userNickName,
        });
      }
    },
    clear() {
      this.v$.$reset();
      this.userNickName = "";
      this.userEmail = "";
      this.checkbox = false;
      this.password = "";
    },
  },
};
</script>
