import {UseFetchOptions} from "#app";
import defu from "defu";

export function useFetchApi<T> (url: string, options: UseFetchOptions<T> = {}) {
    const userAuth = useCookie('token')
    const config = useRuntimeConfig()

    const defaults: UseFetchOptions<T> = {
        baseURL: config.public.apiUrl ?? 'http://127.0.0.1:8000/api',
        // set user token if connected
        headers: userAuth.value
            ? { Authorization: `Bearer ${userAuth.value}`, Accept: 'application/json' }
            : {  Accept: 'application/json' },

        onResponse (_ctx) {
            // _ctx.response._data = new myBusinessResponse(_ctx.response._data)
        },

        onResponseError (_ctx) {
            // throw new myBusinessError()
        }
    }

    // for nice deep defaults, please use unjs/defu
    const params = defu(defaults, options)

    return useFetch(url, params)
}