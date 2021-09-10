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
// export const isMobile = val => {
//     if() return 'شماره موبایل وارد شده معتبر نیست'
//     return true
// }
