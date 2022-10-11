import {defineStore} from 'pinia'
import {Ref, ref} from "vue";
import api from "../api/api";
import router from "../router";
import {useCommonStore} from "./useCommonStore";

// You can name the return value of `defineStore()` anything you want,
// but it's best to use the name of the store and surround it with `use`
// and `Store` (e.g. `useUserStore`, `useCartStore`, `useProductStore`)
// the first argument is a unique id of the store across your application
export const useAuthStore = defineStore('authStore', () => {
    // @ts-ignore
    const user: Ref = ref(JSON.parse(localStorage.getItem('user')),)
    const commonStore = useCommonStore()
    const returnUrl: Ref = ref(null)


    async function login(usuario: string, senha: string) {
        await api({requiresAuth: false})
            .post("https://minha-academia-plus-api.azurewebsites.net/login", {usuario: usuario, senha: senha})
            .then(({data}: any) => {
                localStorage.setItem("dataHoraExpiracao", data.dataHoraExpiracao);
                localStorage.setItem("tipoUsuario", data.tipoUsuario);
                localStorage.setItem("tokenAcesso", data.tokenAcesso);
                user.value = data
                router.push("/");
            })
            .catch(({response}) => {
                commonStore.snackbarText = response.data.innerMessage
            })
    }

    return {
        user,
        returnUrl,
        login,
    }
})