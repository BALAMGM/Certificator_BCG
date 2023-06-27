import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _63af92ac = () => interopDefault(import('../pages/Form.vue' /* webpackChunkName: "pages/Form" */))
const _15d7dc84 = () => interopDefault(import('../pages/inspire.vue' /* webpackChunkName: "pages/inspire" */))
const _2f048152 = () => interopDefault(import('../pages/LoginForm.vue' /* webpackChunkName: "pages/LoginForm" */))
const _b8bc8c06 = () => interopDefault(import('../pages/RegistroForm.vue' /* webpackChunkName: "pages/RegistroForm" */))
const _73acd8e2 = () => interopDefault(import('../pages/ValForm.vue' /* webpackChunkName: "pages/ValForm" */))
const _33e69a08 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/Form",
    component: _63af92ac,
    name: "Form"
  }, {
    path: "/inspire",
    component: _15d7dc84,
    name: "inspire"
  }, {
    path: "/LoginForm",
    component: _2f048152,
    name: "LoginForm"
  }, {
    path: "/RegistroForm",
    component: _b8bc8c06,
    name: "RegistroForm"
  }, {
    path: "/ValForm",
    component: _73acd8e2,
    name: "ValForm"
  }, {
    path: "/",
    component: _33e69a08,
    name: "index"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
