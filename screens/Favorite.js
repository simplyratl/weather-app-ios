import styled from 'styled-components';
import Search from '../components/Search';

const Container = styled.ScrollView`
    background-color: #081b25;
    flex: 1;
`;

const ContainerInner = styled.View`
    padding-bottom: 94px;
`;


const Favorite = () => {
    return (
        <Container>
            <ContainerInner>
                <Search />
            </ContainerInner>
        </Container>
    );
};

export default Favorite;
