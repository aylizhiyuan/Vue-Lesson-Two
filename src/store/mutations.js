//全局的改变state的方法
const mutations = {
  LOGIN:(state,data)=>{
    state.token = data;
    window.sessionStorage.setItem('token',data)
  },
  USERNAME:(state,data)=>{
    state.username = data;
    window.sessionStorage.setItem('username',data);
  },
  //退出的方法
  LOGOUT:(state,data)=>{
    state.token = null;
    window.sessionStorage.removeItem('token');
  }
}
export default mutations
