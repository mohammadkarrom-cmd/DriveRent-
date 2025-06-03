import { CardBackgrounds, shadowSecondary, TextPrimary } from "@/lib/ui/class/classNames"
import { Card, CardBody, CardHeader, Rating, Typography } from "@/lib/ui/MTFix"
import clsx from "clsx"
import RatingsList from "../../components/rattings/RatingsList"

type Props = {
    officeRating: OfficeRatingType
}

const OfficeRatings = ({ officeRating }: Props) => {
    return (
        <Card
            className={clsx(CardBackgrounds, shadowSecondary, "shadow-sm rounded-md")}
        >
            <CardHeader
                floated={false}
                className={clsx("p-3 m-0 flex items-center justify-between flex-wrap gap-10 rounded-t-md rounded-b-none")}
                shadow={false}
                color="transparent"
            >
                <Typography
                    variant="h4"
                    className={clsx(TextPrimary)}
                >
                    تقييمات  العملاء
                </Typography>
                <div>
                    <Typography
                        variant="h6"
                        className={clsx(TextPrimary)}
                    >
                        {`التقييم الكلي : ${officeRating.total_rating}`}
                    </Typography>
                    <div>

                    <Rating
                        value={parseInt(officeRating.total_rating.toFixed(0))}
                        
                        />
                        </div>
                </div>
            </CardHeader>
            <CardBody
                className="px-2 py-5"
            >
                <RatingsList
                    ratings={officeRating.ratings}
                />
            </CardBody>
        </Card>
    )
}

export default OfficeRatings