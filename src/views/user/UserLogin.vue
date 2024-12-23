<script setup>
import { useUserStore } from "@/store/useUserStore";
import { ref } from "vue";
import { useRouter } from "vue-router";
import MyButton from "../../components/MyButton.vue";

const router = useRouter();

const userStore = useUserStore();

const visibleEye = ref(true);
const isSubmitting = ref(false);
const remember = ref("false");
const formData = ref({ email: "", password: "" });

const login = () => {
  isSubmitting.value = true;

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
    <v-row align="center" justify="center">
      <v-col sm="1">
        <label for="email">Email</label>
      </v-col>

      <v-col sm="3">
        <v-text-field
          name="email"
          id="email"
          variant="underlined"
          v-model="formData.email"
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
        <my-button label="Submit" :clickHandler="login" />
      </div>
    </v-row>
  </v-container>
</template>
