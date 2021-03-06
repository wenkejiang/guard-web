import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/register',
    component: () => import('@/views/register/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/guard',
    children: [{
      path: 'guard',
      name: 'Guard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: '模型' }
    }]
  },

  {
    path: '/api',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Form',
        component: () => import('@/views/construction/index'),
        meta: { title: 'API测试平台', icon: 'API' }
      }
    ]
  },

  {
    path: '/control',
    component: Layout,
    // redirect: '/monitor/table',
    name: '监控平台',
    meta: { title: '监控平台', icon: '监控' },
    children: [
      {
        path: 'monitor',
        name: '业务接口监控',
        component: () => import('@/views/monitor/index'),
        meta: { title: '业务接口监控', icon: '监控' }
      }
    ]
  },

  {
    path: '/pertest',
    component: Layout,
    children: [
      {
        path: 'pertest',
        name: 'performance',
        component: () => import('@/views/construction/index'),
        meta: { title: '性能平台', icon: '性能测试' }
      }
    ]
  },

  {
    path: '/manager',
    component: Layout,
    children: [
      {
        path: 'manager',
        name: 'manager',
        component: () => import('@/views/construction/index'),
        meta: { title: '测试管理', icon: '测试管理' }
      }
    ]
  },
  {
    path: '/report',
    component: Layout,
    children: [
      {
        path: 'report',
        name: 'report',
        component: () => import('@/views/construction/index'),
        meta: { title: '报表管理', icon: '数据看板' }
      }
    ]
  },

  {
    path: '/system',
    component: Layout,
    redirect: '/api/user',
    name: 'system',
    meta: { title: '系统管理', icon: '系统管理' },
    children: [
      {
        path: 'user',
        name: 'user',
        component: () => import('@/views/user/index'),
        meta: { title: '用户管理', icon: '用户管理' }
      },
      {
        path: 'email',
        name: 'email',
        component: () => import('@/views/construction/index'),
        meta: { title: '建设中', icon: 'tree' }
      }
    ]
  },

  {
    path: '/log',
    component: Layout,
    children: [
      {
        path: 'log',
        name: 'LOG',
        component: () => import('@/views/construction/index'),
        meta: { title: '迭代日志', icon: '迭代日志' }
      }
    ]
  },

  // {
  //   path: '/form',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       name: 'Form',
  //       component: () => import('@/views/form/index'),
  //       meta: { title: 'Form', icon: 'form' }
  //     }
  //   ]
  // },

  // {
  //   path: '/nested',
  //   component: Layout,
  //   redirect: '/nested/menu1',
  //   name: 'Nested',
  //   meta: {
  //     title: 'Nested',
  //     icon: 'nested'
  //   },
  //   children: [
  //     {
  //       path: 'menu1',
  //       component: () => import('@/views/nested/menu1/index'), // Parent router-view
  //       name: 'Menu1',
  //       meta: { title: 'Menu1' },
  //       children: [
  //         {
  //           path: 'menu1-1',
  //           component: () => import('@/views/nested/menu1/menu1-1'),
  //           name: 'Menu1-1',
  //           meta: { title: 'Menu1-1' }
  //         },
  //         {
  //           path: 'menu1-2',
  //           component: () => import('@/views/nested/menu1/menu1-2'),
  //           name: 'Menu1-2',
  //           meta: { title: 'Menu1-2' },
  //           children: [
  //             {
  //               path: 'menu1-2-1',
  //               component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
  //               name: 'Menu1-2-1',
  //               meta: { title: 'Menu1-2-1' }
  //             },
  //             {
  //               path: 'menu1-2-2',
  //               component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
  //               name: 'Menu1-2-2',
  //               meta: { title: 'Menu1-2-2' }
  //             }
  //           ]
  //         },
  //         {
  //           path: 'menu1-3',
  //           component: () => import('@/views/nested/menu1/menu1-3'),
  //           name: 'Menu1-3',
  //           meta: { title: 'Menu1-3' }
  //         }
  //       ]
  //     },
  //     {
  //       path: 'menu2',
  //       component: () => import('@/views/nested/menu2/index'),
  //       meta: { title: 'menu2' }
  //     }
  //   ]
  // },

  // {
  //   path: 'external-link',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
  //       meta: { title: 'External Link', icon: 'link' }
  //     }
  //   ]
  // },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
