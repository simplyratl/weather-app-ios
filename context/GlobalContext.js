import axios from 'axios';
import { createContext, useState, useEffect } from 'react';
import { API_KEY } from '@env';

export const GlobalContext = createContext();

const KEY = process.env.API_KEY;

export const GlobalProvider = ({ children }) => {
    const [currentCity, setCurrentCity] = useState({});
    const [currentHourly, setCurrentHourly] = useState([]);
    const [city, setCity] = useState('Los Angeles');
    const [loading, setLoading] = useState(true);

    const requests = {
        requestHourly: `api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${KEY}&units=metric`,
        requestCurrent: `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${KEY}&units=metric`,
        requestDaily16: `https://api.openweathermap.org/data/2.5/forecast/daily?q=${city}&cnt=10&appid=${KEY}`,
    };

    useEffect(() => {
        const fetchCity = async () => {
            try {
                const res = await axios.get(requests.requestCurrent);
                setCurrentCity(res.data);
                setLoading(false);
                return res;
            } catch (error) {
                console.log(error);
            }
        };

        fetchCity();
    }, []);

    useEffect(() => {
        if (currentCity !== undefined) {
            const fetchHourly = async () => {
                try {
                    const res = await axios.get(
                        `https://api.openweathermap.org/data/2.5/onecall?lat=${currentCity.coord.lat}&lon=${currentCity.coord.lon}&appid=${KEY}&units=metric`
                    );
                    setCurrentHourly(res.data);
                    return res;
                } catch (error) {
                    console.log(error);
                }
            };

            fetchHourly();
        }
    }, [currentCity]);

    return (
        <GlobalContext.Provider value={{ currentCity, currentHourly, setCurrentHourly, city, loading }}>
            {children}
        </GlobalContext.Provider>
    );
};
