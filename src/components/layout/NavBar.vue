<template>
  <v-app-bar app>
    <v-app-bar-title> MyApp </v-app-bar-title>
    <v-spacer></v-spacer>
    <v-btn icon @click="toggleTheme">
      <v-icon>{{
        isDark === "dark"
          ? "mdi-white-balance-sunny"
          : "mdi-moon-waxing-crescent"
      }}</v-icon>
    </v-btn>
    <v-btn
      v-for="(item, index) in navItems"
      :key="index"
      class="mx-2"
      text
      :to="item.route"
      v-show="!xs"
    >
      {{ item.label }}
    </v-btn>
    <v-app-bar-nav-icon
      @click="mobileDrawer = !mobileDrawer"
      v-show="xs"
    ></v-app-bar-nav-icon>
  </v-app-bar>
  <v-navigation-drawer v-model="mobileDrawer" app temporary>
    <v-list>
      <v-list-item
        v-for="(item, index) in navItems"
        :key="index"
        @click="mobileDrawer = false"
      >
        <v-list-item-content>
          <router-link :to="item.route" class="mobile-link">
            {{ item.label }}
          </router-link>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
import { setItem } from "@/utils/storage/localStorage";
import { ref } from "vue";
import { useTheme } from "vuetify";
import { useDisplay } from "vuetify/lib/framework.mjs";

const theme = useTheme();

const isDark = theme.global.name;

function toggleTheme() {
  theme.global.name.value = theme.global.current.value.dark ? "light" : "dark";
  setItem("theme", theme.global.name.value);
}

const navItems = [
  { label: "Home", route: "/" },
  { label: "Login", route: "/login" },
  { label: "Signup", route: "/signup" },
];

const mobileDrawer = ref(false);

const { xs } = useDisplay();
</script>

<style scoped>
.nav-title {
  text-decoration: none;
  color: white;
  font-size: 1.5rem;
  font-weight: bold;
}

.mobile-link {
  text-decoration: none;
  color: inherit;
  font-size: 1.2rem;
}

.v-btn {
  text-transform: none;
}

@media (max-width: 600px) {
  .nav-title {
    font-size: 1.2rem;
  }
}
</style>
