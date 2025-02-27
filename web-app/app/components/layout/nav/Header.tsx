import { Navbar } from "@/lib/ui/MTFix"
import { ReactNode } from "react"
import ThemeToggleSwitch from "../../actions/ThemeSwitcher"
import AuthLink from "../commonLayout/AuthLink"
import clsx from "clsx"
import { TextPrimary } from "@/lib/ui/class/classNames"
import Logo from "../../Lgo"

type Props = {
    navigation?: ReactNode
    drawer?: ReactNode
}

function Header({ navigation, drawer }: Props) {
    return (
        <Navbar
            fullWidth
            className={clsx(TextPrimary, "px-7 py-1 border-none backdrop-blur-lg dark:backdrop-blur-lg flex justify-between items-center shadow-md shadow-background-default-dark dark:shadow-md dark:shadow-background-default-dark bg-primary-main h-16  sticky top-0 z-50")}
        >
            <section className="flex items-center gap-5">
                <Logo
                    disabledLink
                    height={50}
                    width={70}
                />
                {navigation}
            </section>
            <section className="flex items-center gap-[5%]" id="d-place">
                <AuthLink />
                <ThemeToggleSwitch />
                {drawer}
            </section>
        </Navbar>
    )
}

export default Header