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
        car: (id: number) => `/car/customer/detail/${id}/`,
        cars: "/car/list/",
        customerSearch: (categoryId?: string, rentTypeId?: string, minPrice?: number, maxPrice?: number) => {
            let firstParamSet: boolean = false;
            let query: string = 'car/serche-customer/';
            // ?category=${categoryId}&type_rent=${rentTypeId}

            if (categoryId) {
                if (firstParamSet) {
                    query = query + `&category=${categoryId}`
                } else {
                    query = query + `?category=${categoryId}`
                    firstParamSet = true;
                }
            }

            if (rentTypeId) {
                if (firstParamSet) {
                    query = query + `&type_rent=${rentTypeId}`
                } else {
                    query = query + `?type_rent=${rentTypeId}`
                    firstParamSet = true;
                }
            }

            if (minPrice) {
                if (firstParamSet) {
                    query = query + `&min_price=${minPrice}`
                } else {
                    query = query + `?min_price=${minPrice}`
                    firstParamSet = true;
                }
            }

            if (maxPrice) {
                if (firstParamSet) {
                    query = query + `&max_price=${maxPrice}`
                } else {
                    query = query + `?max_price=${maxPrice}`
                    firstParamSet = true;
                }
            }

            if (!firstParamSet) {
                return false;
            }

            return query;

        },
        adminSearch: (brand?: string, model?: string, category?: string) => {
            if (!brand && !model && !category) {
                return false;
            }
            return `car/serche/?brand=${brand}&model=${model}&category=${category}`
        },
        rating: "/car/ratings/",
        categories: "/car/customer/category-list/",

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
            edit: (id: number) => `car/category/${id}/`,
        },
        statics: "/car/admin/statistics/"
    },
    customer: {
        reserveCar: "/car/reserve/",
        temporaryReservations: "/car/my-temporary-reservations/",
        cancel: (id: number) => `/car/reserve/cancel/${id}/`,
        evaluations: {
            evaluableOffices: "/car/customer/evaluable-offices/",
            rate: (id: number) => `/car/customer/evaluate-office/${id}/`
        },
        customerCars: {
            list: "/car/customer/list-create/",
            add: "/car/customer/list-create/",
            edit: (id: number) => `/car/customer/detail-car/${id}/`,
            delete: (id: number) => `/car/customer/detail-car/${id}/`,
            search: (brand?: string, model?: string, category?: string) => {
                if (!brand && !model && !category) {
                    return false;
                }
                return `/car/customer/list-create/?brand=${brand}&model=${model}&category=${category}`
            },
        }
    },
    employee: {
        list: "/account/office/accounts/",
        add: "/account/office/accounts/",
        delete: (id: number) => `/account/office/account/${id}/`,
        update: (id: number) => `/account/office/account/${id}/`,
        switch: "/account/bulk-action/",
        confirmReservation: (id: number) => `/car/confirm-reservation/${id}/`,
        cancelReservation: (id: number) => `/car/reservations/cancel/${id}/`,
        confirmFakeReservation: (id: number) => `/car/confirm-fake-reservations/${id}/`,
        cancelFakeReservation: (id: number) => `/car/reservations/cancel/${id}/`,
        searchReservation: (first_name?: string, last_name?: string, phone?: string, id_number?: string, status_reservation?: string) => {
            if (!first_name && !last_name && !phone && !id_number && !status_reservation) {
                return false;
            }
            return `/car/list/reservations/?first_name=${first_name}&last_name=${last_name}&phone=${phone}&id_number=${id_number}&status_reservation=${status_reservation}`
        },
        searchTempReservation: (first_name?: string, last_name?: string, phone?: string, id_number?: string, status_reservation?: string) => {
            if (!first_name && !last_name && !phone && !id_number && !status_reservation) {
                return false;
            }
            return `/car/list/temporary-reservations/?first_name=${first_name}&last_name=${last_name}&phone=${phone}&id_number=${id_number}`
        }
    },
    reservations: {
        temporary: {
            list: "/car/list/temporary-reservations/"
        },
        all: {
            list: "/car/list/reservations/"
        },
        fake: {
            list: "/car/list/fake-reservations/"
        }
    },
    offices: {
        list: "/car/customer/offices-list/",
        get: (id: number) => `/car/customer/office/${id}/`
    },
    home: "/car/home/",
    managerStatics: "/car/manager/statistic/"

}