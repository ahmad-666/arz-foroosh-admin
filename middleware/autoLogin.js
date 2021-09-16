export default async context => {
  const req = context.req;
  const vuexStore = context.store;
  await vuexStore.dispatch('auth/autoLogin', { req });
  const isUserAuth = vuexStore.getters['auth/isAuth'] || false;
  const authMeta = context.route?.meta[0]?.auth || false;
  if (authMeta === 'required' && !isUserAuth) {
    context.redirect('/login');
  } else if (authMeta === 'not-required' && isUserAuth) {
    context.redirect('/404');
  } else return null; // continue normal routing
};
