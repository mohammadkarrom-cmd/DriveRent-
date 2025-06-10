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

    
    const realName = decodeURIComponent(name)
    
    console.log(realName);

    return (
        <section>
            <AdminOfficeMangersContent
                name={realName}
                id={id}
            />
        </section>
    )
}

export default AdminOfficeManagersPage