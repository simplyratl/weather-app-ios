import { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import { GlobalContext } from '../context/GlobalContext';

const Container = styled.View`
    position: relative;
    margin-top: 50px;
    padding-left: 30px;
    flex: 1;
`;

const TodayText = styled.Text`
    color: #637989;
    font-size: 30px;
    font-weight: 200;
    margin-top: 20px;
`;

const TodayWeatherScroll = styled.ScrollView`
    position: relative;
    margin-top: 20px;
`;

const TodayCard = styled.View`
    height: 100%;
    align-items: center;
    margin-right: 30px;
`;

const TodayTime = styled.Text`
    color: white;
`;

const TodayImage = styled.Image`
    width: 50px;
    height: 50px;
    margin: 3px 0;
`;

const TodayTemp = styled.Text`
    color: white;
    font-size: 22px;
`;

const EveryDayWeather = styled.View`
    flex-direction: column;
    margin-top: 10px;
`;

const EveryDay = styled.Text`
    color: white;
    font-size: 18px;
`;

const EveryDayCard = styled.View`
    flex-direction: row;
    justify-content: space-between;
    padding-right: 30px;
    margin-top: 15px;
`;

const EveryDayImage = styled.Image`
    width: 40px;
    height: 40px;
`;

const EveryDayTemp = styled.View`
    flex-direction: row;
`;

const EveryDayHighestTemp = styled.Text`
    color: white;
    font-size: 20px;
    margin-right: 15px;
`;

const EveryDayLowestTemp = styled.Text`
    color: #637989;
    font-size: 20px;
    width: 30px;
`;

const WeatherDay = () => {
    const { currentHourly, loading, setCurrentHourly } = useContext(GlobalContext);
    const { cards, setCards } = useState([]);
    const now = new Date();
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    return (
        <Container>
            <TodayText>Today</TodayText>

            <TodayWeatherScroll horizontal>
                {currentHourly.hourly !== undefined ? (
                    currentHourly.hourly.splice(0, 10).map((weather, index) => (
                        <TodayCard key={index}>
                            <TodayTime>{`${
                                parseInt(new Date(weather.dt).getHours()) < 12
                                    ? new Date(weather.dt).getHours() + ' AM'
                                    : new Date(weather.dt).getHours() + ' PM'
                            }`}</TodayTime>
                            <TodayImage
                                resizeMode='cover'
                                source={require('../assets/pictures/weather.png')}
                                tintColor='white'
                            />
                            <TodayTemp>{Math.round(weather.temp)}°</TodayTemp>
                        </TodayCard>
                    ))
                ) : (
                    <TodayTime>No data to show.</TodayTime>
                )}
            </TodayWeatherScroll>

            <EveryDayWeather>
                {currentHourly.daily !== undefined ? (
                    currentHourly.daily.map((weather, index) => (
                        <EveryDayCard key={index}>
                            <EveryDay>{dayNames[new Date(weather.dt).getDay()]}</EveryDay>
                            <EveryDayImage
                                resizeMode='contain'
                                source={require('../assets/pictures/weather.png')}
                            />
                            <EveryDayTemp>
                                <EveryDayHighestTemp>{Math.round(weather.temp.max)}°</EveryDayHighestTemp>
                                <EveryDayLowestTemp>{Math.round(weather.temp.min)}°</EveryDayLowestTemp>
                            </EveryDayTemp>
                        </EveryDayCard>
                    ))
                ) : (
                    <EveryDay>No data to show.</EveryDay>
                )}
            </EveryDayWeather>
        </Container>
    );
};

export default WeatherDay;
