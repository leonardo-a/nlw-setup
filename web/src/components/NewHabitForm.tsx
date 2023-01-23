import * as Checkbox from "@radix-ui/react-checkbox";
import { Check } from "phosphor-react";
import { FormEvent, useState } from "react";
import { api } from "../lib/axios";

const availableWeekDays = [
    "Domingo",
    "Segunda-Feira",
    "Terça-Feira",
    "Quarta-Feira",
    "Quinta-Feira",
    "Sexta-Feira",
    "Sábado"

]


export function NewHabitForm() {

    const [ title, setTitle ] = useState('');
    const [ weekDays, setWeekDays ] = useState<number[]>([]);

    async function createNewHabit(event: FormEvent) {
        event.preventDefault();

        console.log("Formulário enviado!")
        
        if(!title || weekDays.length === 0) {
            return;
        }

        await api.post("habits", {
            title, 
            weekDays
        })

        setTitle('');
        setWeekDays([]);

        alert("Hábito criado com sucesso!");
    }

    function toggleWeekDays(weekDay: number) {
        if( weekDays.includes(weekDay) ) {
            const weekDaysWithRemovedOne = weekDays.filter( day => day !== weekDay );

            setWeekDays(weekDaysWithRemovedOne);
        } else {
            const weekDaysWithAddedOne = [...weekDays, weekDay]

            setWeekDays(weekDaysWithAddedOne);
        }


    }

    return (
        <form onSubmit={createNewHabit} className="flex flex-col w-full mt-6">
            <label htmlFor="title" className="font-semibold leading-tight">
                Qual o seu comprometimento?
            </label>

            <input   
                id="title"
                type="text"
                className="bg-zinc-800 p-4 rounded-lg mt-3 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-violet-600 focus:ring-offset-2 focus:ring-offset-zinc-900"
                placeholder="ex.: Exercícios, dormir bem, etc..."
                autoFocus
                value={title}
                onChange={event => setTitle(event.target.value)}
            />

            <label htmlFor="" className="font-semibold leading-tight mt-4">
                Qual a recorrência?
            </label>

            <div className="flex flex-col gap-2 mt-3">

                {
                    availableWeekDays.map( (weekDay, i) => {
                        return(
                            <Checkbox.Root 
                                key={weekDay} 
                                className="flex items-center gap-3 group focus:outline-none"
                                checked={weekDays.includes(i)}
                                onCheckedChange={() => toggleWeekDays(i)}
                            >
                                <div className="flex items-center justify-center rounded-lg h-8 w-8 transition-colors bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-600 group-data-[state=checked]:border-green-500 group-focus:ring-2 group-focus:ring-violet-600 group-focus:ring-offset-2 group-focus:ring-offset-zinc-900">
                                    <Checkbox.Indicator>
                                        <Check size={20} className="text-white" />
                                    </Checkbox.Indicator>
                                </div>

                                <span className="font-semibold text-xl leading-tight">
                                    {weekDay}
                                </span>
                            </Checkbox.Root>
                        )
                    } )

                }


                

            </div>

            <button 
                type="submit" 
                className="flex items-center justify-center bg-green-600 mt-6 p-4 rounded-lg font-semibold hover:bg-green-500 transition duration-150"
            >
                <Check size={20} weight="bold" />
                Confirmar
            </button>


        </form>
    )
}