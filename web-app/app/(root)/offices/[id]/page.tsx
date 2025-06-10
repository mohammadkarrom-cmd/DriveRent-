import OfficePageContent from "../components/OfficePageContent";

type Props = {
    params: Promise<{
        id: string;
    }>;
};


const OfficePage = async ({ params }: Props) => {
    const { id } = await params;

    return (
        <>
            <OfficePageContent
                id={id}
            />
        </>
    )
}

export default OfficePage