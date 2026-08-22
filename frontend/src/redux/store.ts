import { configureStore } from '@reduxjs/toolkit'
import  loginSlice from './state/loginSlice'
import sidebarWidthSlice from './state/sidebarWidthSlice'
import snackbarSlice from './state/snackbarSlice'
function loadState() {
    try{
        const localState = localStorage.getItem("reduxState")
        if(!localState){
            return undefined
        }
        return JSON.parse(localState)

    }catch(error){
        return undefined
    }
}
const preloadedState = loadState();
export const store = configureStore({
  reducer: {
    login: loginSlice,
    sidebar: sidebarWidthSlice,
    snackbar: snackbarSlice
  },
//   preloadedState: loadState()
 ...(preloadedState && { preloadedState }),
})

store.subscribe(() =>{
    localStorage.setItem("reduxState" , JSON.stringify(store.getState()))
})



// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch