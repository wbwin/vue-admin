import Mock from "mockjs"

const loginUsers=[
  {
    id:1,
    userName:"admin",
    password:"admin",
    name:'叼毛'
  }
]
const Users=[];
for(var i=0;i<86;i++){
  Users.push(Mock.mock({
    id:Mock.Random.guid(),
    name:Mock.Random.cname(),
    address:Mock.Random.county(true),
    brithday:Mock.Random.date('yyyy-MM-dd'),
  }))
}
export {loginUsers,Users};

