import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import index from '../components/Index/flow.vue'
import contract from "../components/Index/contract.vue"
// import login from "../components/Index/login.vue"
import uploading from "../components/Index/uploading.vue"
import info from "../components/Index/info.vue"
import order from "../components/Index/order.vue"
import submit from "../components/Index/submit.vue"
import query from "../components/Index/query.vue"
// import orderInfo from "../components/Index/order-info.vue"
import list from "../components/Index/list.vue"
import tip from "../components/Index/tip.vue"
import detail from "../components/Index/detail.vue"

import firstOrder from "../components/order/first-order.vue"
import secondOrder from "../components/order/second-order.vue"
import thirdOrder from "../components/order/third-order.vue"
import fourthOrder from "../components/order/fourth-order.vue"
import fifthOrder from "../components/order/fifth-order.vue"

import VueDirectiveImagePreviewer from 'vue-directive-image-previewer'
import 'vue-directive-image-previewer/dist/assets/style.css'


Vue.use(VueDirectiveImagePreviewer)
Vue.use(Router)
export default new Router({
  base: '/mobile/',
  mode: 'history',
  routes: [
    {path: '/', redirect: '/flow/:loginOpen/:areaid' },
    // {path: '/login', name:'login', component: login},
    {path: '/flow/:loginOpen/:areaid',name: 'flow',component: index},
    {path: '/contract',name: 'contract',component: contract},
    {path: '/uploading',name: 'uploading',component: uploading},
    {path: '/info',name: 'info',component: info},
    {path: '/order',name: 'order',component: order},
    {path: '/submit/:orderNum',name: 'submit',component: submit},
    {path: '/query/:orderNum',name: 'query',component: query},
    // {path: '/orderInfo', name:'orderInfo', component:orderInfo},
    {path: '/list/:loginOpen', name: 'list', component: list},
    {path:'/tip',name:'tip',component:tip},
		{path:'/detail/:orderNum',name:'detail',component:detail},

    {path: '/firstOrder',name: 'firstOrder',component: firstOrder},
    {path: '/secondOrder',name: 'secondOrder',component: secondOrder},
    {path: '/thirdOrder',name: 'thirdOrder',component: thirdOrder},
    {path: '/fourthOrder',name: 'fourthOrder',component: fourthOrder},
    {path: '/orderInfo',name: 'orderInfo',component: fifthOrder}
  ]
})

