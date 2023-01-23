import * as Checkbox from "@radix-ui/react-checkbox";
import dayjs from "dayjs";
import { Check } from "phosphor-react";
import { useEffect, useState } from "react";
import { api } from "../lib/axios";

interface iHabitsListProps {
    date: Date;
    onCompletedChange: (completed: number) => void
}

interface iHabitsInfo {
   possibleHabits: Array<{
        id: string;
        title: string;
        created_at: string;
   }>;
   completedHabits: string[];
}

export function HabitsList({date, onCompletedChange}: iHabitsListProps) {

    const [ habitsInfo, setHabitsInfo ] = useState<iHabitsInfo>()

    useEffect( () => {
        api.get("day", {
            params: {
                date: date.toISOString()
            }
        }).then(response => setHabitsInfo(response.data))
    }, []);

    const isPastDate = dayjs(date).endOf('day').isBefore(new Date());

    async function handleToggleHabit(habitId: string) {
        await api.patch(`/habits/${habitId}/toggle`);
        
        const isHabitCompleted = habitsInfo!.completedHabits.includes(habitId);

        let completedHabits: string[] = [];

        if(isHabitCompleted) {
            completedHabits = habitsInfo!.completedHabits.filter(id => id !== habitId)
        } else {
            completedHabits = [...habitsInfo!.completedHabits, habitId];
        }

        setHabitsInfo({
            possibleHabits: habitsInfo!.possibleHabits,
            completedHabits
        })

        onCompletedChange(completedHabits.length);
    }

    return (
        <div>
            

            <div className="flex flex-col gap-3 mt-6 ">
                {habitsInfo?.possibleHabits.map(habit => {
                    return (
                        <Checkbox.Root 
                            key={habit.id} 
                            onCheckedChange={() => handleToggleHabit(habit.id)}
                            className="flex items-center gap-3 group focus:outline-none"
                            disabled={isPastDate}
                            checked={habitsInfo.completedHabits.includes(habit.id)}
                        >
                            <div className="flex items-center justify-center rounded-lg h-8 w-8 bg-zinc-900 border-2 border-zinc-800 transition-colors group-data-[state=checked]:bg-green-600 group-data-[state=checked]:border-green-500 group-focus:outline-none group-focus:ring-2 group-focus:ring-violet-600 group-focus:ring-offset-2 group-focus:ring-offset-background">
                                <Checkbox.Indicator>
                                    <Check size={20} className="text-white" />
                                </Checkbox.Indicator>
                            </div>

                            <span className="font-semibold text-xl leading-tight group-data-[state=checked]:line-through group-data-[state=checked]:text-zinc-400">
                                {habit.title}
                            </span>
                        </Checkbox.Root>
                    )
                })}

                
                

            </div>
        </div>
    )

}