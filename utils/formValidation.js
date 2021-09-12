export const isRequired = val => {
  if (val === null) return 'فیلد اجباری است'
  else if (typeof val === 'string') {
    if (!val || !val.trim().length) return 'فیلد اجباری است'
  }
  return true
}
export const isSSN = val => {
  if (val === null) return true
  if (val.length !== 10) return 'شماره ملی معتبر نیست'
  else return true
}
export const isMobile = val => {
  if (val === null) return 'موبایل معتبر نیست (با ۰۹ شروع کنید)'
  const valStr = `${val}`
  if (
    !valStr ||
    !valStr.trim().length ||
    !valStr.startsWith('09') ||
    valStr.length !== 11
  )
    return 'موبایل معتبر نیست (با ۰۹ شروع کنید)'
  return true
}
export const isEmail = val => {
  if (val === null) return 'ایمیل معتبر نیست'
  const regEx =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  if (!regEx.test(val)) return 'ایمیل معتبر نیست'
  return true
}
export const isCreditCard = val => {
  // for ####-####-####-#### format
  if (val === null) return 'شماره کارت معتبر نیست'
  else if (!/([0-9]{4}-){3}[0-9]{4}/gim.test(val))
    return 'شماره کارت معتبر نیست'
  return true
}
export const isShaba = val => {
  if (val === null) return 'شماره شبا معتبر نیست (شماره شبا ۲۲رقم است)'
  else if (!/^[0-9]{22}$/gim.test(val))
    return 'شماره شبا معتبر نیست (شماره شبا ۲۲رقم است)'
  return true
}
