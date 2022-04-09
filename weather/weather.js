import { useRef, useEffect } from 'react';

import { GlobalContext } from '../context/GlobalContext';
import LottieView from 'lottie-react-native';

const weather = () => {
    const animation = useRef();

    useEffect(() => {
        //   if (animation.current) {
        //       setTimeout(() => {
        //           animation.current.reset();
        //           animation.current.play();
        //       }, 100);
        //   }

        animation.current.play();
    }, [animation.current]);

    let weatherIcon;

    weatherIcon = (
        <LottieView
            source={require('../assets/pictures/json_animated/cloudy.json')}
            loop={true}
            speed={1}
            ref={animation}
        />
    );

    return weatherIcon;
};

export default weather;
