import PageHeader from "@/app/components/layout/header/PageHeader"
import OfficesPageContent from "./components/OfficesPageContent"


const OfficesPage = () => {
    return (
        <section className="flex flex-col gap-y-5">
            <div
                className="p-5"
            >
                <PageHeader
                    title="المكاتب"
                    body="هنا يمكنك عرض المكاتب المتاحة"
                />
            </div>
            <OfficesPageContent />
        </section>
    )
}

export default OfficesPage