export const isRequired = val => {
  if (val === null) return 'فیلد اجباری است';
  else if (typeof val === 'string') {
    if (!val || !val.trim().length) return 'فیلد اجباری است';
  }
  return true;
};
export const isSSN = val => {
  if (val === null) return true;
  if (val.length !== 10) return 'شماره ملی معتبر نیست';
  else return true;
};
export const isEnterSSN = val => {
  if (val === null || val === '') return true;
  if (val.length !== 10) return 'شماره ملی معتبر نیست';
  else return true;
};
export const isMobile = val => {
  if (val === null) return 'موبایل معتبر نیست (با ۰۹ شروع کنید)';
  const valStr = `${val}`;
  if (
    !valStr ||
    !valStr.trim().length ||
    !valStr.startsWith('09') ||
    valStr.length !== 11
  )
    return 'موبایل معتبر نیست (با ۰۹ شروع کنید)';
  return true;
};
export const isEnterMobile = val => {
  if (val === null || val === '') return true;
  const valStr = `${val}`;
  if (!valStr.startsWith('09') || valStr.length !== 11)
    return 'موبایل معتبر نیست (با ۰۹ شروع کنید)';
  return true;
};
export const isEmail = val => {
  if (val === null) return 'ایمیل معتبر نیست';
  const regEx =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!regEx.test(val)) return 'ایمیل معتبر نیست';
  return true;
};
export const isEnterEmail = val => {
  if (val === null || val === '') return true;
  const regEx =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!regEx.test(val)) return 'ایمیل معتبر نیست';
  return true;
};
export const isCreditCard = val => {
  // for ####-####-####-#### format
  if (val === null) return 'شماره کارت معتبر نیست';
  else if (!/([0-9]{4}-){3}[0-9]{4}/gim.test(val))
    return 'شماره کارت معتبر نیست';
  return true;
};
export const isShaba = val => {
  if (val === null) return 'شماره شبا معتبر نیست (شماره شبا ۲۲رقم است)';
  else if (!/^[0-9]{22}$/gim.test(val))
    return 'شماره شبا معتبر نیست (شماره شبا ۲۲رقم است)';
  return true;
};
export const isMax = (val, max) => {
  if (+val > +max) {
    const msg1 = 'حداکثر عدد قابل انتخاب';
    const msg2 = max;
    const msg3 = 'است';
    return msg1 + msg2 + msg3;
  }
  return true;
};
export const minLength = (val, minLength) => {
  const errorMsg1 = 'حداقل کاراکتر وارد شده باید';
  const errorMsg2 = minLength;
  const errorMsg3 = 'عدد باشد';
  const errorMsg = errorMsg1 + errorMsg2 + errorMsg3;
  if (val === null) return errorMsg;
  else {
    const valStr = `${val}`;
    if (!valStr || valStr.trim().length < minLength) return errorMsg;
  }
  return true;
};
export const isSamePassword = (val1, val2) => {
  if (val1 === val2) return true;
  return 'مقدار وارد شده با مقدار رمز عبور جدید یکی نیست';
};
export const is6MinLength = val => {
  const errorMsg = 'حداقل تعداد کاراکتر وارد شده باید ۶ باشد';
  if (val === null) return errorMsg;
  else {
    const valStr = `${val}`;
    if (!valStr || valStr.trim().length < 6) return errorMsg;
  }
  return true;
};
