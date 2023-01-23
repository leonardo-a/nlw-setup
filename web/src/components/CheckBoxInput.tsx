import * as Checkbox from "@radix-ui/react-checkbox";
import { Check } from "phosphor-react";

interface iCheckBoxInputProps extends Checkbox.CheckboxProps {

}


export function CheckBoxInput({...rest}: iCheckBoxInputProps) {

    return (
        <Checkbox.Root className="flex items-center gap-3 group">
            <div className="flex items-center justify-center rounded-lg h-8 w-8 bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-600 group-data-[state=checked]:border-green-500">
                <Checkbox.Indicator>
                    <Check size={20} className="text-white" />
                </Checkbox.Indicator>
            </div>

            <span className="font-semibold text-xl leading-tight group-data-[state=checked]:line-through group-data-[state=checked]:text-zinc-400">
                Beber 2L de Água
            </span>
        </Checkbox.Root>
    )

}