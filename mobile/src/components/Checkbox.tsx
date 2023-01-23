import { TouchableOpacity, View, Text, TouchableOpacityProps } from "react-native";
import Animated, { RotateInDownRight, RotateInUpLeft, ZoomOut } from "react-native-reanimated";
import { Feather } from '@expo/vector-icons'
import colors from "tailwindcss/colors";

interface iCheckboxProps extends TouchableOpacityProps {
    title: string;
    checked?: boolean;
}

export function Checkbox({ title, checked = false, ...rest }: iCheckboxProps) {
    return( 
        <TouchableOpacity 
            className="flex-row mb-2 items-center"
            activeOpacity={0.7}
            {...rest}
        > 

            {
            checked
                ?
                    <Animated.View 
                        className="h-8 w-8 bg-green-600 rounded-lg items-center justify-center"
                        entering={RotateInUpLeft}
                        exiting={ZoomOut}
                    >
                        <Feather 
                            name="check"
                            size={20}
                            color={colors.zinc[300]}
                        />
                    </Animated.View>
                :
                    <View className="h-8 w-8 bg-zinc-900 rounded-lg" />
            }

            <Text className="text-white font-semibold text-base ml-3">
                {title}
            </Text>


        </TouchableOpacity>
    )
}