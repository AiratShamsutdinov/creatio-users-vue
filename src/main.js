import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import NewUser from '@/components/NewUser.vue'
import User from '@/components/User.vue'
import Users from '@/components/Users.vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import UUID from 'vue-uuid';
import moment from 'vue-moment';

Vue.prototype.$moment = moment;
Vue.use(NewUser);
Vue.use(User);
Vue.use(Users);
Vue.use(moment);
Vue.use(UUID);
Vue.use(VueRouter);
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

var router = new VueRouter({
    routes: [
      {
        path: "/",
        component: {
          render(c) {
            return c('router-view')
          }
        },
        redirect: {
          name: "users"
        }
      },
      {path: '/users', name: 'users', component: Users },
      {path: '/users/:id', name: 'user' , component: User },
      {path: '/users/new', name: 'newUser' , component: NewUser }
    ]
})

new Vue({
  router: router,
  render: h => h(App),
}).$mount('#app')
