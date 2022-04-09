import styled from 'styled-components';
import { AntDesign, SimpleLineIcons } from '@expo/vector-icons';
import { Dimensions } from 'react-native';
import weather from '../weather/weather';
import { Text } from 'react-native';
import { Octicons, MaterialCommunityIcons, Entypo } from '@expo/vector-icons';
import { useState, useEffect, useRef, useContext } from 'react';
import axios from 'axios';
import LottieView from 'lottie-react-native';
import { API_KEY } from '@env';
import { GlobalContext } from '../context/GlobalContext';
import { TouchableOpacity } from 'react-native';
import Animated, {
    Easing,
    FadeIn,
    FadeInDown,
    FadeInUp,
    FadeOut,
    FlipInXUp,
    FlipOutXDown,
    LightSpeedInLeft,
    LightSpeedInRight,
    LightSpeedOutRight,
    ZoomIn,
    ZoomInDown,
    ZoomOutDown,
} from 'react-native-reanimated';

const Container = styled.ScrollView`
    flex: 1;
    min-height: ${Dimensions.get('window').height}px;
    height: 100%;
`;

const SearchContainer = styled.View`
    flex-direction: row;
    justify-content: center;
    align-items: center;
    height: 95px;
    padding-top: 28px;
    z-index: 10;
    position: relative;
`;

const SearchInner = styled.View`
    position: relative;
`;

const SearchInput = styled.TextInput`
    width: ${(Dimensions.get('window').width * 66) / 100}px;
    height: 30px;
    color: white;
    font-size: 18px;
`;

const Suggestion = styled(Animated.View)`
    position: absolute;
    z-index: 1;
    top: 50px;
    width: ${Dimensions.get('window').width}px;
    left: -64px;
    background-color: #152c39;
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
    flex-direction: column;
    box-shadow: 4px 4px 20px rgba(0, 0, 0, 0.5);
    z-index: 10;
`;

const SuggestionItem = styled(Animated.View)`
    flex-direction: row;
    justify-content: space-between;
    padding: 10px 20px;
    border-radius: 8px;
    margin: 4px;
`;

const SuggestionCity = styled.Text`
    color: white;
    font-size: 30px;
`;

const SuggestionCountry = styled.Text`
    color: #637989;
    font-size: 18px;
`;

const SuggestionLeft = styled.View``;

const SuggestionRight = styled.View``;

const SuggestionTemp = styled.Text`
    color: white;
    font-size: 48px;
`;

const CityName = styled.Text`
    color: white;
    font-size: 16px;
`;

const CountryName = styled.Text`
    color: #637989;
    margin-top: 4px;
    font-size: 15px;
    margin-right: 6px;
`;

const CardsContainer = styled.View`
    flex: 1;
    padding: 0 22px;
    flex-wrap: wrap;
    position: relative;
`;

const Card = styled(Animated.View)`
    flex: 1;
    width: 100%;
    height: 160px;
    margin-top: 10px;
    background-color: #152c39;
    border-radius: 20px;
    padding: 15px;
`;

const CardTopBar = styled.View`
    flex-direction: row;
    justify-content: space-between;
    height: 50px;
`;

const Temp = styled.Text`
    color: white;
    justify-content: center;
    font-size: 38px;
    flex: 1;
`;

const WeatherIcon = styled.View`
    flex: 1;
    height: 100px;
    top: -15px;
`;

const MiddleBar = styled.View`
    flex-direction: column;
`;

const MoreInfoContainer = styled.View`
    flex-direction: row;
    margin-top: 14px;
    justify-content: space-between;
`;

const MoreInfo = styled.Text`
    color: white;
`;

const DeleteCard = styled(Animated.View)`
    position: absolute;
    top: 0;
    right: 0;
    width: 28px;
    height: 28px;
    background-color: red;
    justify-content: center;
    align-items: center;
    border-bottom-left-radius: 5px;
    border-top-right-radius: 5px;
`;

const Search = () => {
    const { currentCity } = useContext(GlobalContext);

    const [searchValue, setSearchValue] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [suggestionOpened, setSuggestionOpened] = useState(false);
    const [addedCards, setAddedCards] = useState([]);
    const [deleteMode, setDeleteMode] = useState(false);
    const KEY = process.env.API_KEY;

    useEffect(() => {
        if (searchValue.length === 0) {
            setSuggestionOpened(false);
            setLoading(true);
        } else {
            setSuggestionOpened(true);
            setLoading(true);
            setError('');
        }

        const fetchData = async () => {
            if (searchValue.length !== 0) {
                try {
                    const res = await axios.get(
                        `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&appid=${KEY}&units=metric`
                    );

                    setSuggestionOpened(true);
                    setLoading(false);
                    setSuggestions([
                        ...suggestions.filter((data) => {
                            if (searchValue === data.name && searchValue.includes('data.name')) {
                                return data;
                            } else {
                                return null;
                            }
                        }),
                        res.data,
                    ]);

                    return res;
                } catch (error) {
                    setSuggestionOpened(true);
                    setLoading(true);
                    setError('Not found.');
                    console.log(error);
                }
            } else {
                setSuggestionOpened(false);
                setSuggestions([]);
            }
        };

        const timer = setTimeout(() => {
            fetchData();
        }, 3000);

        return () => clearTimeout(timer);
    }, [searchValue]);

    const addCard = (e) => {
        for (let i = 0; i < addedCards.length; i++) {
            if (addedCards[i].name === suggestions[0].name) {
                return;
            }
        }

        setAddedCards([...addedCards, suggestions[0]]);
        setSearchValue('');
    };

    const clickForDelete = (e) => {
        setDeleteMode(!deleteMode);
    };

    const deleteSpecificCard = (name) => {
        console.log('radi');
        setAddedCards(addedCards.filter((card) => card.name !== name));
    };

    return (
        <Container>
            <SearchContainer>
                <AntDesign
                    name='search1'
                    size={24}
                    color={!suggestionOpened ? '#637989' : '#fff'}
                    style={{ marginRight: 14 }}
                />
                <SearchInner>
                    <SearchInput
                        autoCorrect={false}
                        // clearTextOnFocus
                        placeholder={'Search'}
                        placeholderTextColor={'white'}
                        value={searchValue}
                        onChangeText={(text) => {
                            setSearchValue(text);
                        }}
                    />

                    <>
                        <Suggestion entering={ZoomInDown}>
                            {suggestionOpened ? (
                                !loading ? (
                                    suggestions.map((suggestion, index) => (
                                        <SuggestionItem
                                            key={index}
                                            onPress={(e) => {
                                                addCard(e);
                                            }}
                                        >
                                            <SuggestionLeft>
                                                <SuggestionCity>{suggestion.name}</SuggestionCity>
                                                <SuggestionCountry>
                                                    {suggestion.sys.country}
                                                </SuggestionCountry>
                                            </SuggestionLeft>

                                            <SuggestionRight>
                                                <SuggestionTemp>
                                                    {Math.round(suggestion.main.temp)}°
                                                </SuggestionTemp>
                                            </SuggestionRight>
                                        </SuggestionItem>
                                    ))
                                ) : (
                                    <SuggestionItem>
                                        <SuggestionLeft>
                                            <SuggestionCountry>
                                                {error.length > 0 ? error : 'Loading'}
                                            </SuggestionCountry>
                                        </SuggestionLeft>
                                    </SuggestionItem>
                                )
                            ) : null}
                        </Suggestion>
                    </>
                </SearchInner>
                <TouchableOpacity>
                    <SimpleLineIcons
                        name='pencil'
                        size={24}
                        color={!deleteMode ? '#637989' : '#fff'}
                        style={{ marginLeft: 14 }}
                        onPress={(e) => {
                            clickForDelete(e);
                        }}
                    />
                </TouchableOpacity>
            </SearchContainer>

            <CardsContainer>
                {addedCards.length !== 0 ? (
                    addedCards.map((card, index) => (
                        <Card key={index} entering={FadeInUp} exiting={FlipOutXDown}>
                            <CardTopBar>
                                <Temp>{Math.round(card.main.temp)}</Temp>
                                <WeatherIcon>
                                    <LottieView
                                        source={require('../assets/pictures/json_animated/cloudy.json')}
                                        loop
                                        autoPlay
                                        speed={1}
                                    />
                                </WeatherIcon>
                            </CardTopBar>

                            <MiddleBar>
                                <CityName>{card.name}</CityName>
                                <CountryName>{card.sys.country}</CountryName>
                            </MiddleBar>

                            <MoreInfoContainer>
                                <MoreInfo>
                                    <Entypo name='water' size={16} color='#22B1FE' />
                                    <Text style={{ paddingTop: 2 }}> {card.main.humidity}% </Text>
                                </MoreInfo>
                                <MoreInfo>
                                    <MaterialCommunityIcons name='weather-windy' size={16} color='#22B1FE' />
                                    <Text> {card.wind.speed}km/h </Text>
                                </MoreInfo>
                            </MoreInfoContainer>

                            {deleteMode ? (
                                <DeleteCard entering={LightSpeedInRight} exiting={FadeOut}>
                                    <Text
                                        onPress={() => {
                                            deleteSpecificCard(card.name);
                                        }}
                                        style={{
                                            color: 'white',
                                            fontSize: 20,
                                            textAlign: 'center',
                                        }}
                                    >
                                        x
                                    </Text>
                                </DeleteCard>
                            ) : null}
                        </Card>
                    ))
                ) : (
                    <Text style={{ color: 'white' }}>You don't have any added cities.</Text>
                )}
            </CardsContainer>
        </Container>
    );
};

export default Search;
