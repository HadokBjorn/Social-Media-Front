import axios from "axios";
import styled from "styled-components";
export default function ModalComponent({postId, setDeletePost, token}){
    function deletePost(e){
        e.preventDefault()
        const url = `${process.env.REACT_APP_API_URL}/posts/${postId}`
        const config = {headers: {Authorization: `Bearer ${token}`}}
        axios.delete(url, config)
            .then(()=>{
                setDeletePost(false)
            })
            .catch((err)=>{
                console.log(err)
                setDeletePost(false)
                alert("Houve um erro ao tentar deletar seu post, tente novamente")
            })
    }

    return(
        <ModalContainer>
            <Modal onSubmit={deletePost}>
                <h2>Are you sure you want to delete this post?</h2>
                <ButtonContainer>
                    <button onClick={()=>setDeletePost(false)} className="cancel">No, go back</button>
                    <button type="submit" className="delete">Yes, delete it</button>
                </ButtonContainer>
            </Modal>

        </ModalContainer>
    )
}

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
    width: 60%;
    height: 50%;
    background-color: #333333;
    border-radius: 50px;
    display: flex;
    gap:40px;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    h2{
        width: 80%;
        font-family: 'Lato';
        font-style: normal;
        font-weight: 700;
        font-size: 34px;
        line-height: 41px;
        text-align: center;

        color: #FFFFFF;
    }
`
const ButtonContainer = styled.div`
    display: flex;
    align-items: center;
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