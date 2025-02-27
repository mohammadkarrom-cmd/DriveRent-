import { Typography } from "@/lib/ui/MTFix"
import SocialLink from "./SocialLink"
import { uniqueId } from "lodash";

type textTagType = {
    text: string,
    className: string
};

type Props = {
    title: textTagType,
    body: textTagType,
    socialLinks: {
        links: SocialLinkType[],
        ContainerClassName: string
    }
}

function SocialSection({ body, socialLinks, title }: Props) {
    return (
        <>
            <Typography variant='h1' className={title.className}>
                {title.text}
            </Typography>
            <Typography variant='paragraph' className={body.className}>
                {body.text}
            </Typography>
            <ul className={socialLinks.ContainerClassName}>
                {
                    socialLinks.links.map(socialLink => (
                        <SocialLink
                            socialLink={socialLink}
                            key={uniqueId()}
                        />
                    ))
                }
            </ul>
        </>
    )
}

export default SocialSection