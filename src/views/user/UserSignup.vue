<script lang="ts" setup>
import { SignUpFormData } from "@/types/signup";
import { ref } from "vue";

const formData = ref<SignUpFormData>({
  firstName: "",
  lastName: "",
  password: "",
  email: "",
});
const submit = () => {
  console.log(formData);
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
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row justify="center" align="center">
          <v-col sm="2 "> Password </v-col>
          <v-col sm="3    ">
            <v-text-field
              variant="underlined"
              v-model="formData.password"
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
