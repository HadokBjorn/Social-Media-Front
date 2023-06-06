import { useRef, useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import MenuTitleComponent from "../components/MenuTitleComponent";
import axios from "axios";

export default function SignupPage(){
    const navigate = useNavigate()
    const [buttonDisabled, setButtonDisabled]=useState(false)
    const email = useRef()
    const password = useRef()
    const username = useRef()
    const imageUrl = useRef()

    const form = {email: "", password:"", username: "", image:"" }

    function getInputValues(){
        form.email = email.current.value;
        form.password = password.current.value;
        form.username = username.current.value;
        form.image = imageUrl.current.value;
        if (form.email==="" || form.password==="" || form.username==="" || form.image==="" ){
            alert("Todos os campos devem ser preenchidos!")
            return false;
        }else{
            return true
        }   
    }

    function requestSignup(){
        const url = `${process.env.REACT_APP_API_URL}/signup`
        axios.post(url, form)
            .then(()=>{
                navigate("/")
            })
            .catch((err)=>{
                console.log(err)
                setButtonDisabled(false)
                if(err.response.status===409){
                    alert("Esse e-mail já está sendo usado!")
                }
            })
    }

    function register(e){
        e.preventDefault()

        if(getInputValues()){

            setButtonDisabled(true)
            requestSignup()
        }
    }
    
    return(
        <PageContainer>
            <MenuTitleComponent/>
            <form onSubmit={register}>
                <input placeholder="e-mail" type="email" required ref={email} />
                <input placeholder="password" type="password" required ref={password} />
                <input placeholder="username" type="text" required ref={username} />
                <input placeholder="picture url" type="url" required ref={imageUrl} />
                <button type="submit" disabled={buttonDisabled}>Sign Up</button>

                <Link to="/">Switch back to log in</Link>
            </form>
        </PageContainer>
    )
}

const PageContainer = styled.section`
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;

    @media screen and (min-width: 765px) {
        flex-direction: row;
        align-items: unset;
    }
    
    form{
        *{
            font-family: 'Oswald';
            font-style: normal;
            font-weight: 700;
            font-size: 22px;
            line-height: 33px;
        }

        box-sizing: border-box;
        width: 100%;
        height: auto;
        padding: 20px;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap:15px;

        @media screen and (min-width: 765px) {
            width: 70%;
            padding: 3%;
            justify-content: center;
        }

    }
    input{

        width: 100%;
        height: 55px;
        padding: 0 17px ;

        border: none;

        background: #FFFFFF;
        border-radius: 6px;

        :focus {
            border-color: #1877F2;
        }
    }
    input::placeholder{
        color: #9F9F9F;
        font-weight: 700;
    }

    button{
        width: 100%;
        height: 55px;
        border: none;
        color: #FFF;
        border-radius: 6px;
    }
    a{
        color: #FFF;
        font-family: 'Lato';
        font-weight: 400;
        font-size: 20px;
        line-height: 24px;
    }
`