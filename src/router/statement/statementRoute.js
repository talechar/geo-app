export const statement = [
  {
    path: '/statement',
    name: 'statement-view',
    component: () => import('@/views/StatementPage.vue'),
    children: [
      {
        path: 'add',
        name: 'statement-add',
        meta: { title: 'Создание заявки ' },
        component: () => import('@/components/Forms/StatementForm.vue'),
      },
      {
        path: ':id',
        name: 'statement-edit',
        meta: { title: 'Редактирование заявки' },
        component: () => import('@/components/Forms/StatementForm.vue'),
      },
    ],
  },
];
