export const carCategoryParser = (cat: number): string => {
    switch (cat) {
        case 1:
            return 'فاخرة'
        case 2:
            return 'اقتصادية'
        case 3:
            return 'رياضية'
        case 4:
            return 'شاحنة خفيفة (بيك أب)'
        case 5:
            return 'كهربائية'
        default:
            return 'Unknown'
    }
}

export const carStatusParser = (status: number): string => {
 
    switch (status) {
        case 1:
            return 'متاحة'
        case 2:
            return 'حجز مؤقت'
        case 3:
            return 'محجوزة'
        case 4:
            return 'منتهية الصلاحية'
       
        default:
            return 'Unknown'
    }
}

export const reservationParser = (type: number): string => {
 
    switch (type) {
        case 1:
            return 'يومي'
        case 2:
            return 'شهري'
        case 3:
            return 'سنوي'
       
        default:
            return 'Unknown'
    }
}