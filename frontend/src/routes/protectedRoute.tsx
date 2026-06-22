
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router'
import type { RootState } from '../redux/store'
import { useEffect } from 'react'
import { api } from '../services/api'
import {success, failed} from '../redux/state/loginSlice'

type Props = {
  children: React.ReactNode
}
const ProtectedRoute = () => {
  const isLogin = useSelector((state: RootState) => state.login.login_success)
  const dispatch = useDispatch()

  useEffect(() => {
    if(isLogin){
      api.get("/auth/verify-token", {withCredentials: true})
        .then(res => {
          console.log(res)
        })
        .catch(err => {
          if(err.response?.status == 401){
            console.log("status code: ", err.response?.status)
            dispatch(failed())
          }
          console.log(err)
        })
    }else{
      console.log("Login out")
    }
  }, [])

  return isLogin ? <Outlet /> : <Navigate to={'/login'} replace />

}
export default ProtectedRoute