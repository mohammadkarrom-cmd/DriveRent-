import Empty from "@/app/components/views/Empty"
import { AxiosResponse } from "axios"
import { KeyedMutator } from "swr"
import OfficeCard from "./OfficeCard"

type Props = {
    offices: OfficeType[]
    evaluate?: boolean,
    mutate?: KeyedMutator<AxiosResponse<unknown, unknown>>,
    view?: boolean
}

const OfficesList = ({ offices, evaluate, mutate,view }: Props) => {
    if (offices?.length === 0) {
        return <Empty
            title="لا يوجد مكاتب بعد قم بمراجعة الصفحة في وقت أخر"
        />
    } else {
        return (
            <ul
                className="flex gap-5 w-full overflow-scroll items-center py-5 px-5"
            >
                {
                    offices.map((office) => (
                        <li
                            key={office.id_office}
                            className="min-w-fit min-h-fit"
                        >
                            <OfficeCard
                                office={office}
                                evaluate={evaluate}
                                mutate={mutate}
                                view={view}
                            />
                        </li>
                    ))
                }

            </ul>
        )
    }
}

export default OfficesList