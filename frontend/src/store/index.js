//contains all modules
import { createStore } from 'vuex';
import { auth } from './auth.modu.js';

const store = createStore({
    modules: {
        auth,
    },
});

export default store;