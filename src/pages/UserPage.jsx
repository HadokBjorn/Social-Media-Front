import styled from "styled-components"
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import MenuBarComponent from "../components/MenuBarComponent";

export default function UserPage() {

    const [posts, setPosts]= useState([])

    useEffect(() => {
        const url = `${process.env.REACT_APP_URL_API}/user/:id`
        axios
          .get(url)
          .then((res) => setPosts(res.data))
          .catch((err) => console.log(err.message));

      }, []);

    const navigate = useNavigate()


    let user= posts.pop()

    return (
        <Screen>
            <MenuBarComponent/>
            <ContainerTimeline>
                <h1>{user?.username}'s posts</h1>
                <Posts>
                    {posts?.map((i) => <div><img src="https://miro.medium.com/v2/resize:fit:1400/1*g09N-jl7JtVjVZGcd-vL2g.jpeg" />
                    <PostInfos>
                        <h2>{user?.username}</h2>
                        <p1>{i.description}</p1>
                        <PostLink>
                            <img src="img/link.png" />
                        </PostLink>
                    </PostInfos></div>)}
    
                </Posts>
            </ContainerTimeline>
        </Screen>
    )
}

const Screen = styled.div`
background-color: #4D4D4D;
`
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
ion-icon{
    color: white;
    font-size: 40px;
    margin-right: 10px;
}
img{
    width: 53px;
    height: 53px;
    border-radius: 26.5px;
    margin-right: 20px;
}
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
    color: #949494;
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
color: #949494;
`
const Form = styled.div`
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
    margin-top: 20px;
    margin-bottom: 7px;
}
p1{
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