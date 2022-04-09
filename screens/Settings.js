import styled from 'styled-components';
import TopBar from '../components/TopBar';
import WeatherDay from '../components/WeatherDay';

const Container = styled.ScrollView`
    background-color: #081b25;
    height: 100%;
    color: white;
`;

const Settings = () => {
    return (
        <Container>
            <TopBar />
        </Container>
    );
};

export default Settings;
