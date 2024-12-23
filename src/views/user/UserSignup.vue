<script lang="ts" setup>
import { SignUpFormData } from "@/types/signup";
import { validateEmail, validatePassword } from "@/utils/regex";
import { ref } from "vue";

const formData = ref<SignUpFormData>({
  firstName: "",
  lastName: "",
  password: "",
  email: "",
});

const errors = ref({
  firstName: "",
  email: "",
  password: "",
});

const validateForm = () => {
  errors.value.firstName = formData.value.firstName
    ? ""
    : "First Name is required.";

  errors.value.email = validateEmail(formData.value.email)
    ? ""
    : "Invalid email address.";
  errors.value.password = validatePassword(formData.value.password)
    ? ""
    : "Password must be at least 8 characters long, include uppercase, lowercase, number, and special character.";

  return !Object.values(errors.value).some((error) => error !== "");
};

// Submit handler
const submit = () => {
  if (validateForm()) {
    console.log("Form Data:", formData.value);
    // Proceed with API call or other logic
  } else {
    console.error("Validation Errors:", errors.value);
  }
};
</script>

<template>
  <v-container class="d-flex align-center justify-center">
    <v-container>
      <v-form @submit.prevent="submit">
        <v-row justify="center" align="center">
          <v-col sm="2"> <label for="First Name">First Name</label></v-col>
          <v-col sm="3">
            <v-text-field
              variant="underlined"
              v-model="formData.firstName"
              :error="!!errors.firstName"
              :error-messages="errors.firstName"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row justify="center" align="center">
          <v-col sm="2 "> Last Name </v-col>
          <v-col sm="3    ">
            <v-text-field
              variant="underlined"
              v-model="formData.lastName"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row justify="center" align="center">
          <v-col sm="2 "> Email </v-col>
          <v-col sm="3    ">
            <v-text-field
              variant="underlined"
              v-model="formData.email"
              :error="!!errors.email"
              :error-messages="errors.email"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row justify="center" align="center">
          <v-col sm="2 "> Password </v-col>
          <v-col sm="3    ">
            <v-text-field
              variant="underlined"
              v-model="formData.password"
              :type="'password'"
              :error="!!errors.password"
              :error-messages="errors.password"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row justify="center" align="center">
          <v-btn type="submit"> submit </v-btn>
        </v-row>
      </v-form>
    </v-container>
  </v-container>
</template>
