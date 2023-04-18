import React from "react";
import { Text, TouchableOpacity } from "react-native";

type TouchButtonProps = {
    title: string;
    onPress: () => void;
};

const TouchButton = ({ title, onPress }: TouchButtonProps) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={{
                borderWidth: 1,
                borderColor: "black",
                alignItems: "center",
            }}>
            <Text>{title}</Text>
        </TouchableOpacity>
    );
};

export default TouchButton;
