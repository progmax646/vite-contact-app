import { createStore } from 'vuex'
import { data } from "../dictionary/data";

export default createStore({
    state: {
        userData: "USER!",
        contacts: data(),
        tags: [
            {
                id: 1,
                label: 'Все',
            },
            {
                id: 2,
                label: 'Семья',
            },
            {
                id: 3,
                label: 'Работа',
            },
            {
                id: 4,
                label: 'Дом'
            },
            {
                id: 5,
                label: 'Бытовуха'
            },
        ]
    },
    mutations: {
        SET_CONTACT (state, contact) {
            state.contacts.unshift(contact)
        }
    },
    actions: {
    },
    getters: {

    }
})
