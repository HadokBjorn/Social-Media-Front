import { useRef } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import MenuTitleComponent from "../components/MenuTitleComponent";

export default function SignupPage(){
    const email = useRef()
    const password = useRef()
    const username = useRef()
    const url = useRef()

    function register(e){
        e.preventDefault()
    }
    
    return(
        <PageContainer>
            <MenuTitleComponent/>
            <form onSubmit={register}>
                <input placeholder="e-mail" type="email" ref={email} />
                <input placeholder="password" type="password" ref={password} />
                <input placeholder="username" type="text" ref={username} />
                <input placeholder="picture url" type="url" ref={url} />
                <button type="submit">Sign Up</button>

                <Link to="/login">Switch back to log in</Link>
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