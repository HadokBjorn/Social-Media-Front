import { useRef, useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import MenuTitleComponent from "../components/MenuTitleComponent";
import axios from "axios";

export default function LoginPage(){
    const navigate = useNavigate()
    const [buttonDisabled, setButtonDisabled]=useState(false)
    const email = useRef()
    const password = useRef()
    

    const form = {email: "", password:""}

    function getInputValues(){
        form.email = email.current.value;
        form.password = password.current.value;
        if (form.email==="" || form.password==="" ){
            alert("Todos os campos devem ser preenchidos!")
            return false;
        }else{
            return true
        }   
    }

    function requestLogin(){
        const url = `${process.env.REACT_APP_API_URL}/login`
        axios.post(url, form)
            .then((res)=>{
                localStorage.setItem("user", JSON.stringify(res.data))
                navigate("/timeline")
            })
            .catch((err)=>{
                console.log(err)
                setButtonDisabled(false)
                if(err.response.status===401){
                    alert("Senha ou e-mail incorreto!")
                }
            })
    }

    function register(e){
        e.preventDefault()

        if(getInputValues()){

            setButtonDisabled(true)
            requestLogin()
        }
    }
    
    return(
        <PageContainer>
            <MenuTitleComponent/>
            <form onSubmit={register}>
                <input data-test="email" placeholder="e-mail" type="email" required ref={email} />
                <input data-test="password" placeholder="password" type="password" required ref={password} />
                
                <button data-test="login-btn" type="submit" disabled={buttonDisabled}>Log In</button>

                <Link data-test="sign-up-link" to="/sign-up">First time? Create an account!</Link>
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