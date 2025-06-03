import { Backgrounds, TextPrimary, TextSecondary } from "@/lib/ui/class/classNames";
import { Avatar, Card, CardBody, CardHeader, Rating, Typography } from "@/lib/ui/MTFix";
import clsx from "clsx";

type Props = {
  ratings: RatingType[]
}

const RatingsList = ({ ratings }: Props) => {
  console.log(ratings);

  return (
    <>
      {
        ratings.length > 0
          ? <ul
            className="flex flex-col gap-5 max-h-96 overflow-scroll"
          >
            {ratings.map(rating => (
              <Card
                shadow={false}
                color='transparent'
                className={clsx(Backgrounds, TextPrimary)}
                key={rating.id_office_rating}
              >
                <CardHeader
                  shadow={false}
                  color='transparent'
                  floated={false}
                  className="flex items-center justify-between gap-4 m-0 p-2"
                >
                  <div className="flex items-center gap-4">
                    <Avatar
                      src="dwadwa"
                      alt="avatar"
                      withBorder={true}
                      title="avatar"
                      className="p-0.5"
                    />
                    <div>
                      <Typography variant="h6" color="green">
                        {rating.customer}
                      </Typography>
                      <Rating
                        value={rating.rating}
                        readonly
                      />
                    </div>
                  </div>
                  <Typography variant="small" className={TextPrimary}>
                    {new Date(rating.created_at).toDateString()}
                  </Typography>
                </CardHeader>
                <CardBody
                  color='transparent'
                  className="p-2 ps-8 max-h-44 overflow-scroll"
                >
                  <Typography variant="paragraph" className={clsx(TextSecondary, "font-normal")}>
                    {rating.comment}
                  </Typography>
                </CardBody>
              </Card>
            ))}
          </ul>
          : <p>لا يوجد اي تقييمات بعد</p>
      }
    </>
  )
}

export default RatingsList