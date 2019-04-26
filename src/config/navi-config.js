window.NAVI_CONFIG = [
  {
    title: '组件',
    name: 'Components',
    icon: 'appstore',
    children: [
      {
        title: '扩展图标',
        path: '/icon',
        name: 'ExIcon',
        component: () => import('../views/components/ExIcon.vue'),
      },
      {
        title: '图表插件',
        path: '/chart',
        name: 'Chart',
        component: () => import('../views/components/Chart.vue'),
      },
      {
        title: '数据字典',
        path: '/dict',
        name: 'DicSelect',
        component: () => import('../views/components/DicSelect.vue'),
      },
      {
        title: '抽屉',
        path: '/drawer',
        name: 'DrawerTable',
        component: () => import('../views/components/DrawerTable.vue'),
      },
      {
        title: '富文本编辑器',
        path: '/veditor',
        name: 'VEditorTable',
        component: () => import('../views/components/VEditorTable.vue'),
      },
    ]
  },
  {
    title: '过滤器',
    name: 'Filters',
    icon: 'filter',
    children: [
      {
        title: '数据字典转换',
        path: '/dictFilter',
        name: 'DictFilter',
        component: () => import('../views/filters/DictFilter.vue'),
      },
      {
        title: '时间转换',
        path: '/timeFilter',
        name: 'TimeFilter',
        component: () => import('../views/filters/TimeFilter.vue'),
      },
    ]
  }
];
window.NAVI_CONFIG.defaultPath = '/icon';
