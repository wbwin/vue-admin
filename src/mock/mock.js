import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import {loginUsers,Users} from './data';
let _Users = Users;
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
    mock.onGet('/list').reply(config => {
      let {page,name}=config.params
      let mockUsers=_Users.filter(user=>{
        if(name&&user.name.indexOf(name)==-1)return false
        return true
      })
      let total=mockUsers.length
      mockUsers=mockUsers.filter((u,index)=>index<20*page&&index>=20*(page-1))
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            total:total,
            users: mockUsers
          }]);
        }, 1000);
      });
    });
    mock.onGet('/edit').reply(config => {
      let {id,name,date,sex,address}=config.params
      _Users.some(u=>{
        if(u.id===id){
          u.name=name;
          u.date=date;
          u.sex=sex;
          u.address=address;
          return true
        }
      })
        return new Promise((resolve, reject) => {
          setTimeout(() => {

            resolve([200, {
              code: 200,
              msg: '编辑成功'
            }]);
          }, 500);
        })

    });
    mock.onGet('/delUser').reply(config => {
      let {id}=config.params;
      _Users = _Users.filter(u => u.id !== id);
        return new Promise((resolve, reject) => {
          setTimeout(() => {

            resolve([200, {
              code: 200,
              msg: '删除成功'
            }]);
          }, 500);
        })
    });
    mock.onGet('/delsUser').reply(config => {
      let {ids}=config.params;
      ids = ids.split(',');
      _Users=_Users.filter(u=>!ids.includes(u.id))
      return new Promise((resolve,reject)=>{
        setTimeout(()=>{
          resolve([200,{code:200,msg:'删除成功'}])
        },500)
      })

    });
    mock.onGet('/addUser').reply(config => {
      let {name,date,sex,address}=config.params
      _Users.unshift({
        name:name,
        date:date,
        sex:sex,
        address:address
      })
      return new Promise((resolve,reject)=>{
        setTimeout(()=>{
          resolve([200,{code:200,msg:'新增成功成功'}])
        },500)
      })

    });
  },

}
