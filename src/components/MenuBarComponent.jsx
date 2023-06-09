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
    const [open, setOpen]= useState(false)
    const [busca, setBusca]= useState("")
    const [result, setResult]= useState([])
    const logged = JSON.parse(localStorage.getItem("user"))
    
    function logout(){
        localStorage.clear()
        navigate("/")
    }
    function Travel(i){
        navigate(`/user/${i.id}`)
    }

    function Search(event){
        setBusca(event.target.value)
        let info=event.target.value
        const url = `${process.env.REACT_APP_API_URL}/search`
        if( info.length >= 3){
            setOpen(true)
            console.log(info)
            axios.post(url, {search: info, id: logged.id.toString()})
            .then((res)=>{
                setResult(res.data)
                console.log(res.data)
            })
            .catch((err)=>{
                console.log(err.message)
            })
        }
    }
    
    return(
        <Header>
            <Link to="/timeline"><h1>linkr</h1></Link>
            <SearchContainer>
                <Sear as={DebounceInput}
                data-test="search"
                debounceTimeout={300}
                type="text"
                placeholder={'Search for people and friends'}
                onChange={Search}/>
                {
                    result.length > 0  && open? 
                        <Container>
                            {
                                result.map((i) => ( i === result[result.length-1] ? <div></div> :
                                <ResultBox data-test="user-search">
                                    <div> <img src={i.image} alt="profile"/></div>
                                    <Link to={`/user/${i.id}`}>
                                        <div>{i.username}</div>
                                    </Link>
                                    <div>{result[result.length-1].includes(i.id) ? "Following" : "" }</div>
                                </ResultBox>) 
                                )
                            }
                        </Container> 
                        : 
                        <div></div>
                }
                
                <MagnifyingGlass>{AiOutlineSearch}</MagnifyingGlass>
                {
                open?
                <ClickOt onClick={()=>setOpen(false)}/>:
                ""
            }
            </SearchContainer>
            <Logout>
                <IconContainer onClick={()=>openDropdown? setOpenDropdown(false):setOpenDropdown(true)}>

                {
                    openDropdown?
                    <IoIosArrowUp
                    size={25} 
                    color="#FFF"
                    cursor={"pointer"}
                    />
                    :
                    <IoIosArrowDown 
                    size={25} 
                    color="#FFF"
                    cursor={"pointer"}
                    />
                }

                </IconContainer>

                <img
                onClick={()=>openDropdown? setOpenDropdown(false):setOpenDropdown(true)}
                data-test="avatar"
                src={image} 
                alt="imagem do usuário"
                />
                
                {
                    openDropdown?
                    <DropdownOptions data-test="menu">
                        <li data-test="logout" onClick={logout}>Logout</li>
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
    position: relative;
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
        object-fit: cover;
        object-position: center;
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
    width: 100%;
    max-width: 560px;
    margin-top:12px;
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
    z-index: 1;
  :focus{
    outline: none;
  }
  &::placeholder{
    color: black;
  };`;

  const Container = styled.div`
  width: 100%;
  max-width:560px;
  background-color: gray;
  margin-top:5px;
  border-radius: 0 0 8px 8px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  padding: 8px;
  z-index:5;
  @media screen and (max-width: 768px){
    width: 100%;
    margin: 0 auto;
    margin-top: -6px;
  }
`;

const SearchContainer= styled.div `
@media screen and (max-width: 765px) {
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    top: 72px;
    input{
        width: 90%;
    }
}
display:flex;
flex-direction:column;
height:100%;
`

const ResultBox= styled.div `
width: 100%;
max-width: 560px;
display:flex;
flex-direction:row;
img{
    width:30px;
    height:30px;
    border-radius:8px;
    margin-left:5px;
    object-fit: cover;
    object-position: center;
};
div{
  font-weight: 400;
  font-family: 'Lato';
  font-size:medium;
  color: black;
  margin-left:3px;
};
z-index:5;`;

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
}`;

const ClickOt = styled.article`
    position: fixed;
    z-index:0;
    top: 0;bottom:0;left:0;right:0;
`