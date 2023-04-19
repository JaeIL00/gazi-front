import React, { useEffect, useState } from 'react';
import { BackHandler, Platform, View } from 'react-native';

import EmailWithPassword from '../components/templates/joinMember/EmailWithPassword';

const JoinMemberScreen = () => {
    // Move to next step
    const [step, setStep] = useState(1);
    const onPressNextStep = () => {
        setStep(step + 1);
    };

    // Android back button Handling
    const handleBackButton = () => {
        if (step > 1) {
            setStep(step - 1);
            return true;
        }
        return false;
    };
    useEffect(() => {
        if (Platform.OS === 'android') {
            BackHandler.addEventListener('hardwareBackPress', handleBackButton);
            return () =>
                BackHandler.removeEventListener(
                    'hardwareBackPress',
                    handleBackButton,
                );
        }
    }, [step]);

    return (
        <View>
            {step === 1 && (
                <EmailWithPassword onPressNextStep={onPressNextStep} />
            )}
        </View>
    );
};

export default JoinMemberScreen;
