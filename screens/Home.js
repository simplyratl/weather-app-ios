import styled from 'styled-components';
import TopBar from '../components/TopBar';
import WeatherDay from '../components/WeatherDay';

const Container = styled.ScrollView`
    background-color: #081b25;
    flex: 1;
`;

const ContainerInner = styled.View`
    padding-bottom: 94px;
`;

const Home = () => {
    return (
        <Container>
            <ContainerInner>
                <TopBar />
                <WeatherDay />
            </ContainerInner>
        </Container>
    );
};

export default Home;
