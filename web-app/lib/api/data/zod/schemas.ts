import { z } from 'zod';

export const registerSchema = z.object({
  username: z.string().min(3, "يجب أن يكون اسم المستخدم مكونًا من 3 أحرف على الأقل").max(20, "يجب أن يكون اسم المستخدم مكونًا من 20 حرفًا كحد أقصى"),
  first_name: z.string().min(3, "يجب أن يكون الاسم الأول مكونًا من 3 أحرف على الأقل").max(20, "يجب أن يكون الاسم الأول مكونًا من 20 حرفًا كحد أقصى"),
  last_name: z.string().min(3, "يجب أن يكون اسم العائلة مكونًا من 3 أحرف على الأقل").max(20, "يجب أن يكون اسم العائلة مكونًا من 20 حرفًا كحد أقصى"),
  email: z.string().email("يجب أن يكون البريد الإلكتروني صالحًا ( @.[gmail,email].com)").min(3, "يجب أن يكون اسم العائلة مكونًا من 3 أحرف على الأقل").max(20, "يجب أن يكون اسم العائلة مكونًا من 20 حرفًا كحد أقصى"),
  phone: z.string().regex(/^09\d{8}$/, { message: "رقم الهاتف السوري غير صالح. يجب أن يبدأ بـ '09' ويتكون من 10 أرقام." }),
  id_number: z.string().regex(/^\d{9}$/, { message: "رقم الهوية السورية غير صالح. يجب أن يتكون من 9 أرقام.", }),
  id_front_image: z.instanceof(File, { message: "صورة الوجه الأمامي للهوية  مطلوب" }),
  id_back_image: z.instanceof(File, { message: "صورة الوجه الخلفي للهوية  مطلوب" }),
  driving_license_image: z.instanceof(File, { message: "صورة شهادة القيادة مطلوبة" }),
  password: z.string().min(8, 'يجب أن تكون كلمة المرور مكونة من 8 أحرف على الأقل').max(20, "يجب أن تكون كلمة المرور مكونة من 20 حرفًا كحد أقصى"),
  confirm_password: z.string().min(8, 'يجب أن تكون كلمة المرور المؤكدة مكونة من 8 أحرف على الأقل').max(20, "يجب أن تكون كلمة المرور المؤكدة مكونة من 20 حرفًا كحد أقصى"),
}).refine((data) => data.password === data.confirm_password, {
  message: "كلمتا المرور غير متطابقتين",
  path: ["confirm_password"], // Set the path to confirmPassword to show the error there
});

export type registerSchemaType = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  username: z.string().min(3, "يجب أن يكون اسم المستخدم مكونًا من 3 أحرف على الأقل").max(20, "يجب أن يكون اسم المستخدم مكونًا من 20 حرفًا كحد أقصى"),
  password: z.string().min(8, 'يجب أن تكون كلمة المرور مكونة من 8 أحرف على الأقل').max(20, "يجب أن تكون كلمة المرور مكونة من 20 حرفًا كحد أقصى"),
});

export type LoginSchema = z.infer<typeof loginSchema>;

export const updateCarSchema = z.object({
  brand: z.string().min(1, 'العلامة التجارية مطلوبة').max(100, "يجب أن تكون العلامة التجارية مكونة من 100 أحرف كحد أقصى"),
  model: z.string().min(1, 'النموذج مطلوب').max(100, "يجب أن يكون النموذج مكونًا من 100 أحرف كحد أقصى"),
  category: z.string({ message: "الفئة مطلوبة" }),
  status: z.string({ message: "الحالة مطلوبة" }),
  description: z.string({ message: 'الوصف مطلوب' }).min(30, "يجب أن يكون الوصف مكونًا من 30 حرف كحد أدنى").max(1000, "يجب أن يكون الوصف مكونًا من 1000 حرف كحد أقصى"),
  is_available_daily: z.boolean(),
  is_available_monthly: z.boolean(),
  is_available_yearly: z.boolean(),
  daily_rent_price: z.number().nonnegative('يجب أن يكون سعر الإيجار اليومي رقمًا إيجابيًا').optional(),
  monthly_rent_price: z.number().nonnegative('يجب أن يكون سعر الإيجار الشهري رقمًا إيجابيًا').optional(),
  yearly_rent_price: z.number().nonnegative('يجب أن يكون سعر الإيجار السنوي رقمًا إيجابيًا').optional(),
  image1: z.instanceof(File, { message: "الصورة الأولى للسيارة مطلوبة" }).or(z.string()),
  image2: z.instanceof(File, { message: "الصورة الثانية للسيارة مطلوبة" }).or(z.string()),
  image3: z.instanceof(File, { message: "الصورة الثالثة للسيارة مطلوبة" }).or(z.string()),
}).refine((data) => {
  if (data.is_available_daily && !data.daily_rent_price) {
    return false;
  }
  return true;
}, {
  message: "سعر الإيجار اليومي مطلوب عندما تكون السيارة متاحة للإيجار اليومي",
  path: ["daily_rent_price"],
}).refine((data) => {
  if (data.is_available_monthly && !data.monthly_rent_price) {
    return false;
  }
  return true;
}, {
  message: "سعر الإيجار الشهري مطلوب عندما تكون السيارة متاحة للإيجار الشهري",
  path: ["monthly_rent_price"],
}).refine((data) => {
  if (data.is_available_yearly && !data.yearly_rent_price) {
    return false;
  }
  return true;
}, {
  message: "سعر الإيجار السنوي مطلوب عندما تكون السيارة متاحة للإيجار السنوي",
  path: ["yearly_rent_price"],
});

export type UpdateCarSchema = z.infer<typeof updateCarSchema>;

export const addCarSchema = z.object({
  brand: z.string().min(1, 'العلامة التجارية مطلوبة').max(100, "يجب أن تكون العلامة التجارية مكونة من 100 أحرف كحد أقصى"),
  model: z.string().min(1, 'النموذج مطلوب').max(100, "يجب أن يكون النموذج مكونًا من 100 أحرف كحد أقصى"),
  category: z.string({ message: "الفئة مطلوبة" }),
  description: z.string({ message: 'الوصف مطلوب' }).min(30, "يجب أن يكون الوصف مكونًا من 30 حرف كحد أدنى").max(1000, "يجب أن يكون الوصف مكونًا من 1000 حرف كحد أقصى"),
  is_available_daily: z.boolean(),
  is_available_monthly: z.boolean(),
  is_available_yearly: z.boolean(),
  daily_rent_price: z.number({ message: "سعر الإيجار اليومي مطلوب" }).nonnegative('يجب أن يكون سعر الإيجار اليومي رقمًا إيجابيًا').optional(),
  monthly_rent_price: z.number({ message: "سعر الإيجار الشهري مطلوب" }).nonnegative('يجب أن يكون سعر الإيجار الشهري رقمًا إيجابيًا').optional(),
  yearly_rent_price: z.number({ message: "سعر الإيجار السنوي مطلوب" }).nonnegative('يجب أن يكون سعر الإيجار السنوي رقمًا إيجابيًا').optional(),
  image1: z.instanceof(File, { message: "الصورة الأولى للسيارة مطلوبة" }),
  image2: z.instanceof(File, { message: "الصورة الثانية للسيارة مطلوبة" }),
  image3: z.instanceof(File, { message: "الصورة الثالثة للسيارة مطلوبة" }),
}).refine((data) => {
  if (data.is_available_daily && !data.daily_rent_price) {
    return false;
  }
  return true;
}, {
  message: "سعر الإيجار اليومي مطلوب عندما تكون السيارة متاحة للإيجار اليومي",
  path: ["daily_rent_price"],
}).refine((data) => {
  if (data.is_available_monthly && !data.monthly_rent_price) {
    return false;
  }
  return true;
}, {
  message: "سعر الإيجار الشهري مطلوب عندما تكون السيارة متاحة للإيجار الشهري",
  path: ["monthly_rent_price"],
}).refine((data) => {
  if (data.is_available_yearly && !data.yearly_rent_price) {
    return false;
  }
  return true;
}, {
  message: "سعر الإيجار السنوي مطلوب عندما تكون السيارة متاحة للإيجار السنوي",
  path: ["yearly_rent_price"],
});

export type AddCarSchema = z.infer<typeof addCarSchema>;

export const addEmployeeSchema = z.object({
  first_name: z.string().min(3, "يجب أن يكون الاسم الأول مكونًا من 3 أحرف على الأقل").max(20, "يجب أن يكون الاسم الأول مكونًا من 20 حرفًا كحد أقصى"),
  last_name: z.string().min(3, "يجب أن يكون اسم العائلة مكونًا من 3 أحرف على الأقل").max(20, "يجب أن يكون اسم العائلة مكونًا من 20 حرفًا كحد أقصى"),
  email: z.string().email("يجب أن يكون البريد الإلكتروني صالحًا ( @.[gmail,email].com)").min(3, "يجب أن يكون اسم العائلة مكونًا من 3 أحرف على الأقل").max(20, "يجب أن يكون اسم العائلة مكونًا من 20 حرفًا كحد أقصى"),
  username: z.string().min(3, "يجب أن يكون اسم المستخدم مكونًا من 3 أحرف على الأقل").max(20, "يجب أن يكون اسم المستخدم مكونًا من 20 حرفًا كحد أقصى"),
  account_type: z.enum(['manager', 'employee', "customer"]),
  phone: z.string().regex(/^09\d{8}$/, { message: "رقم الهاتف السوري غير صالح. يجب أن يبدأ بـ '09' ويتكون من 10 أرقام." }),
  password: z.string().min(8, 'يجب أن تكون كلمة المرور مكونة من 8 أحرف على الأقل').max(20, "يجب أن تكون كلمة المرور مكونة من 20 حرفًا كحد أقصى"),
  confirm_password: z.string().min(8, 'يجب أن تكون كلمة المرور المؤكدة مكونة من 8 أحرف على الأقل').max(20, "يجب أن تكون كلمة المرور المؤكدة مكونة من 20 حرفًا كحد أقصى"),
}).refine((data) => data.password === data.confirm_password, {
  message: "كلمتا المرور غير متطابقتين",
  path: ["confirm_password"], // Set the path to confirmPassword to show the error there
});

export type AddEmployeeSchemaType = z.infer<typeof addEmployeeSchema>;

export const updateEmployeeSchema = z.object({
  first_name: z.string().min(3, "يجب أن يكون الاسم الأول مكونًا من 3 أحرف على الأقل").max(20, "يجب أن يكون الاسم الأول مكونًا من 20 حرفًا كحد أقصى"),
  last_name: z.string().min(3, "يجب أن يكون اسم العائلة مكونًا من 3 أحرف على الأقل").max(20, "يجب أن يكون اسم العائلة مكونًا من 20 حرفًا كحد أقصى"),
  email: z.string().email("يجب أن يكون البريد الإلكتروني صالحًا ( @.[gmail,email].com)").min(3, "يجب أن يكون اسم العائلة مكونًا من 3 أحرف على الأقل").max(20, "يجب أن يكون اسم العائلة مكونًا من 20 حرفًا كحد أقصى"),
  username: z.string().min(3, "يجب أن يكون اسم المستخدم مكونًا من 3 أحرف على الأقل").max(20, "يجب أن يكون اسم المستخدم مكونًا من 20 حرفًا كحد أقصى"),
  account_type: z.enum(['manager', 'employee', "customer"]),
  is_active: z.boolean(),
  phone: z.string().regex(/^09\d{8}$/, { message: "رقم الهاتف السوري غير صالح. يجب أن يبدأ بـ '09' ويتكون من 10 أرقام." }),
  password: z.string().min(8, 'يجب أن تكون كلمة المرور مكونة من 8 أحرف على الأقل').max(20, "يجب أن تكون كلمة المرور مكونة من 20 حرفًا كحد أقصى").optional(),
  confirm_password: z.string().min(8, 'يجب أن تكون كلمة المرور المؤكدة مكونة من 8 أحرف على الأقل').max(20, "يجب أن تكون كلمة المرور المؤكدة مكونة من 20 حرفًا كحد أقصى").optional(),
}).refine((data) => (data.password === data.confirm_password), {
  message: "كلمتا المرور غير متطابقتين",
  path: ["confirm_password"], // Set the path to confirmPassword to show the error there
});

export type UpdateEmployeeSchemaType = z.infer<typeof updateEmployeeSchema>;

export const addOfficeSchema = z.object({
  name: z.string()
    .min(3, "يجب أن يكون اسم المكتب مكونًا من 3 أحرف على الأقل")
    .max(20, "يجب أن يكون اسم المكتب مكونًا من 20 حرفًا كحد أقصى"),
  location: z.string()
    .min(3, "يجب أن يكون موقع المكتب مكونًا من 3 أحرف على الأقل")
    .max(20, "يجب أن يكون موقع المكتب مكونًا من 20 حرفًا كحد أقصى"),
  phone_number_1: z.string()
    .regex(/^09\d{8}$/, {
      message: "رقم الهاتف السوري غير صالح. يجب أن يبدأ بـ '09' ويتكون من 10 أرقام."
    }),
  phone_number_2: z.string()
    .regex(/^09\d{8}$/, {
      message: "رقم الهاتف السوري غير صالح. يجب أن يبدأ بـ '09' ويتكون من 10 أرقام."
    }),
  image: z.instanceof(File, { message: "صورة المكتب مطلوبة" }).or(z.string()),
  status_office: z.boolean({message: "حالة المكتب مطلوبة"})
});

export type AddOfficeSchemaType = z.infer<typeof addOfficeSchema>

export const addOfficeAccountSchema = z.object({
  first_name: z.string().min(3, "يجب أن يكون الاسم الأول مكونًا من 3 أحرف على الأقل").max(20, "يجب أن يكون الاسم الأول مكونًا من 20 حرفًا كحد أقصى"),
  last_name: z.string().min(3, "يجب أن يكون اسم العائلة مكونًا من 3 أحرف على الأقل").max(20, "يجب أن يكون اسم العائلة مكونًا من 20 حرفًا كحد أقصى"),
  email: z.string().email("يجب أن يكون البريد الإلكتروني صالحًا ( @.[gmail,email].com)").min(3, "يجب أن يكون اسم العائلة مكونًا من 3 أحرف على الأقل").max(20, "يجب أن يكون اسم العائلة مكونًا من 20 حرفًا كحد أقصى"),
  username: z.string().min(3, "يجب أن يكون اسم المستخدم مكونًا من 3 أحرف على الأقل").max(20, "يجب أن يكون اسم المستخدم مكونًا من 20 حرفًا كحد أقصى"),
  account_type: z.enum(['manager', 'employee']),
  is_active: z.boolean({message: "حالة الحساب مطلوبة"}),
  phone: z.string().regex(/^09\d{8}$/, { message: "رقم الهاتف السوري غير صالح. يجب أن يبدأ بـ '09' ويتكون من 10 أرقام." }),
  password: z.string().min(8, 'يجب أن تكون كلمة المرور مكونة من 8 أحرف على الأقل').max(20, "يجب أن تكون كلمة المرور مكونة من 20 حرفًا كحد أقصى"),
  confirm_password: z.string().min(8, 'يجب أن تكون كلمة المرور المؤكدة مكونة من 8 أحرف على الأقل').max(20, "يجب أن تكون كلمة المرور المؤكدة مكونة من 20 حرفًا كحد أقصى"),
}).refine((data) => data.password === data.confirm_password, {
  message: "كلمتا المرور غير متطابقتين",
  path: ["confirm_password"], // Set the path to confirmPassword to show the error there
});

export type AddOfficeAccountSchemaType = z.infer<typeof addOfficeAccountSchema>;

 export const editOfficeAccountSchema = z.object({
   first_name: z.string().min(3, "يجب أن يكون الاسم الأول مكونًا من 3 أحرف على الأقل").max(20, "يجب أن يكون الاسم الأول مكونًا من 20 حرفًا كحد أقصى"),
   last_name: z.string().min(3, "يجب أن يكون اسم العائلة مكونًا من 3 أحرف على الأقل").max(20, "يجب أن يكون اسم العائلة مكونًا من 20 حرفًا كحد أقصى"),
   email: z.string().email("يجب أن يكون البريد الإلكتروني صالحًا ( @.[gmail,email].com)").min(3, "يجب أن يكون اسم العائلة مكونًا من 3 أحرف على الأقل").max(20, "يجب أن يكون اسم العائلة مكونًا من 20 حرفًا كحد أقصى"),
   username: z.string().min(3, "يجب أن يكون اسم المستخدم مكونًا من 3 أحرف على الأقل").max(20, "يجب أن يكون اسم المستخدم مكونًا من 20 حرفًا كحد أقصى"),
   account_type: z.enum(['manager', 'employee']),
   is_active: z.boolean({message: "حالة الحساب مطلوبة"}),
   phone: z.string().regex(/^09\d{8}$/, { message: "رقم الهاتف السوري غير صالح. يجب أن يبدأ بـ '09' ويتكون من 10 أرقام." }),
   password: z.string().min(8, 'يجب أن تكون كلمة المرور مكونة من 8 أحرف على الأقل').max(20, "يجب أن تكون كلمة المرور مكونة من 20 حرفًا كحد أقصى").nullable(),
   confirm_password: z.string().min(8, 'يجب أن تكون كلمة المرور المؤكدة مكونة من 8 أحرف على الأقل').max(20, "يجب أن تكون كلمة المرور المؤكدة مكونة من 20 حرفًا كحد أقصى").nullable(),
 }).refine((data) => (data.password === data.confirm_password), {
   message: "كلمتا المرور غير متطابقتين",
   path: ["confirm_password"],  
 });

 export type EditOfficeAccountSchemaType = z.infer<typeof editOfficeAccountSchema>;
