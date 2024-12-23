<template>
  <v-app-bar app>
    <v-app-bar-title> MyApp </v-app-bar-title>
    <v-spacer></v-spacer>
    <v-tooltip
      :text="`Switch to ${isDark === 'light' ? 'Dark mode' : 'Light mode'}`"
      location="top"
    >
      <template v-slot:activator="{ props }">
        <v-btn v-bind="props" icon @click="toggleTheme">
          <v-icon>{{
            isDark === "dark"
              ? "mdi-white-balance-sunny"
              : "mdi-moon-waxing-crescent"
          }}</v-icon>
        </v-btn>
      </template>
    </v-tooltip>
    <v-btn class="mx-2" text to="/" v-show="!xs"> Home </v-btn>
    <v-btn v-if="!userStore.token" text to="/login" v-show="!xs">Login</v-btn>
    <v-btn v-if="!userStore.token" text to="/signup" v-show="!xs">Signup</v-btn>
    <profile-icon v-if="userStore.token"></profile-icon>
    <v-app-bar-nav-icon
      @click="mobileDrawer = !mobileDrawer"
      v-show="xs"
    ></v-app-bar-nav-icon>
  </v-app-bar>
  <v-navigation-drawer v-model="mobileDrawer" app temporary>
    <v-list>
      <v-list-item @click="mobileDrawer = false">
        <v-list-item-content>
          <router-link to="/" class="mobile-link"> Home </router-link>
        </v-list-item-content>
      </v-list-item>
      <v-list-item @click="mobileDrawer = false">
        <v-list-item-content>
          <router-link to="/login" v-if="!userStore.token" class="mobile-link">
            Login
          </router-link>
        </v-list-item-content>
      </v-list-item>
      <v-list-item @click="mobileDrawer = false">
        <v-list-item-content>
          <router-link to="/signup" v-if="!userStore.token" class="mobile-link">
            Signup
          </router-link>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
import { useThemeStore } from "@/store/useThemeStore";
import { useUserStore } from "@/store/useUserStore";
import { setItem } from "@/utils/storage/localStorage";
import { ref } from "vue";
import { useTheme } from "vuetify";
import { useDisplay } from "vuetify/lib/framework.mjs";
import ProfileIcon from "./ProfileIcon.vue";

const userStore = useUserStore();

const theme = useTheme();

const isDark = theme.global.name;
const themeStore = useThemeStore();

function toggleTheme() {
  theme.global.name.value = theme.global.current.value.dark ? "light" : "dark";
  setItem("theme", theme.global.name.value);
  themeStore.toggleTheme();
}

const mobileDrawer = ref(false);

const { xs } = useDisplay();
</script>
