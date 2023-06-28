import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _98f4e46c = () => interopDefault(import('../pages/FirmarForm.vue' /* webpackChunkName: "pages/FirmarForm" */))
const _391cde0a = () => interopDefault(import('../pages/Form.vue' /* webpackChunkName: "pages/Form" */))
const _38fd1493 = () => interopDefault(import('../pages/inspire.vue' /* webpackChunkName: "pages/inspire" */))
const _5195a0b4 = () => interopDefault(import('../pages/LoginForm.vue' /* webpackChunkName: "pages/LoginForm" */))
const _5898334e = () => interopDefault(import('../pages/RegistroForm.vue' /* webpackChunkName: "pages/RegistroForm" */))
const _61c8dd2a = () => interopDefault(import('../pages/ValidarForm.vue' /* webpackChunkName: "pages/ValidarForm" */))
const _79eea2cb = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/FirmarForm",
    component: _98f4e46c,
    name: "FirmarForm"
  }, {
    path: "/Form",
    component: _391cde0a,
    name: "Form"
  }, {
    path: "/inspire",
    component: _38fd1493,
    name: "inspire"
  }, {
    path: "/LoginForm",
    component: _5195a0b4,
    name: "LoginForm"
  }, {
    path: "/RegistroForm",
    component: _5898334e,
    name: "RegistroForm"
  }, {
    path: "/ValidarForm",
    component: _61c8dd2a,
    name: "ValidarForm"
  }, {
    path: "/",
    component: _79eea2cb,
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
