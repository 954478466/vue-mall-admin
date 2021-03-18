import cookie from 'js-cookie';

const setUserInfo = (userInfo) => cookie.set('userInfo', JSON.stringify(userInfo), {
  expires: 1,
});

const getUserInfo = () => {
  try {
    return JSON.parse(cookie.get('userInfo'));
  } catch (e) {
    return {};
  }
};

const removeUserInfo = () => cookie.remove('userInfo');

export default {
  setUserInfo,
  getUserInfo,
  removeUserInfo,
};
