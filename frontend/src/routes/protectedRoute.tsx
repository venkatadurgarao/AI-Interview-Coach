
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router'
import type { RootState } from '../redux/store'
import { useEffect } from 'react'
import { api } from '../api/api'
import { success, failed } from '../redux/state/loginSlice'
import {apis} from '../api/api'

type Props = {
  children: React.ReactNode
}
const ProtectedRoute = () => {
  const isLogin = useSelector((state: RootState) => state.login.login_success)
  // const dispatch = useDispatch()

  // useEffect(() => {
  //   const Verification = async () => {
  //     try{
  //       const res = await apis.verifyToken();
  //     }catch(error){
  //       console.log(error)
  //       dispatch(failed())
  //     }
  //   }
  //   if (isLogin) {
  //     Verification();
  //   } else {
  //     console.log("Login out")
  //   }
  // }, [])

  return isLogin ? <Outlet /> : <Navigate to={'/login'} replace />

}
export default ProtectedRoute