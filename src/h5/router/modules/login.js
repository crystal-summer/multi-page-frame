const login = {
  path: '/login',
  name: 'login',
  component: () => import('@/h5/views/login/index.vue'),
  meta: {
    title: '登录'
  }
}

export default login
