import styled from "styled-components";
import { BsSend } from "react-icons/bs"
import { useEffect, useRef, useState } from "react";
import axios from "axios";



function CommentsComponent({setOpenComments, postId}){
    const user = JSON.parse(localStorage.getItem("user"))
    const[notComments,setNotComments] = useState(null)
    const [updateComments, setUpdateComments] = useState(false);
    const [comments, setComments] = useState(null)
    const inputRef = useRef();


    useEffect(()=>{
        const url = `${process.env.REACT_APP_API_URL}/posts/${postId}/comments`
        const config = {headers: {Authorization: `Bearer ${user.token}`}}
        axios.get(url, config)
        .then((res)=>{
            console.log(res.data)
            setComments(res.data)
        })
        .catch((err)=>{
            console.log({message: err.response.data, status:err.response.status})
            if(err.response.status===404){
                setNotComments(err.response.data)
            }
        })

        
    },[postId, user.token, updateComments])

    function getCommentValue(){
       return {comment: inputRef.current.value}
    }

    function postCommentRequest(){
        const url = `${process.env.REACT_APP_API_URL}/posts/${postId}/comments`
        const config = {headers: {Authorization: `Bearer ${user.token}`}}
        const body = getCommentValue();
        axios.post(url,body, config)
        .then((res)=>{
            console.log(res.data)
            inputRef.current.value="";
            setUpdateComments(true)
        })
        .catch((err)=>{
            console.log({message: err.response.data, status:err.response.status})
        })
    }
    function sendComment (e){
        e.preventDefault()
        postCommentRequest()
    }

   
    return(
        <CommentsContainer>
            {
                comments?
                
                comments.map((comment)=>(
                    <li key={comment.id}>
                        <img className="user-image" src={comment.image} alt=""/>
                        <div>
                            <h2>{comment.username} {comment.user_id===user.id?<span>• post's author</span>:""}</h2>
                            <p>{comment.comment}</p>
                        </div>
                    </li>
                ))
                :
                <li>
                    <div>
                        <p>{notComments}...</p>
                    </div>
                </li>
            }
            

            <li className="container-user-comment">
                <img className="user-image" src={user.image} alt=""/>
                <form onSubmit={sendComment} className="comment-input-container">
                    <input type="text" placeholder="write a comment..."  autoFocus ref={inputRef}/>
                    <button type="submit">
                        <BsSend size={16} color="#fff"/>
                    </button>
                </form>
            </li>
        </CommentsContainer>
    )
    
}

export default CommentsComponent;

const CommentsContainer = styled.ul`
    list-style: none;
    border-radius: 16px;
    padding: 10px 15px;

    animation: get-in 1s ease-in-out;

    @keyframes get-in {
        0%{
            transform: translateY(-40%);
        }
        100%{
            transform: translateY(0);
        }
    }

    .container-user-comment{
        border-bottom: none;
    }

    li{
        border-bottom: 1px solid #353535;
        transform: rotate(-0.1deg);
        padding: 16px 0;

        width: 100%;
        height: auto;
        display: flex;
        align-items: center;
        gap: 18px;

        .comment-input-container{
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            background-color: #252525;
            border-radius: 8px;
            height: 39px;

            input{
                background-color: #252525;
                border-radius: 8px;
                width: 95%;
                height: inherit;
                border: none;
                padding: 11px 15px;

                font-family: 'Lato';
                font-style: italic;
                font-weight: 400;
                font-size: 14px;
                line-height: 17px;
                letter-spacing: 0.05em;
                color: #fff;
            }
            button{
                width: 30px;
                height: 100%;
                border: none;
                padding: 0;
                background-color: transparent;
                display: flex;
                align-items: center;
                justify-content: center;
            }
        }

        div{
            width: 100%;
            display: flex;
            flex-direction: column;
            gap: 5px;
            h2{
                font-family: 'Lato';
                font-style: normal;
                font-weight: 700;
                font-size: 14px;
                line-height: 17px;
                color: #F3F3F3;
            }
            p{
                font-family: 'Lato';
                font-style: normal;
                font-weight: 400;
                font-size: 14px;
                line-height: 17px;
                color: #ACACAC;
            }
            span{
                font-family: 'Lato';
                font-style: normal;
                font-weight: 400;
                font-size: 14px;
                line-height: 17px;
                color: #565656;

            }
        }

    }
`