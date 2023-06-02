import { BrowserRouter, Routes, Route } from "react-router-dom"
import styled from "styled-components"
import UserContext from "./contexts/UserContext"
import SignupPage from "./pages/SignupPage"

export default function App() {
  return (
    <PagesContainer>
      <BrowserRouter>
        <UserContext.Provider value={{}}>
          <Routes>
            <Route path="/" element={<SignupPage />} />
          </Routes>
        </UserContext.Provider>
      </BrowserRouter>
    </PagesContainer>
  )
}

const PagesContainer = styled.main`
    box-sizing: border-box;
`
