import { createApp } from 'vue';

import Dashboard from './components/Dashboard.vue';

const mount = (el) => createApp(Dashboard).mount(el);

if (process.env.NODE_ENV === 'development') {
    const devRoot = document.getElementById('_dashboard-dev-root');

    if (devRoot) {
        mount(devRoot);
    }
}

export { mount };