import Cookie from 'js-cookie';
export default {
  register(vuexContext, { mobile, password }) {
    vuexContext.commit('registerStart');
    try {
      const token = 'token';
      const userId = '123';
      const expireDate = Date.now() + 1 * 24 * 60 * 60 * 1000;
      localStorage.setItem('token', token);
      localStorage.setItem('userId', userId);
      localStorage.setItem('expireDate', expireDate);
      Cookie.set('token', token, { expires: 365 });
      Cookie.set('userId', userId, { expires: 365 });
      Cookie.set('expireDate', expireDate, { expires: 365 });
      vuexContext.commit('registerSuccess', {
        successMsg: 'ثبت نام با موفقیت انجام شد',
        token,
        userId,
        expireDate,
      });
      return '/dashboard';
    } catch (err) {
      vuexContext.commit('registerError', {
        errorMsg:
          err.response?.data?.message || 'خطایی در حین ثبت نام اتفاق افتاد',
      });
    }
  },
  login(vuexContext, { mobile, password }) {
    vuexContext.commit('loginStart');
    try {
      const token = 'token';
      const userId = '123';
      const expireDate = Date.now() + 1 * 24 * 60 * 60 * 1000;
      localStorage.setItem('token', token);
      localStorage.setItem('userId', userId);
      localStorage.setItem('expireDate', expireDate);
      Cookie.set('token', token, { expires: 365 });
      Cookie.set('userId', userId, { expires: 365 });
      Cookie.set('expireDate', expireDate, { expires: 365 });
      vuexContext.commit('loginSuccess', {
        successMsg: ' ورود به حساب کاربری با موفقیت انجام شد',
        token,
        userId,
        expireDate,
      });
      return '/dashboard';
    } catch (err) {
      vuexContext.commit('loginError', {
        errorMsg:
          err.response?.data?.message ||
          'خطایی در حین ورود به حساب کاربری اتفاق افتاد',
      });
    }
  },
  logout(vuexContext) {
    vuexContext.commit('logoutStart');
    try {
      Cookie.remove('token');
      Cookie.remove('userId');
      Cookie.remove('expireDate');
      if (process.client) {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('expireDate');
      }
      vuexContext.commit('logoutSuccess', { successMsg: '' });
    } catch (err) {
      vuexContext.commit('logoutError', {
        errorMsg:
          err.response?.data?.message ||
          'خطایی در حین خروج از حساب کاربری رخ داد',
      });
    }
  },
  autoLogin(vuexContext, { req }) {
    let token = null;
    let userId = null;
    let expireDate = null;
    if (process.server) {
      const cookie = req.headers.cookie;
      if (cookie) {
        token = cookie
          ?.split(';')
          .find(c => c.trim().startsWith('token='))
          ?.split('token=')[1];
        userId = cookie
          ?.split(';')
          .find(c => c.trim().startsWith('userId='))
          ?.split('userId=')[1];
        expireDate = cookie
          ?.split(';')
          .find(c => c.trim().startsWith('expireDate='))
          ?.split('expireDate=')[1];
      }
    } else if (process.client) {
      token = localStorage.getItem('token');
      userId = localStorage.getItem('userId');
      expireDate = localStorage.getItem('expireDate');
    }
    if (!token || !userId || !expireDate || expireDate < Date.now())
      vuexContext.dispatch('logout');
    else
      vuexContext.commit('loginSuccess', {
        successMsg: '',
        token,
        userId,
        expireDate,
      });
  },
};
