import 'react-native-gesture-handler'
import BottomBar from './components/BottomBar';
import { NavigationContainer } from '@react-navigation/native';
import { GlobalProvider } from './context/GlobalContext';
import { StatusBar } from 'react-native';

export default function App() {
    return (
        <GlobalProvider>
            <NavigationContainer>
                <StatusBar animated barStyle='statusBarStyle' backgroundColor={'black'} />
                <BottomBar />
            </NavigationContainer>
        </GlobalProvider>
    );
}
