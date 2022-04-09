import styled from 'styled-components';
import { Dimensions } from 'react-native';
import { Octicons, MaterialCommunityIcons, Entypo } from '@expo/vector-icons';
import { useContext, React, useRef, useEffect } from 'react';
import { GlobalContext } from '../context/GlobalContext';
import weather from '../weather/weather';

const Container = styled.View`
    height: ${(Dimensions.get('window').height * 40) / 100}px;
`;

const TempContainer = styled.View`
    height: 100%;
    justify-content: center;
    flex-direction: column;
    position: relative;
    padding-left: 30px;
`;

const City = styled.Text`
    color: white;
    font-size: 25px;
`;

const Temp = styled.Text`
    color: white;
    font-size: 78px;
`;

const FeelsLike = styled.Text`
    color: white;
    font-size: 18px;
    margin-top: 15px;
    font-weight: 300;
`;

const WeatherType = styled.Text`
    color: white;
    width: 100px;
    background-color: #363361;
    font-size: 18px;
    padding: 10px;
    text-align: center;
    border-radius: 20px;
    overflow: hidden;
`;

const WeatherImage = styled.Image`
    position: absolute;
    right: -100px;
    top: -120px;
    z-index: -1;
    width: 90%;
`;

const ContainerMoreInfo = styled.View`
    flex-direction: row;
    /* background: red; */
    height: 50px;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    padding: 0 30px;
`;

const MoreInfo = styled.View`
    flex-direction: row;
`;

const MoreInfoText = styled.Text`
    color: white;
    font-size: 15.5px;
    margin-left: 10px;
    padding-top: 3.5px;
    font-weight: 300;
`;

const WeatherPicture = styled.Image`
    position: absolute;
    right: 30px;
    width: 60%;
    height: 60%;
`;

const WeatherIcon = styled.View`
    position: absolute;
    right: -20px;
    width: 280px;
    height: 100%;
`;

const TopBar = () => {
    const { currentCity, loading } = useContext(GlobalContext);

    return (
        <Container>
            <TempContainer>
                <City>{!loading ? currentCity.name : null}</City>
                <Temp>{!loading ? Math.round(currentCity.main.temp) : null}°</Temp>
                <WeatherType>{!loading ? currentCity.weather[0].main : null}</WeatherType>
                <FeelsLike>
                    Feels like: {!loading ? Math.round(currentCity.main.feels_like) : null}°
                </FeelsLike>
                <WeatherImage source={require('../assets/pictures/moon-circle.png')} resizeMode='contain' />

                <WeatherIcon>{weather()}</WeatherIcon>
            </TempContainer>

            <ContainerMoreInfo>
                <MoreInfo>
                    <Entypo name='water' size={24} color='#22B1FE' />
                    <MoreInfoText>{!loading ? currentCity.main.humidity : null}%</MoreInfoText>
                </MoreInfo>
                <MoreInfo>
                    <Octicons name='info' size={24} color='#22B1FE' />
                    <MoreInfoText>{!loading ? currentCity.main.pressure : null} mBar</MoreInfoText>
                </MoreInfo>
                <MoreInfo>
                    <MaterialCommunityIcons name='weather-windy' size={24} color='#22B1FE' />
                    <MoreInfoText>{!loading ? currentCity.wind.speed : null} km/h</MoreInfoText>
                </MoreInfo>
            </ContainerMoreInfo>
        </Container>
    );
};

export default TopBar;
