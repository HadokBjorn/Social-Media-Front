import axios from "axios";
import { useState } from "react";
import styled from "styled-components";
import { Oval } from "react-loader-spinner";
function ModalComponent({postId, setDeletePost, token}){
    const [loading, setLoading] = useState(false)

    function deletePost(e){
        setLoading(true)
        e.preventDefault()
        const url = `${process.env.REACT_APP_API_URL}/posts/${postId}`
        const config = {headers: {Authorization: `Bearer ${token}`}}
        axios.delete(url, config)
            .then(()=>{
                setDeletePost(false)
                setLoading(false)
            })
            .catch((err)=>{
                setLoading(false)
                console.log(err)
                setDeletePost(false)
                alert("Houve um erro ao tentar deletar seu post, tente novamente")
            })
    }

    return(
        <ModalContainer>
            {
                loading?
                <Modal onSubmit={deletePost}>
                    <Oval
                        height={80}
                        width={80}
                        color="#4fa94d"
                        wrapperStyle={{}}
                        wrapperClass=""
                        visible={true}
                        ariaLabel='oval-loading'
                        secondaryColor="#fff"
                        strokeWidth={3}
                        strokeWidthSecondary={3}
                    />
                </Modal>
                :
                <Modal onSubmit={deletePost}>
                    <h2>Are you sure you want to delete this post?</h2>
                    <ButtonContainer>
                        <button onClick={()=>setDeletePost(false)} className="cancel">No, go back</button>
                        <button type="submit" className="delete">Yes, delete it</button>
                    </ButtonContainer>
                </Modal>
            }

        </ModalContainer>
    )
}

export default ModalComponent;

const ModalContainer = styled.article`
    background-color: rgb(255,255,255, 0.8);
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`
const Modal = styled.form`
    width: 95%;
    height: auto;
    background-color: #333333;
    border-radius: 50px;
    display: flex;
    gap:40px;
    padding: 40px 0;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    h2{
        width: 100%;
        font-family: 'Lato';
        font-style: normal;
        font-weight: 700;
        font-size: 30px;
        line-height: 41px;
        text-align: center;

        color: #FFFFFF;
    }

    @media screen and (min-width: 765px) {
        width: 65%;
        h2{
            width: 80%;
            font-size: 34px;

        }
        
    }
`
const ButtonContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    gap: 27px;


    button{
        font-family: 'Lato';
        font-style: normal;
        font-weight: 700;
        font-size: 18px;
        line-height: 22px;

        height: 37px;
        border-radius: 5px;
        border: none;
    }

    .cancel{
        background-color: #fff;
        color: #1877F2;
    }
    .delete{
        background-color: #1877F2;
        color: #fff;
    }
`