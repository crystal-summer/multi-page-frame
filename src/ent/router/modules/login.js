const login = {
  path: '/login',
  name: 'login',
  component: () => import('@/ent/views/login/index.vue'),
  meta: {
    title: '登录'
  }
}

export default login
