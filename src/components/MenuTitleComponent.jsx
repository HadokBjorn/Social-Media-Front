import styled from "styled-components";

export default function MenuTitleComponent(){
    return (
        <ComponentContainer>
            <div>
                <h1>linkr</h1>
                <h2>save, share and discover
                    the best links on the web
                </h2>
            </div>
        </ComponentContainer>
    )

}

const ComponentContainer = styled.div`

    background-color: #151515;
    color: #FFF;

    width: 100%;
    height: auto;
    padding: 30px;

    display: flex;
    flex-direction: column;
    align-items: center;

    div{
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    

    

    >*{
        font-family: 'Passion One', cursive;
    }
    h1{
        font-style: normal;
        font-weight: 700;
        font-size: 76px;
        line-height: 84px;
        letter-spacing: 0.05em;
    }
    h2{
        font-family: 'Oswald';
        font-style: normal;
        font-weight: 700;
        font-size: 23px;
        line-height: 34px;
        text-align: center;
        
        overflow-wrap: break-word;
    }

    @media screen and (min-width: 765px) {
        justify-content: center;
        align-items: center;

        div{
            width: 100%;
            height: 400px;
        }
        
        h1,h2{
            text-align: left;
            width: 65%;
        }
    }

    @media screen and (min-width: 1020px) {
        h1,h2{
            width: 35%;
        }
    }
    @media screen and (min-width: 1430px) {
        h1,h2{
            width: 25%;
        }
    }
    
`