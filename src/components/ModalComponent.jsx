import styled from "styled-components";
export default function ModalComponent(){
    return(
        <ModalContainer>
            <Modal>
                <h2>Are you sure you want to delete this post?</h2>
                <ButtonContainer>
                    <button>No, go back</button>
                    <button>Yes, delete it</button>
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
    width: 50%;
    height: 50%;
    background-color: #333333;
    border-radius: 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    font-family: 'Lato';
    font-style: normal;
    font-weight: 700;
    font-size: 34px;
    line-height: 41px;
    text-align: center;

    color: #FFFFFF;
`
const ButtonContainer = styled.div`
    display: flex;
    align-items: center;

    font-family: 'Lato';
    font-style: normal;
    font-weight: 700;
    font-size: 18px;
    line-height: 22px;
    /* identical to box height */


    color: #1877F2;
`