import styled from "styled-components"
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import MenuBarComponent from "../components/MenuBarComponent";

export default function UserPage() {

    const [posts, setPosts]= useState([])
    const [followed, setFollowed]= useState(false)

    useEffect(() => {
        const url = `${process.env.REACT_APP_API_URL}/user/:id`
        axios
          .get(url)
          .then((res) => setPosts(res.data))
          .catch((err) => console.log(err.message));

      }, []);

    const navigate = useNavigate()


    let user= posts.pop()

    function Follow(){
        if (followed){
            setFollowed(false)
        }
        else{
            setFollowed(true) 
        }
    }

    return (
        <Screen>
            <MenuBarComponent/>
            <ContainerTimeline>
                <HeaderTimeline>
                     <h1>{user?.username}'s posts</h1>
                     <FollowButton follow={followed} onClick={Follow}>{!followed ? "Follow"  : "Unfollow"}</FollowButton>
                </HeaderTimeline>
                <Posts>
                    {posts?.map((i) => <div><img src={user?.image} alt="profile"/>
                    <PostInfos>
                        <h2>{user?.username}</h2>
                        <p1>{i.description}</p1>
                        <PostLink>
                            <img src="img/link.png"  alt="link"/>
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
    margin-left:200px;
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
`;

const HeaderTimeline= styled.div `
display:flex;
flex-direction:row;`;

const FollowButton= styled.button `
width: 112px;
    height: 31px;
    background: ${(props) => props.follow ? `white` : `#1877F2`};
    border-radius: 5px;
    font-family: 'Lato';
    font-style: normal;
    font-weight: 700;
    font-size: 14px;
    line-height: 17px;
    color: ${(props) => props.follow ? `#1877F2` : `white`};;
    border: none;
    margin-top:77px;
    margin-left:100px;`;
