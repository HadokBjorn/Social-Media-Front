import { BrowserRouter, Routes, Route } from "react-router-dom"
import styled from "styled-components"
import UserContext from "./contexts/UserContext"
import SignupPage from "./pages/SignupPage"
import LoginPage from "./pages/LoginPage"
import TimelinePage from "./pages/TimelinePage"
import UserPage from "./pages/UserPage"

export default function App() {
  return (
    <PagesContainer>
      <BrowserRouter>
        <UserContext.Provider value={{}}>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/sign-up" element={<SignupPage />} />
            <Route path="/timeline" element={ <TimelinePage /> } />
            <Route path="/user/:id" element={<UserPage/>}/>
          </Routes>
        </UserContext.Provider>
      </BrowserRouter>
    </PagesContainer>
  )
}

const PagesContainer = styled.main`
    box-sizing: border-box;
`
