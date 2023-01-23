import * as Popover from '@radix-ui/react-popover';
import * as Checkbox from '@radix-ui/react-checkbox';
import clsx from 'clsx';

import { ProgressBar } from './ProgressBar';
import { Check, CheckCircle } from 'phosphor-react';
import dayjs from 'dayjs';
import { HabitsList } from './HabitsList';
import { useState } from 'react';

interface iHabitProps {
    date: Date;
    amount?: number;
    defaultCompleted?: number;
}

export function HabitDay({date, amount = 0, defaultCompleted = 0}: iHabitProps) {

    const[completed, setCompleted] = useState(defaultCompleted)

    const completedPercentage = amount > 0 ? Math.round((completed/amount)*100) : 0;

    const dayMonth = dayjs(date).format('DD/MM');
    const weekDayName = dayjs(date).format('dddd');

    function handleCompletedChange( completedNumber: number ) {
        setCompleted(completedNumber);
        console.log(completed)
    }

    return (
        <Popover.Root>
            <Popover.Trigger 
                className={clsx("w-10 h-10 border-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-violet-600 focus:ring-offset-2 focus:ring-offset-background", {
                    "bg-zinc-900 border-zinc-800": completedPercentage === 0,
                    "bg-violet-900 border-violet-800": completedPercentage > 0 && completedPercentage < 20,
                    "bg-violet-800 border-violet-700": completedPercentage >= 20 && completedPercentage < 40,
                    "bg-violet-700 border-violet-600": completedPercentage >= 40 && completedPercentage < 60,
                    "bg-violet-600 border-violet-500": completedPercentage >= 60 && completedPercentage < 80,
                    "bg-violet-500 border-violet-400": completedPercentage >= 80,
                })} 
            />

            <Popover.Portal>

                <Popover.Content className="flex flex-col min-w-[320px]  p-6 rounded-2xl bg-zinc-900">

                    <span className="font-semibold text-zinc-400">{weekDayName}</span>
                    <span className="font-extrabold mt-1 leading-tight text-3xl">{dayMonth}</span>


                    <ProgressBar progress={completedPercentage} />
                    
                    <HabitsList date={date} onCompletedChange={handleCompletedChange} />

                    <Popover.Arrow height={8} width={16} className="fill-zinc-900 " />
                </Popover.Content>

            </Popover.Portal>
        </Popover.Root>
    )
}