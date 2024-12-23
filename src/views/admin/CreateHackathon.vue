<script lang="ts" setup>
import { ref } from "vue";

const formData = ref({
  name: "",
  registrationDeadline: "",
  startDate: "",
  endDate: "",
  isPublic: true,
  maxTeamSize: "",
  image: null,
});

const errors = ref({
  name: "",
  registrationDeadline: "",
  startDate: "",
  endDate: "",
  maxTeamSize: "",
});

const validateForm = () => {
  errors.value.name = formData.value.name ? "" : "Hackathon name is required.";
  errors.value.registrationDeadline = formData.value.registrationDeadline
    ? ""
    : "Registration Deadline is required.";
  errors.value.startDate = formData.value.startDate
    ? ""
    : "Start Date is required.";
  errors.value.endDate = formData.value.endDate ? "" : "End Date is required.";
  errors.value.maxTeamSize = formData.value.maxTeamSize
    ? ""
    : "Max Team Size is required.";

  return !Object.values(errors.value).some((error) => error !== "");
};

const submit = () => {
  if (validateForm()) {
    console.log("Form Data:", formData.value);
    // API call to create a hackathon (you can replace this with actual API logic)
  } else {
    console.error("Validation Errors:", errors.value);
  }
};
</script>

<template>
  <v-container class="d-flex align-center justify-center">
    <v-container>
      <v-form @submit.prevent="submit">
        <!-- Hackathon Name -->
        <v-row justify="center" align="center">
          <v-col sm="2"> <label for="name">Hackathon Name</label></v-col>
          <v-col sm="3">
            <v-text-field
              variant="underlined"
              v-model="formData.name"
              :error="!!errors.name"
              :error-messages="errors.name"
            ></v-text-field>
          </v-col>
        </v-row>

        <!-- Registration Deadline -->
        <v-row justify="center" align="center">
          <v-col sm="2"> Registration Deadline </v-col>
          <v-col sm="3">
            <v-text-field
              variant="underlined"
              v-model="formData.registrationDeadline"
              :error="!!errors.registrationDeadline"
              :error-messages="errors.registrationDeadline"
              type="date"
            ></v-text-field>
          </v-col>
        </v-row>

        <!-- Start Date -->
        <v-row justify="center" align="center">
          <v-col sm="2"> Start Date </v-col>
          <v-col sm="3">
            <v-text-field
              variant="underlined"
              v-model="formData.startDate"
              :error="!!errors.startDate"
              :error-messages="errors.startDate"
              type="date"
            ></v-text-field>
          </v-col>
        </v-row>

        <!-- End Date -->
        <v-row justify="center" align="center">
          <v-col sm="2"> End Date </v-col>
          <v-col sm="3">
            <v-text-field
              variant="underlined"
              v-model="formData.endDate"
              :error="!!errors.endDate"
              :error-messages="errors.endDate"
              type="date"
            ></v-text-field>
          </v-col>
        </v-row>

        <!-- Max Team Size -->
        <v-row justify="center" align="center">
          <v-col sm="2"> Max Team Size </v-col>
          <v-col sm="3">
            <v-text-field
              variant="underlined"
              v-model="formData.maxTeamSize"
              :error="!!errors.maxTeamSize"
              :error-messages="errors.maxTeamSize"
              type="number"
            ></v-text-field>
          </v-col>
        </v-row>

        <!-- Is Public -->
        <v-row justify="center" align="center">
          <v-col sm="2"> Is Public? </v-col>
          <v-col sm="3">
            <v-switch
              v-model="formData.isPublic"
              label="Make it Public"
            ></v-switch>
          </v-col>
        </v-row>

        <!-- Image Upload -->
        <v-row justify="center" align="center">
          <v-col sm="2"> Upload Image </v-col>
          <v-col sm="3">
            <v-file-input
              v-model="formData.image"
              label="Choose image"
              accept="image/*"
              outlined
            ></v-file-input>
          </v-col>
        </v-row>

        <v-row justify="center" align="center">
          <my-btn type="submit">Create Hackathon</my-btn>
        </v-row>
      </v-form>
    </v-container>
  </v-container>
</template>
