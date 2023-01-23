import { useNavigation } from "@react-navigation/native"
import { Text } from "react-native"



export function HabitsEmpty() {

    const { navigate } = useNavigation();
    return (
        <Text className="text-zinc-400 text-base">
            Ainda não existe nenhum hábito válido para esse dia!{' '}

            <Text 
                className="text-violet-400 active:text-violet-500 text-base underline"
                onPress={() => navigate('new')}
            >
                Que tal criar um?
            </Text>
        </Text>
    )
}