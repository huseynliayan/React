import styled from "styled-components";
import ShowData from "./ShowData";
import Search from "./Search";

function MainComponent(){


    return (
        <MainSection>
            <Search/>
            <ShowData/>
        </MainSection>
    )
}

export default MainComponent

const MainSection = styled.section`
padding:50px;
font-size:40px;
font-weight:900;
text-align:center;
`;
