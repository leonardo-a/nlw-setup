import clsx from "clsx";
import dayjs from "dayjs";
import { TouchableOpacity, TouchableOpacityProps, Dimensions } from "react-native";
import { generateProgressPercentage } from "../utils/generateProgressPercentage";

const WEEK_DAYS = 7;

const SCREEN_HORIZONTAL_PADDING = (32*2) / 5;

export const DAY_MARGING_BETWEEN = 8;
export const DAY_SIZE = (Dimensions.get('screen').width / WEEK_DAYS)  - (SCREEN_HORIZONTAL_PADDING + 5) ;

interface iHabitDayProps extends TouchableOpacityProps {
    date: Date;
    amount?: number;
    completed?: number
}

export function HabitDay({date, amount = 0, completed = 0, ...rest}: iHabitDayProps) {

    const completedPercentage = amount > 0 ? generateProgressPercentage(amount, completed) : 0;
    const today = dayjs().startOf('day').toDate();
    const isCurrentDay = dayjs(today).isSame(date, 'day')


    return (
        <TouchableOpacity 
            className={clsx("rounded-lg border-2 m-1",{
                "bg-zinc-900 border-zinc-800": completedPercentage === 0,
                "bg-violet-900 border-violet-700": completedPercentage > 0 && completedPercentage < 20,
                "bg-violet-800 border-violet-600": completedPercentage >= 20 && completedPercentage < 40,
                "bg-violet-700 border-violet-500": completedPercentage >= 40 && completedPercentage < 60,
                "bg-violet-600 border-violet-500": completedPercentage >= 60 && completedPercentage < 80,
                "bg-violet-500 border-violet-400": completedPercentage >= 80,
                "border-green-600 border-3": isCurrentDay

            })}
            style={{width: DAY_SIZE, height: DAY_SIZE}}
            activeOpacity={0.6}
            {...rest}
        />
    )

}