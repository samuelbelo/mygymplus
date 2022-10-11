<template>
  <v-app>
    <v-app-bar app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"/>
      <v-app-bar-title>{{ title }}</v-app-bar-title>
      <v-spacer/>
      <v-btn icon @click="themeDark = !themeDark">
        <v-icon>mdi-theme-light-dark</v-icon>
      </v-btn>
      <v-progress-linear
          :active="loading"
          absolute
          bottom
          color="primary accent-3"
      />
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" app>
      <v-list>
        <v-list-subheader>Navigation</v-list-subheader>
        <v-list-item :to="{name: 'Home'}">
          <template v-slot:prepend>
            <v-icon :icon="'mdi-home'"></v-icon>
          </template>
          <v-list-item-title v-text="'Home'"></v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <v-fade-transition mode="out-in">
        <router-view/>
      </v-fade-transition>
    </v-main>
    <v-snackbar v-model="snackbar">
      {{ snackbarText }}
      <template v-slot:actions>
        <v-btn
            color="red"
            variant="text"
            @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-app>
</template>

<script setup lang="ts">
import {computed, Ref, ref, watch} from 'vue'

import {useCommonStore} from "./stores/useCommonStore";

const commonStore = useCommonStore()
const title: Ref<string> = ref("MinhaAcademia+");
const drawer: Ref<boolean> = ref(false);
const snackbar: Ref<boolean> = ref(false);
const snackbarText: Ref<string> = computed(() => commonStore.snackbarText);

watch(snackbarText, () => snackbar.value = true);

const loading: Ref<boolean> = ref(false)
const themeDark: Ref<boolean> = ref(false)
</script>
