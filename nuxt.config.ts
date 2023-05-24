// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    css: ['~/assets/css/tailwind.css'],
    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        },
    },
    modules: [
        '@pinia/nuxt',
        '@nuxtjs/google-fonts',
        '@nuxtjs/device',
        'nuxt-icon',
        'nuxt-headlessui'
    ],
    googleFonts: {
        preload: true,
        display: 'swap',
        families: {
            'Wix Madefor Display': true
        },
    }
});
