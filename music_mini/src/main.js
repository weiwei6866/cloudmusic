import Vue from 'vue'
import App from './App.vue'
import router from '@/router'

Vue.config.productionTip = false

import *as api from '@/api'

import { Button,NavBar,Tabbar, TabbarItem,Col, Row,Icon,Search,NoticeBar,Slider,List,Swipe, SwipeItem, Popup, Empty,Divider } from 'vant';
import { Image as VanImage } from 'vant';
// import {Cell,CellGroup} from 'vant';
// Vue.use(Cell); 
// Vue.use(CellGroup); 
Vue.use(VanImage);
Vue.use(Button)
Vue.use(NavBar)
Vue.use(Tabbar)
Vue.use(TabbarItem)
Vue.use(Col);
Vue.use(Row); 
Vue.use(Icon)
Vue.use(Search)
Vue.use(NoticeBar)
Vue.use(Slider)
Vue.use(List )
Vue.use(Swipe )
Vue.use(SwipeItem )
Vue.use( Popup )
Vue.use(  Empty  )
Vue.use(  Divider  )

import musicItem from '@/components/musicItem'
Vue.component(musicItem.name,musicItem)

import commentItem from '@/components/commentItem'
Vue.component(commentItem.name,commentItem)


new Vue({
  router,
  render: h => h(App),
  beforeCreate() {
    Vue.prototype.$bus = this;
    Vue.prototype.$api = api
  },
}).$mount('#app')
