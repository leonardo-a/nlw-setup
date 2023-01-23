import { ScrollView, View, Text, Alert } from "react-native";
import { useRoute } from '@react-navigation/native'

import dayjs from "dayjs";

import { BackButton } from "../components/BackButton";
import { ProgessBar } from "../components/ProgressBar";
import { Checkbox } from "../components/Checkbox";
import { useEffect, useState } from "react";
import { Loading } from "../components/Loading";
import { api } from "../lib/axios";
import { generateProgressPercentage } from "../utils/generateProgressPercentage";
import { HabitsEmpty } from "../components/HabitsEmpty";
import clsx from "clsx";

interface iHabitParams {
    date: string;
}

interface DayInfoProps {
    possibleHabits: {
        id: string;
        title: string;
    }[],
    completedHabits: string[];
}

export function Habit() {
    const [loading, setLoading] = useState(true);
    const [dayInfo, setDayInfo] = useState<DayInfoProps | null>(null)
    const [completedHabits, setCompletedHabits] = useState<string[]>([])

    const habitsProgess = dayInfo?.possibleHabits.length 
        ? 
            generateProgressPercentage(dayInfo.possibleHabits.length, completedHabits.length) 
        : 
            0;

    const route = useRoute();
    const { date } = route.params as iHabitParams;

    const parsedDate = dayjs(date);
    const isPastDate = parsedDate.endOf('day').isBefore(new Date());
    const dayOfWeek = parsedDate.format('dddd');
    const dayMonth = parsedDate.format('DD/MM');

    useEffect(() => {
        getHabits();
    }, [])

    async function getHabits() {
        try {
            setLoading(true);

            const response = await api.get("day", { params: { date } });
            setDayInfo(response.data);

            setCompletedHabits(response.data.completedHabits);
        } catch(err) {
            Alert.alert("Ops!", "Não foi possível carregar as Informações dos hábitos!");
            console.log("Erro ao carregar info: ", err)
        } finally {
            setLoading(false);
        }
    }


    async function handleToggleHabit(habitId: string) {
        await api.patch(`habits/${habitId}/toggle`);

        try { 
            if(completedHabits.includes(habitId)) {
                setCompletedHabits(prevState => prevState.filter( id => id !== habitId ))
            } else {
                setCompletedHabits(prevState => [...prevState, habitId])
            }
        } catch(err) {
            console.log("Erro ao atualizar habito: ", err)
        }
    }
    

    if(loading) {
        return <Loading />
    }

    return (
        <View className="flex-1 bg-background px-8 pt-16">
            <ScrollView 
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{paddingBottom: 100}} 
            >
                <BackButton />

                <Text className="mt-6 font-semibold text-zinc-300 text-base">
                    {dayOfWeek}
                </Text>

                <Text className="font-extrabold text-white text-3xl">
                    {dayMonth}
                </Text>

                <ProgessBar progress={habitsProgess}/>

                <View className={clsx("mt-6", {
                    "opacity-40": isPastDate
                })}>
                    {
                        dayInfo?.possibleHabits.length ? 
                            dayInfo?.possibleHabits.map(habit => {
                                return (
                                    <Checkbox 
                                        key={habit.id} 
                                        title={habit.title}
                                        checked={completedHabits.includes(habit.id)} 
                                        disabled={isPastDate}
                                        onPress={() => handleToggleHabit(habit.id)}
                                    />
                                )
                            })
                        : <HabitsEmpty />
                    }
                </View>
                
                {
                    isPastDate && (
                        <Text className="text-red-500 font-semibold mt-10 text-center">
                            Você não pode atualizar os hábitos de uma data que já passou!
                        </Text>
                    )

                }

            </ScrollView>
        </View>
    )
}