
import login from '@/views/login'
import index from '@/views/index'
import Table from '@/views/nav/table'
import From from '@/views/nav/from'

let routes=[
  {
    path: '/',
    name: 'login',
    component: login
  },
  {
    path:'/',
    name:'导航一',
    component:index,
    iconCls: 'el-icon-message',//图标样式class
    children:[
      {
        path:'/table',
        name:'Table',
        component:Table,
      },
      {
        path:'/from',
        name:'From',
        component:From,
      }
    ]

  }
]
export default routes


