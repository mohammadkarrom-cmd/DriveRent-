type AuthenticatedUser = {
    first_name: string,
    last_name: string,
    email: string,
    username: string,
    role: string,
    access: string
}
//# links
type LinkType = {
    label: string,
    href: string
}
//# menu links
type MenuLinkType = {
    icon: ReactNode,
    label: string,
    path: string
    Links: NestedLinkType[] | undefined
}
type NestedLinkType = {
    icon: ReactNode,
    label: string,
    path: string
}
//# social links
type SocialLinkType = {
    label: string,
    href: string,
    icon: IconType,
    color: color
}
type AppNavLinkType = {
    label: string,
    href: string,
    icon: IconType,
}
//# footer links
type FooterLinkType = {
    group: string,
    links: LinkType[]
}
//# table
//!head
type TableHead = {
    id: number,
    name: string,
    key: string
    type: "string" | "number" | "boolean"
    icon?: ReactNode
    className?: string,
    render: (row: any) => TableHeadRenderReturnType
};
type TableHeadRenderType = string | number | boolean | object
type TableHeadRenderReturnType = void | ReactNode | JSX.Element
//! body
type TableBody = object;