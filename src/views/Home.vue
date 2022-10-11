<template>
  <v-container class="text-center">
    <v-row class="my-3">
      <v-col class="">
        <h1 class="text-h4 font-weight-bold mb-3">Bem-vindo ao MinhaAcademia+</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="mb-5" cols="12">
        <component :is="selectedComponent"></component>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import Aluno from './Aluno/Aluno.vue'
import Instrutor from './Instrutor/Instrutor.vue'
import { computed } from "vue";

const selectedComponent = computed({
  get() {
    return localStorage.getItem('tipoUsuario') == 'Aluno' ? Aluno : Instrutor
  },
  set() {
    //
  }
})
</script>

<style scoped>

</style>