const homePage = {
  path: '/homePage',
  name: 'homePage',
  component: () => import('@/ent/views/homePage/index.vue'),
  meta: {
    title: '首页'
  }
}

export default homePage
