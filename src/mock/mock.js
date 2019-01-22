import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import {loginUsers,Users} from './data';

export default{
  init(){
    const mock=new MockAdapter(axios)
    mock.onGet('/success ').reply(200,{msg:'success'});
    mock.onGet('/error').reply('500',{msg:'failure'});

    mock.onPost('/login').reply(config=>{
      let {username,password}=JSON.parse(config.data)
      return new Promise((resolve,reject)=>{
        let user=null
        setTimeout(()=>{
          let hasUser=loginUsers.some(lu=>{
            if(lu.userName==username&&lu.password==password){
              user=JSON.parse(JSON.stringify(lu))
              user.password=undefined
              return true
            }else{
              return false
            }
          })
          if(hasUser){
            resolve([200,{res:200,msg:'登录成功',data:user}])
          }else{
           resolve([200,{res:500,msg:'登录失败'}])
          }
        },500)
      })

    })
    mock.onGet('/index').reply(config => {

      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            users: Users
          }]);
        }, 1000);
      });
    });
  },

}
