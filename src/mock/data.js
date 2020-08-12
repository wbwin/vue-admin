/*
 * @Description: file information
 * @Author: Alex
 * @Date: 2020-08-10 17:52:06
 * @LastEditors: Alex
 * @LastEditTime: 2020-08-11 16:15:23
 */
import Mock from 'mockjs';

const loginUsers = [
  {
    id: 1,
    userName: 'admin',
    password: 'admin',
    name: '叼毛'
  }
];
const Users = [];
for (var i = 0; i < 64; i++) {
  Users.push(
    Mock.mock({
      id: Mock.Random.guid(),
      name: Mock.Random.cname(),
      state: Mock.mock({
        'boolean|1': true
      }).boolean,
      account: Mock.mock({
        regexp: /[a-z][A-Z][0-9]/
      }).regexp
    })
  );
}
export { loginUsers, Users };
