const map = {
  path: '/map/:x/:y/:zoom',
  name: 'map-view',
  component: () => import('@/views/MapPage.vue'),
};

export default map;
