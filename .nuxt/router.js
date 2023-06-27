import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _009c405a = () => interopDefault(import('../pages/Form.vue' /* webpackChunkName: "pages/Form" */))
const _4ed7928a = () => interopDefault(import('../pages/inspire.vue' /* webpackChunkName: "pages/inspire" */))
const _24e73064 = () => interopDefault(import('../pages/LoginForm.vue' /* webpackChunkName: "pages/LoginForm" */))
const _28682a26 = () => interopDefault(import('../pages/RegistroForm.vue' /* webpackChunkName: "pages/RegistroForm" */))
const _ee342474 = () => interopDefault(import('../pages/ValForm.vue' /* webpackChunkName: "pages/ValForm" */))
const _348fa21a = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

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
    component: _009c405a,
    name: "Form"
  }, {
    path: "/inspire",
    component: _4ed7928a,
    name: "inspire"
  }, {
    path: "/LoginForm",
    component: _24e73064,
    name: "LoginForm"
  }, {
    path: "/RegistroForm",
    component: _28682a26,
    name: "RegistroForm"
  }, {
    path: "/ValForm",
    component: _ee342474,
    name: "ValForm"
  }, {
    path: "/",
    component: _348fa21a,
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
