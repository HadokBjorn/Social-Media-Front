import { BrowserRouter, Routes, Route } from "react-router-dom"
import styled from "styled-components"
import UserContext from "./contexts/UserContext"

export default function App() {
  return (
    <PagesContainer>
      <BrowserRouter>
        <UserContext.Provider value={{}}>
          <Routes>
            <Route path="/" element={{/* <namePage /> */}} />
          </Routes>
        </UserContext.Provider>
      </BrowserRouter>
    </PagesContainer>
  )
}

const PagesContainer = styled.main`
  padding: 25px;
`
