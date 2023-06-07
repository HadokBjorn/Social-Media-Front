import styled from "styled-components"
import axios from "axios";
import { useEffect, useState } from "react";
import MenuBarComponent from "../components/MenuBarComponent";
import {FiTrash} from "react-icons/fi"
import {TiPencil} from "react-icons/ti"

export default function TimelinePage() {

    const [form, SetForm] = useState({ link: "", description: "" })
    const [inputValue, setInputValue] = useState("Muito maneiro esse tutorial de Material UI com React, deem uma olhada!");
    const [editPost, setEditPost]=useState(false)
    const [disabledInput, setDisabledInput] = useState(false)
    const token = localStorage.getItem("token")
    const image = localStorage.getItem("image")

    useEffect(()=>{
        const url = `${process.env.REACT_APP_API_URL}/timeline`
        const config = {headers: {Authorization: `Bearer ${token}`}}
        axios.get(url,config)
            .then((res)=>{
                console.log(res.data)
            })
            .catch((err)=>{
                console.log(err)
            })
    },[token])

  

    function handleForm(e) {
        const { name, value } = e.target
        SetForm({ ...form, [name]: value })
    }

    function publish(e) {
        e.preventDefault()
        const URL = `${process.env.REACT_APP_API_URL}/timeline`
        const config = {headers: {Authorization: `Bearer ${token}`}}
        console.log(form)
        axios.post(URL, form, config)
            .then(res => {
                console.log(res)
                SetForm({ link: "", description: "" })
            })
            .catch(err => alert(err.response.data.message)
            )
    }

    function handleKeyPress(e){
        if (e.key === 'Escape') {
          setEditPost(false)
        }
    };


    function escapeInputEditPost(){
      
          document.addEventListener('keydown', handleKeyPress);
      
          return () => {
            document.removeEventListener('keydown', handleKeyPress);
          };

    }

    function updatePost(postId){
        setDisabledInput(true)

        const url = `${process.env.REACT_APP_API_URL}/posts/${postId}`
        const config = {headers: {Authorization: `Bearer ${token}`}}
        const body = {description: inputValue}
        axios.put(url,body, config)
            .then(()=>{
                setEditPost(false)
            })
            .catch((err)=>{
                console.log(err)
                alert("Não foi possivel salvar as alterações realizadas")
                setDisabledInput(false)
            })
    }

    function handleKeyDown (e,id) {
        if (e.key === 'Enter') {
          e.preventDefault();
          updatePost(id)
        }
      };

    
        

    return (
        <Screen>

            <MenuBarComponent image={image}/>

            <ContainerTimeline>
                <h1>Timeline</h1>
                <WritePost>
                    <img src="https://miro.medium.com/v2/resize:fit:1400/1*g09N-jl7JtVjVZGcd-vL2g.jpeg" alt=""/>
                    <Form onSubmit={publish}>
                        <p>What are you going to share today?</p>
                        <LinkURL
                            name="link"
                            value={form.link}
                            onChange={handleForm}
                            type="url"
                            required
                            placeholder="http://..."
                        />
                        <Tittle
                            name="description"
                            value={form.description}
                            onChange={handleForm}
                            type="text"
                            placeholder="Awesome article about #javascript"
                        />
                        <button type="submit"> Publish </button>
                    </Form>
                </WritePost>
                <Posts>
                    <img src="https://miro.medium.com/v2/resize:fit:1400/1*g09N-jl7JtVjVZGcd-vL2g.jpeg" alt=""/>
                    <PostInfos>
                        <NamePostContainer>
                            <h2>Nome usuário</h2>
                            <TiPencil onClick={()=>{
                                editPost?setEditPost(false):setEditPost(true);
                                escapeInputEditPost();
                                }}
                                size={23} 
                                color="#FFF"
                            />
                            <FiTrash size={23} color="#FFF"/>
                        </NamePostContainer>
                        {
                            editPost?
                                <InputEdition
                                    type="text"
                                    value={inputValue}
                                    onChange={(e)=>setInputValue(e.target.value)}
                                    disabled={disabledInput}
                                    onKeyDown={handleKeyDown}
                                    autoFocus
                                />                            
                            :
                            <p>Muito maneiro esse tutorial de Material UI com React, deem uma olhada!</p>
                        }
                        <PostLink>
                            <img src="img/link.png" alt=""/>
                        </PostLink>
                    </PostInfos>
                </Posts>
            </ContainerTimeline>
        </Screen>
    )
}

const Screen = styled.div`
background-color: #4D4D4D;
`
const ContainerTimeline = styled.div`
display: flex;
flex-direction: column;
align-items: center;
margin-top: 72px;
h1{
    width: 611px;
    font-family: 'Oswald';
    font-style: normal;
    font-weight: 700;
    font-size: 43px;
    line-height: 64px;
    color: #FFFFFF;
    margin-top: 50px;
    margin-bottom: 30px;
}
`
const WritePost = styled.div`
display: flex;
width: 611px;
height: 209px;
background: #FFFFFF;
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
border-radius: 16px;
margin-bottom: 40px;
img{
    width: 50px;
    height: 50px;
    border-radius: 26.5px;
    margin-left: 15px;
    margin-top: 18px;
}
`
const LinkURL = styled.input`
    width: 503px;
    height: 30px;
    background: #EFEFEF;
    border-radius: 5px;
    border: none;
    margin-bottom: 6px;
    font-family: 'Lato';
    font-style: normal;
    font-weight: 300;
    font-size: 15px;
    line-height: 18px;
    color: #111;
`
const Tittle = styled.input`
width: 502px;
height: 66px;
background: #EFEFEF;
border-radius: 5px;
border: none;
font-family: 'Lato';
font-style: normal;
font-weight: 300;
font-size: 15px;
line-height: 18px;
color: #111;
`
const Form = styled.form`
display: flex;
flex-direction: column;
width: 502px;
margin-left: 15px;
margin-top: 18px;
p{
    font-family: 'Lato';
    font-style: normal;
    font-weight: 300;
    font-size: 20px;
    line-height: 24px;
    color: #707070;
    margin-bottom: 10px;
}
button{
    width: 112px;
    height: 31px;
    background: #1877F2;
    border-radius: 5px;
    font-family: 'Lato';
    font-style: normal;
    font-weight: 700;
    font-size: 14px;
    line-height: 17px;
    color: #FFFFFF;
    border: none;
    margin-top: 6px;
    margin-left: 390px;
}
`
const Posts = styled.div`
width: 611px;
height: 276px;
background: #171717;
border-radius: 16px;
margin-bottom: 30px;
display: flex;
img{
    width: 50px;
    height: 50px;
    border-radius: 26.5px;
    margin-left: 15px;
    margin-top: 18px;
}
`
const PostInfos = styled.div`
width: 502px;
margin-left: 15px;
h2{
    width: 502px;
    font-family: 'Lato';
    font-style: normal;
    font-weight: 400;
    font-size: 19px;
    line-height: 23px;
    color: #FFFFFF;
    
}
p{
    width: 502px;
    font-family: 'Lato';
    font-style: normal;
    font-weight: 400;
    font-size: 17px;
    line-height: 20px;
    color: #B7B7B7;
}
`
const PostLink = styled.div`
box-sizing: border-box;
width: 503px;
height: 155px;
border: 1px solid #4D4D4D;
border-radius: 11px;
margin-top: 10px;
img{
    width: 153.44px;
    height: 155px;
    border-radius: 0px 12px 13px 0px;
    margin-bottom: 0px;
    margin-left: 349.56px;
    margin-top: 0px;
}
`
const NamePostContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;

    margin-top: 20px;
    margin-bottom: 7px;
`
const InputEdition = styled.textarea`
    background: #FFFFFF;
    border-radius: 7px;
    width: 100%;
    height: 44px;
    padding: 0 9px;

    overflow: hidden;
    resize: none;
    border: none;
    outline: none;

    font-family: 'Lato';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    color: #4C4C4C;
`