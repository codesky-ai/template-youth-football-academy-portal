/**
 * دالات مساعدة لدعم اللغة العربية واتجاه النص من اليمين إلى اليسار
 */

// تحديد الاتجاه بناءً على اللغة
export const getTextDirection = (lang: string = 'ar'): 'rtl' | 'ltr' => {
  const rtlLanguages = ['ar', 'he', 'fa', 'ur', 'yi']
  return rtlLanguages.includes(lang) ? 'rtl' : 'ltr'
}

// تحديد محاذاة النص
export const getTextAlign = (lang: string = 'ar'): 'right' | 'left' => {
  return getTextDirection(lang) === 'rtl' ? 'right' : 'left'
}

// دالة لعكس ترتيب الصفوف للقوائم RTL
export const reverseForRTL = <T>(array: T[], isRTL: boolean = true): T[] => {
  return isRTL ? [...array].reverse() : array
}

// فئات CSS للاتجاه
export const directionClasses = {
  rtl: {
    textAlign: 'text-right',
    marginStart: 'ms-',
    marginEnd: 'me-',
    paddingStart: 'ps-',
    paddingEnd: 'pe-',
    borderStart: 'border-s-',
    borderEnd: 'border-e-',
    roundedStart: 'rounded-s-',
    roundedEnd: 'rounded-e-'
  },
  ltr: {
    textAlign: 'text-left',
    marginStart: 'ml-',
    marginEnd: 'mr-',
    paddingStart: 'pl-',
    paddingEnd: 'pr-',
    borderStart: 'border-l-',
    borderEnd: 'border-r-',
    roundedStart: 'rounded-l-',
    roundedEnd: 'rounded-r-'
  }
}

// دالة للحصول على فئات CSS حسب الاتجاه
export const getDirectionClasses = (lang: string = 'ar') => {
  const dir = getTextDirection(lang)
  return directionClasses[dir]
}

// تحويل التاريخ إلى التنسيق العربي
export const formatDateArabic = (date: string | Date): string => {
  const d = new Date(date)
  return d.toLocaleDateString('ar-SA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

// تحويل الوقت إلى التنسيق العربي
export const formatTimeArabic = (time: string): string => {
  return new Date(`2000-01-01T${time}`).toLocaleTimeString('ar-SA', {
    hour: '2-digit',
    minute: '2-digit'
  })
}

// تحويل الأرقام إلى الأرقام العربية الهندية (اختياري)
export const toArabicNumerals = (str: string): string => {
  const arabicNumerals = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩']
  return str.replace(/[0-9]/g, (match) => arabicNumerals[parseInt(match)])
}

// تحويل الأرقام العربية إلى اللاتينية
export const toLatinNumerals = (str: string): string => {
  const arabicToLatin: { [key: string]: string } = {
    '٠': '0', '١': '1', '٢': '2', '٣': '3', '٤': '4',
    '٥': '5', '٦': '6', '٧': '7', '٨': '8', '٩': '9'
  }
  return str.replace(/[٠-٩]/g, (match) => arabicToLatin[match] || match)
}

// تهيئة RTL للعنصر
export const setupRTL = () => {
  document.dir = 'rtl'
  document.documentElement.lang = 'ar'
  document.body.className += ' rtl font-arabic'
}

// فئات مفيدة لـ Tailwind CSS مع RTL
export const rtlClasses = {
  container: 'w-full mx-auto px-4 sm:px-6 lg:px-8',
  flexRow: 'flex flex-row-reverse items-center',
  flexCol: 'flex flex-col',
  grid: 'grid gap-4',
  textInput: 'w-full px-3 py-2 text-right border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500',
  button: 'px-4 py-2 rounded-md font-medium transition-colors duration-200',
  card: 'bg-white rounded-lg shadow-md p-6 border border-gray-200',
  modal: 'fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex items-center justify-center',
  dropdown: 'absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-50'
}