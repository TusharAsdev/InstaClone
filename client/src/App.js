import React,{useEffect,createContext,useReducer,useContext} from 'react'
import Navbar from './components/Navbar'
import "./App.css"
import {BrowserRouter,Route,Routes,useNavigate} from 'react-router-dom'
import Home from './components/screens/Home'
import Signin from './components/screens/SignIn'
import Profile from './components/screens/Profile'
import Signup from './components/screens/Signup'
import SubscribesUserPosts from './components/screens/SubscribesUserPosts'
import UserProfile from './components/screens/UserProfile'
import CreatePost from './components/screens/CreatePost' 
import {reducer,initialState} from './reducers/userReducer.js'


export const UserContext = createContext()

const Routing = () =>{
  const Navigate = useNavigate()
  const {state,dispatch} = useContext(UserContext)
  useEffect(()=>{
    const user =  JSON.parse(localStorage.getItem("user"))
    if(user){
      dispatch({type:"USER",payload:user})
    }
      else{
          Navigate('/signin')
      }
  },[])
  return (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Signin/>} />
        <Route exact path="/profile" element={<Profile/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/create" element={<CreatePost/>} />
        <Route path="/profile/:userid" element={<UserProfile/>} />
        <Route path="/myfollowingpost" element={<SubscribesUserPosts/>} />
      </Routes>
  )
}


function App() {
  const [state,dispatch] = useReducer(reducer,initialState)
  return (
    <UserContext.Provider value={{state,dispatch}}>
      <BrowserRouter>
        <Navbar />
        <Routing/>
      </BrowserRouter>
    </UserContext.Provider>
  )
}

export default App;
