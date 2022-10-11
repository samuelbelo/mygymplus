import {defineStore} from 'pinia'
import {Ref, ref, watch} from "vue";
import api from "../api/api";
import router from "../router";

export const useCommonStore = defineStore('commonStore', () => {
    const loading: Ref<boolean> = ref(false)
    const snackbarText: Ref<string> = ref("")

    return {
        loading,
        snackbarText
    }
})