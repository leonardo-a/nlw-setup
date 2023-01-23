import * as Progress from '@radix-ui/react-progress';

interface iProgressBarProps {
    progress: number;
}

export function ProgressBar({progress}: iProgressBarProps) {

    const progressStyle = {
        width: `${progress}%`
    }

    return (
        <Progress.Root className="h-3 rounded-xl bg-zinc-700 w-full mt-4" value={progress}>
            <Progress.Indicator className="h-3 rounded-xl bg-violet-600 transition-all" style={progressStyle} />
        </Progress.Root>
    
    )
}