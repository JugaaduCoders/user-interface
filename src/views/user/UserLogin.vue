<script setup>
import { useMessageStore } from "@/store/useMessageStore";
import { useUserStore } from "@/store/useUserStore";
import { regexEmail } from "@/utils/regex";
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const userStore = useUserStore();
const messageStore = useMessageStore();

const visibleEye = ref(true);
const isSubmitting = ref(false);
const remember = ref("false");
const formData = ref({ email: "c", password: "" });

const submit = () => {
  console.log(formData.value.email, formData.value.password, remember.value);
};

const login = () => {
  isSubmitting.value = true;

  for (const [key, value] of Object.entries(formData.value)) {
    let error;

    if (!value) {
      error = `${key} is a mandatory field!`;
    } else if (!regexEmail(formData.value?.email)) {
      error = "You must enter a valid email address";
    }

    if (error) {
      messageStore.setError({ error });

      setTimeout(() => {
        isSubmitting.value = false;
      }, 2000);

      return;
    }
  }

  userStore.login({ ...formData.value }).then((res) => {
    if (res) {
      router.push("/user");
    } else {
      isSubmitting.value = false;
    }
  });
};
</script>

<template>
  <v-container>
    <form @submit.prevent="login">
      <v-row align="center" justify="center">
        <v-col sm="1">
          <label for="email">Email</label>
        </v-col>

        <v-col sm="3">
          <v-text-field
            name="email"
            id="email"
            type="email"
            variant="underlined"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row align="center" justify="center">
        <v-col sm="1" style="margin-right: 15px">
          <label for="password">Password</label>
        </v-col>
        <v-col sm="3">
          <v-text-field
            :type="visibleEye ? 'password' : 'text'"
            v-model="formData.password"
            variant="underlined"
          />
        </v-col>
      </v-row>

      <v-row align="center" justify="center">
        <v-checkbox
          v-model="remember"
          color="primary"
          label="Remember "
          value="true"
        ></v-checkbox>
      </v-row>
      <v-row align="center" justify="center">
        <div class="col-sm-12">
          <v-btn density="default" type="submit">Submit </v-btn>
        </div>
      </v-row>
    </form>
  </v-container>
</template>
