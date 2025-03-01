type LoginType = {
    first_name: string,
    last_name: string,
    email: string,
    username: string,
    role: string,
    access: string
    refresh: string
    redirect_url: string
}

type RefreshType = {
    first_name: string,
    last_name: string,
    email: string,
    username: string,
    role: string,
    access: string
    message: string
}

type CarType = {
    id_car: number,
    brand: string
    model: string
    description: string
    category: number
    is_available_daily: boolean
    is_available_monthly: boolean
    is_available_yearly: boolean
    daily_rent_price: number
    monthly_rent_price: number
    yearly_rent_price: number
    image1: string
    image2: string
    image3: string
    status: number
}

type EmployeeType = {
    id: number,
    first_name: string,
    last_name: string,
    email: string,
    phone: string,
    username: string,
    password: string,
    account_type: rolesType,
    is_active: boolean
    last_login: string
    date_joined: string
    is_superuser: boolean
}

type rolesType = 'manager' | 'employee' | "customer";

type customerHomeType = {
    cars_new: CarType[]
    cars_random: CarType[]
}

type reservationsType = {
    end_date: string
    id_reservation: number
    start_date: string
    status_reservation: number
    time_reservation: string
    type_reservation: number,
    customer?: customerType,
    car: CarType
}

type customerType = {
    first_name: string
    id_number: string
    last_name: string
    phone: string
}

type customerTemporaryReservationsType = {
    end_date: string
    id_reservation: number
    start_date: string
    status_reservation: string
    remaining_time: {
        mint: number
        second: number
    } | null
    type_reservation: string,
    car: CarType
}
