import styled from "styled-components"
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import MenuBarComponent from "../components/MenuBarComponent";

export default function UserPage() {

    const [posts, setPosts]= useState([])
    const [followed, setFollowed]= useState(false)
    const [idfollow, setIdfollow]= useState(0)
    const [disabled, setDisabled]= useState(false)
    const [user,setUser]= useState([])
    const logged = JSON.parse(localStorage.getItem("user"))
    const params= useParams()

    useEffect(() => {
        console.log(params)
        const url1 = `${process.env.REACT_APP_API_URL}/user/${params.id}`
        const url2 = `${process.env.REACT_APP_API_URL}/followed`
        const body = {user_id: Number(params.id), follower_id: logged.id }
        axios
          .get(url1)
          .then((res) => {setPosts(res.data);
            setUser(res.data[res.data.length -1])})
          .catch((err) => console.log(err.message));
        
        let promise = axios.post(url2, body)
        promise.then((res)=> {if(Number(res.data) !== 0){
            setFollowed(true);
            setIdfollow(Number(res.data));
            console.log(res.data)
        }})
        promise.catch((err) => console.log(err.message))

      }, [logged.id, params]);

    const navigate = useNavigate()

    console.log(posts)



    function Follow(){
        if (followed){
            setDisabled(true)
            console.log(idfollow)
            const body= {id: idfollow}
            const url = `${process.env.REACT_APP_API_URL}/unfollow`
            const promise= axios.post(url, body)
            promise.then((res)=> {setFollowed(false);
            setDisabled(false);
        })
            promise.catch((err)=> alert("A operação não pode ser realizada, tente novamente!"))
        }
        else{
            setDisabled(true)
            const body= {user_id: params.id, follower_id: logged.id}
            const url = `${process.env.REACT_APP_API_URL}/follow`
            const promise= axios.post(url, body)
            promise.then((res)=> {setFollowed(true);
            setIdfollow(res.data);
            setDisabled(false);
        console.log(res.data)})
            promise.catch((err)=> alert("A operação não pode ser realizada, tente novamente!"))
        }
    }

    return (
        <Screen>
            <MenuBarComponent image={logged.image}/>
            <ContainerTimeline>
                <HeaderTimeline>
                     <h1>{user?.username}'s posts</h1>
                     <FollowButton disabled={disabled} follow={followed} onClick={Follow}>{!followed ? "Follow"  : "Unfollow"}</FollowButton>
                </HeaderTimeline>
                    {
                        posts?.map((i) => (
                            <Posts key={i.id}>
                                <img src={user?.image} alt="profile"/>
                                <PostInfos>
                                    <h2>{user?.username}</h2>
                                    <p>{i.description}</p>
                                    <PostLink>
                                        <img src="img/link.png"  alt="link"/>
                                    </PostLink>
                                </PostInfos>
                            </Posts>
                        ))
                    }

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
