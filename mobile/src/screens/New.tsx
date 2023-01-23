import { useState } from "react";
import { ScrollView, View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { Feather } from "@expo/vector-icons"
import colors from "tailwindcss/colors";

import { BackButton } from "../components/BackButton";
import { Checkbox } from "../components/Checkbox";
import { api } from "../lib/axios";


const availableWeekDays = [
    "Domingo",
    "Segunda-Feira",
    "Terça-Feira",
    "Quarta-Feira",
    "Quinta-Feira",
    "Sexta-Feira",
    "Sábado",
]

export function New() {

    const [ title, setTitle ] = useState<string>('');
    const [ weekDays, setWeekDays ] = useState<number[]>([]);

    function handleToggleWeekDay(weekDayIndex: number) {

        if(weekDays.includes(weekDayIndex)) {
            setWeekDays(prevState => prevState.filter( weekDay => weekDay !== weekDayIndex ));
        } else {
            setWeekDays(prevState => [...prevState, weekDayIndex])
        }

    }

    async function handleCreateNewHabit() {
        try {
            if(!title.trim() || weekDays.length === 0 ) {
                return Alert.alert("Novo Hábito", "Informe o título do hábito e a periocidade!");
            }

            await api.post("habits", {
                title, weekDays
            })

            setTitle('');
            setWeekDays([]);

            Alert.alert("Novo Hábito", "Hábito criado com sucesso!");

        } catch(err) {
            Alert.alert("Ops", "Erro ao cadastrar novo hábito!");
            console.log("Erro ao criar habito: ", err)
        } finally {

        }
    }

    return (
        <View className="flex-1 bg-background px-8 pt-16">
            <ScrollView 
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{paddingBottom: 100}} 
            >
                <BackButton />

                <Text className="text-white mt-6 font-extrabold text-3xl">
                    Criar Hábito
                </Text>

                <Text className="text-white mt-6 font-semibold text-base">
                    Qual o seu comprometimento?
                </Text>

                <TextInput 
                    className="h-12 pl-4 rounded-lg mt-3 bg-zinc-900 text-white border border-zinc-800 focus:border-green-700"
                    placeholder="ex.: exercícios, dormir bem, etc..."
                    placeholderTextColor={colors.zinc[500]}
                    value={title}
                    onChangeText={setTitle}
                />
                
                <Text className="mt-4 mb-3 text-white font-semibold text-base">
                    Qual a recorrência?
                </Text>

                {
                    availableWeekDays.map( (weekDay, i) => (
                        <Checkbox 
                            key={`${weekDay}-${i}`} 
                            title={weekDay} 
                            checked={weekDays.includes(i)}
                            onPress={() => handleToggleWeekDay(i)}
                        />
                    ) )
                }

                <TouchableOpacity
                    className="flex-row items-center justify-center w-full h-14 bg-green-600 rounded-md mt-6"
                    activeOpacity={0.7}
                    onPress={handleCreateNewHabit}
                >
                    <Feather 
                        name="check"
                        size={20}
                        color={colors.white}
                    />

                    <Text className="font-semibold text-white text-base ml-2">
                        Confirmar
                    </Text>
                </TouchableOpacity>

            </ScrollView>
        </View>
    )
}