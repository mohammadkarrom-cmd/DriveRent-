"use client"
import { Button } from '@/lib/ui/MTFix'
import useBoolean from '../hooks/use-boolean'

type Props = {
    text: string,
    maxLength: number
}

function TextAccordion({ text, maxLength }: Props) {
    const isFullText = useBoolean({ initialState: false })

    if (text.length > maxLength) {
        if (isFullText.value) {
            return (
                <>
                    <span>
                        {text}
                    </span>
                    <Button
                        variant='text'
                        color='green'
                        className=' decoration-inherit inline-block p-1 normal-case'
                        onClick={isFullText.onFalse}
                    >
                        See less
                    </Button>
                </>
            );
        } else {
            return (

                <>
                    <span>
                        {text.substring(0, maxLength)}...
                    </span>
                    <Button
                        variant='text'
                        color='green'
                        className='decoration-inherit inline-block p-1 normal-case'
                        onClick={isFullText.onTrue}
                    >
                        See more
                    </Button>
                </>
            );
        }
    } else {
        return text
    }
}

export default TextAccordion