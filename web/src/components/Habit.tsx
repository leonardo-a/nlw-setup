
interface HabitProps {
    completed: number;
}


export function Habit(props: HabitProps) {
    return (
        <div className="bg-zinc-900 rounded text-center flex items-center justify-center w-10 h-10 text-white m-2">
            {props.completed}
        </div>
    )
}