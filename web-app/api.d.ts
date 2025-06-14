
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
    id_car: number
    brand: string
    model: string
    description: string
    category: number
    category_disaply: string
    is_available_daily: boolean
    is_available_monthly: boolean
    is_available_yearly: boolean
    is_for_sale: boolean
    daily_rent_price: number
    monthly_rent_price: number
    yearly_rent_price: number
    sale_price: number
    image1: string
    image2: string
    image3: string
    status: number | string
    status_disaply: string
    owner_office: null | string
    owner_customer: null | string
}

type CarReversionsType = {
    start_date: string
    end_date: string
    type_reservation: number
    time_reservation: string
}
type CarDetailsType = {
    id_car: number
    brand: string
    model: string
    description: string
    category: number
    category_disaply: string
    is_available_daily: boolean
    is_available_monthly: boolean
    is_available_yearly: boolean
    is_for_sale: boolean
    daily_rent_price: number
    monthly_rent_price: number
    yearly_rent_price: number
    sale_price: number
    image1: string
    image2: string
    image3: string
    status: number | string
    status_disaply: string
    owner_office: null | OfficeType
    owner_customer: null | {
        id: number
        first_name: string
        last_name: string
        phone: string,
        email: string
    }
}

type CarDetailsPageType = {
    car: CarDetailsType,
    reservations: CarReversionsType[]
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
    cars_random: CarType[],
    offices: OfficeType[]
}

type reservationsType = {
    end_date: string
    id_reservation: number
    start_date: string
    status_reservation: string
    time_reservation: string
    type_reservation: string,
    customer?: customerType,
    car: CarType
}

type customerType = {
    first_name: string
    id_number: string
    last_name: string
    phone: string,
    email?: string
    username?: string
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

type OfficeType = {
    id_office: number,
    name: string,
    location: string,
    phone_number_1: string,
    phone_number_2: string,
    image: string,
    status_office: boolean,
    ratings?: number
}

type OfficeManger = {
    id_office_account: number,
    created_at: string,
    updated_at: string,
    user: {
        id: number,
        first_name: string,
        last_name: string,
        email: string,
        username: string,
        phone: string,
        account_type: string,
        is_active: boolean
    }
}

type AdminCustomerType = {
    first_name: string
    last_name: string
    phone: string,
    email: string
    username: string,
    id_customer: number
}

type AdminCustomerDetailsType = {
    first_name: string
    id_number: string
    last_name: string
    phone: string
    email: string
    username: string
    id_customer: number
    id_user: number
    is_active: boolean
    id_front_image: string
    id_back_image: string
    driving_license_image: string
}

type CategoryType = {
    name: string
    id_car_type: number
}

type MangerCarsListResponseType = {
    cars: CarType[]
    category_list: CategoryType[]
}

type RatingType = {
    id_office_rating: number,
    customer: string,
    office: string,
    rating: number,
    comment: string,
    created_at: string
}

type OfficeRatingType = {
    total_rating: number,
    ratings: RattingType[]
}

type AllCarsType = {
    cars: CarType[]
    cars_category: CategoryType[]
}

type OfficePageType = {
    office: OfficeType
    cars: CarType[]
}