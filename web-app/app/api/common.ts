//# backend api endpoints

export const endpoints = {
    auth: {
        refreshToken: "account/refresh/token/",
        login: "account/login/",
        register: "/account/register/",
        logout: "/account/logout/"
    },
    cars: {
        list: "/car/list-create/",
        add: "/car/list-create/",
        update: (id: number) => `/car/detail/${id}/`,
        car: (id: number) => `/car/detail/${id}/`,
        cars: "/car/list/",
        customerSearch: (categoryId?: string, rentTypeId?: string) => {
            if (categoryId && !rentTypeId) {
                return `car/serche-customer/?category=${categoryId}`
            } else if (!categoryId && rentTypeId) {
                return `car/serche-customer/?type_rent=${rentTypeId}`
            } else if (categoryId && rentTypeId) {
                return `car/serche-customer/?category=${categoryId}&type_rent=${rentTypeId}`
            } else {
                return false;
            }
        },
        adminSearch: (brand?: string, model?: string) => {
            if (!brand && !model) {
                return false;
            }
            return `car/serche/?brand=${brand}&model=${model}`
        }
    },
    admin: {
        office: {
            list: "/car/office/list-create/",
            add: "/car/office/list-create/",
            edit: (id: number) => `/car/office/${id}/`,
            accounts: {
                list: (id: string | number) => `/car/office/${id}/accounts/`,
                add: (id: string | number) => `/car/office/${id}/accounts/`,
                edit: (id: string | number) => `/car/office/accounts/${id}/`,
            }
        },
        users: {
            list: "/account/customer/user-list/",
            view: (id: number) => `/account/customer/user/${id}/`
        },
        categories: {
            list: 'car/category/list-create/',
            add: 'car/category/list-create/',
            edit: (id:number) => `car/category/${id}/`,
        }
    },
    customer: {
        reserveCar: "/car/reserve/",
        temporaryReservations: "/car/my-temporary-reservations/",
        cancel: (id: number) => `/car/reserve/cancel/${id}/`
    },
    employee: {
        list: "/account/user/",
        add: "/account/user/",
        delete: (id: number) => `/account/user/${id}/`,
        update: (id: number) => `/account/user/${id}/`,
        switch: "/account/bulk-action/",
        confirmReservation: (id: number) => `/car/office/confirm-reservation/${id}/`,
        cancelReservation: (id: number) => `/car/reservations/cancel/${id}/`,
        searchReservation: (first_name?: string, last_name?: string, phone?: string, id_number?: string, status_reservation?: string) => {
            if (!first_name && !last_name && !phone && !id_number && !status_reservation) {
                return false;
            }
            return `car/office/temporary-reservations/?first_name=${first_name}&last_name=${last_name}&phone=${phone}&id_number=${id_number}&status_reservation=${status_reservation}`
        }
    },
    reservations: {
        temporary: {
            list: "/car/office/temporary-reservations/"
        }
    },
    home: "/car/home/"

}