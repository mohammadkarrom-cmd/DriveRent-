import { CardBackgrounds, TextPrimary } from '@/lib/ui/class/classNames'
import { IconButton, Tooltip } from '@/lib/ui/MTFix'
import clsx from 'clsx'
type Props = {
    socialLink: SocialLinkType
}

function SocialLink({ socialLink }: Props) {
    return (
        <Tooltip
            className={clsx(CardBackgrounds, TextPrimary, 'text-sm shadow shadow-black')}
            content={socialLink.label}

        >
            <IconButton variant='outlined' className='p-0 rounded-full shadow-none' color={socialLink.color}>
                <socialLink.icon size={25} />
            </IconButton>
        </Tooltip>
    )
}

export default SocialLink