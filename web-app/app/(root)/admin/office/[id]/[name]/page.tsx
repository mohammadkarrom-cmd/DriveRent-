import AdminOfficeMangersContent from "../../components/office/managers/AdminOfficeMangersContent"

type Props = {
    params: Promise<{
        id: string,
        name: string
    }>
}

//TODO ! generate meta data for c.e.o optimization

const AdminOfficeManagersPage = async ({ params }: Props) => {
    const { name, id } = await params;

    return (
        <section>
            <AdminOfficeMangersContent
                name={name}
                id={id}
            />
        </section>
    )
}

export default AdminOfficeManagersPage