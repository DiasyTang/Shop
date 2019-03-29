import Vue from 'vue'
import Router from 'vue-router'

const mystation = () => import('@/components/my-station/work-station')
const login = () => import('@/components/login')
const home = () => import('@/components/home')

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: 'mystation',
      meta: {
        hideInMenu: true,
        title: '首页',
      },
      component: home,
      children: [
        {
          path: 'mystation',
          name: 'mystation',
          meta: {
            title: '工作区',
            hideInMenu: true
          },
          component: mystation
        },
        {
          path: 'mystation/sys_setting',
          name: 'sys_setting',
          redirect: 'mystation',
          meta: {
            title: '系统设置'
          },
          component: mystation,
          children: [
            {
              path: 'permission',
              name: 'sys_permission',
              meta: {
                title: '权限管理',
              },
              component: () => import('@/components/my-station/system-setting/permission.vue')
            },
            {
              path: 'role-permission',
              name: 'sys_role-permission',
              meta: {
                title: '角色分配权限'
              },
              component: () => import('@/components/my-station/system-setting/role-permission.vue')
            },
            {
              path: 'role',
              name: 'sys_role',
              meta: {
                title: '角色管理'
              },
              component: () => import('@/components/my-station/system-setting/role.vue')
            },
            {
              path: 'user',
              name: 'sys_user',
              meta: {
                title: '用户管理'
              },
              component: () => import('@/components/my-station/system-setting/user.vue')
            },
            {
              path: 'menu',
              name: 'sys_menu',
              meta: {
                title: '菜单管理',
              },
              component: () => import('@/components/my-station/system-setting/menu.vue')
            },]
        },
        {
          path: 'mystation/business',
          name: 'business',
          redirect: 'mystation',
          component: mystation,
          meta: {
            title: '商城管理',
          },
          children: [
            {
              path: 'good',
              name: 'business_good',
              meta: {
                title: '商品管理'
              },
              component: () => import('@/components/my-station/business/good.vue')
            },
            {
              path: 'order',
              name: 'business_order',
              meta: {
                title: '订单管理'
              },
              component: () => import('@/components/my-station/business/order.vue')
            },
            {
              path: 'order/:orderId',
              name: 'business_orderInfo',
              meta: {
                title: '查看订单详情'
              },
              component: () => import('@/components/my-station/business/orderInfo.vue')
            }]
        },
        {
          path: '/info-export',
          name: 'info-export',
          meta: {
            title: "导出信息",
            hideInMenu: true,
          },
          component: () => import("@/components/info-export/information-export.vue")
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: login,
      meta: {
        requireUnAuth: true,
      }
    },
    {
      path: '/403',
      name: '403',
      component: () => import("@/components/error/403.vue"),
      meta: {
        requireUnAuth: true,
      }
    },
    {
      path: '/404',
      name: '404',
      component: () => import("@/components/error/404.vue"),
      meta: {
        requireUnAuth: true,
      }
    },
    {
      path: '*',
      redirect: '404',
      meta: {
        requireUnAuth: true,
      }
    }
  ]
})
