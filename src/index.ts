import { createApp } from 'vue'
import App from './App.vue'
import Styles from '/src/style/reset.css'
import { defineCustomElement as VueDefineCustomElement, h, getCurrentInstance } from 'vue';
//@ts-ignore
import { createWebComponent } from 'vue-web-component-wrapper';


createApp(App).mount('#app')

/* createWebComponent({
    rootComponent: App,
    elementName: 'weather-widget',
    //plugins: pluginsWrapper,
    cssFrameworkStyles: Styles,
    VueDefineCustomElement,
    h,
    createApp,
    getCurrentInstance
}); */