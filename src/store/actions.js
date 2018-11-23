//全局方法
const actions = {
  UserLogin({commit},data){
    commit('LOGIN',data)
  },
  UserName({commit},data){
    commit('USERNAME',data)
  },
  UserLogout({commit}){
    commit('LOGOUT')
  }
}
export default actions
