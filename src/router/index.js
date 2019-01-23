
import login from '@/components/login'
import index from '@/components/index'
import Table from '@/components/nav/table'
import From from '@/components/nav/from'

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


