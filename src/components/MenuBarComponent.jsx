import styled from "styled-components"
import {IoIosArrowDown, IoIosArrowUp} from "react-icons/io"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { DebounceInput } from 'react-debounce-input';

export default function MenuBarComponent(){
    const navigate = useNavigate()
    const [openDropdown, setOpenDropdown] = useState(false)
    
    function logout(){
        localStorage.clear()
        navigate("/")
    }
    
    return(
        <Header>
            <h1>linkr</h1>
            <Search as={DebounceInput}
             debounceTimeout={300}
             type="text"
             placeholder={viewWindow <= 768 ? 'Search for people and friends' : 'Search for people'}/>
            <Logout>
                <IconContainer>

                {
                    openDropdown?
                    <IoIosArrowUp
                    onClick={()=>setOpenDropdown(false)} 
                    size={25} 
                    color="#FFF"
                    cursor={"pointer"}
                    />
                    :
                    <IoIosArrowDown 
                    onClick={()=>setOpenDropdown(true)} 
                    size={25} 
                    color="#FFF"
                    cursor={"pointer"}
                    />
                }

                </IconContainer>

                <img 
                src="https://miro.medium.com/v2/resize:fit:1400/1*g09N-jl7JtVjVZGcd-vL2g.jpeg" 
                alt="imagem do usuário"
                />
                
                {
                    openDropdown?
                    <DropdownOptions>
                        <li onClick={logout}>Logout</li>
                    </DropdownOptions>
                    :
                    ""
                }
            </Logout>
            {
                openDropdown?
                <ClickOut onClick={()=>setOpenDropdown(false)}/>:
                ""
            }
        </Header>
    )
}

const Header = styled.div`
    width: 100%;
    height: 72px;
    background: #151515;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    top: 0;

    h1{
        font-family: 'Passion One';
        font-style: normal;
        font-weight: 700;
        font-size: 49px;
        line-height: 54px;
        letter-spacing: 0.05em;
        color: #FFFFFF;
        margin-left: 20px;
    }
`
const Logout = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    gap: 12px;
    img{
        width: 53px;
        height: 53px;
        border-radius: 26.5px;
        margin-right: 20px;
    }
`
const DropdownOptions = styled.ul`
    position: absolute;
    width: 100%;
    height: 43px;
    bottom: -99%;
    z-index: 4;
    background: #171717;
    border-radius: 0px 0px 20px 20px;

    display: flex;
    align-items: center;

    li{
        width: inherit;
        color: #FFF;
        text-align: center;

        font-family: 'Lato';
        font-style: normal;
        font-weight: 700;
        font-size: 15px;
        line-height: 18px;

        letter-spacing: 0.05em;

        cursor: pointer;
    }
`
const IconContainer = styled.div`
    height: auto;
    width: auto;
`
const ClickOut = styled.article`
    position: fixed;
    z-index: 3;
    top: 0;bottom:0;left:0;right:0;
`

const Search= styled.input`
  width: 563px;
  max-width: 563px;
  height: 45px;
  border-radius: 8px;
  border: none;
  font-style: normal;
  font-weight: 400;
  font-size: 19px;
  line-height: 23px;
  font-family: 'Lato';
  padding-left: 12px;
  padding-right: 40px;
  position: relative;
  z-index: 1;
  :focus{
    outline: none;
  }
  &::placeholder{
    color: white;
  };`;