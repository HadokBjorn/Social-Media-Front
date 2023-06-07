import styled from "styled-components"
import {IoIosArrowDown, IoIosArrowUp} from "react-icons/io"
import { AiOutlineSearch } from 'react-icons/ai';
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { DebounceInput } from 'react-debounce-input';
import axios from "axios";
import { Link } from "react-router-dom";

export default function MenuBarComponent({image}){
    const navigate = useNavigate()
    const [openDropdown, setOpenDropdown] = useState(false)
    const [busca, setBusca]= useState("")
    const [result, setResult]= useState([])
    
    function logout(){
        localStorage.clear()
        navigate("/")
    }

    function Search(event){
        setBusca(event.target.value)
        const url = `${process.env.REACT_APP_API_URL}/search`
        if( busca.length >= 3){
            console.log(busca)
            axios.post(url, {search: busca})
            .then((res)=>{
                setResult(res.data)
            })
            .catch((err)=>{
                console.log(err)
            })
        }
    }
    
    return(
        <Header>
            <h1>linkr</h1>
            <SearchContainer>
            <Sear as={DebounceInput}
             debounceTimeout={300}
             type="text"
             placeholder={'Search for people and friends'}
             onChange={Search}/>
             {result.length > 0 ? <Container>
                {result.map((i) => <ResultBox>
                    <Link to={`user/${i.id}`}>
                        <img src={i.image} alt="profile"/>
                        <div>{i.username}</div>
                    </Link>
                </ResultBox> )}
             </Container> : <div></div>}
             <MagnifyingGlass>{AiOutlineSearch}</MagnifyingGlass>
            </SearchContainer>
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
                src={image} 
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

const Sear= styled.input`
  width: 560px;
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
    color: black;
  };`;

  const Container = styled.div`
  top: 100%;
  background-color: gray;
  border-radius: 0 0 8px 8px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  padding: 8px;
  @media (max-width: 768px){
    width: 100%;
    margin: 0 auto;
    margin-top: -6px;
  }
`;

const SearchContainer= styled.div `
display:flex;
flex-direction:column;`

const ResultBox= styled.div `
width: 560px;
display:flex;
flex-direction:row;
img{
    width:30px;
    height:30px;
    border-radius:8px;
    margin-left:5px;
};
div{
  font-weight: 400;
  font-family: 'Lato';
  font-size:medium;
  color: black;
}`;

const MagnifyingGlass= styled.div `
font-size: 30px;
top: 8px;
right: 10px;
cursor: pointer;
display: flex;
justify-content: center;
align-items: center;
z-index: 1;
@media (max-width: 768px){  
top: 15px;
right: 10px;
}`