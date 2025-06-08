"use client"

import { CardBackgrounds } from "@/lib/ui/class/classNames"
import { Card, CardBody, CardFooter } from "@/lib/ui/MTFix"
import { AxiosResponse } from "axios"
import clsx from "clsx"
import { KeyedMutator } from "swr"
import AddCategoryElement from "./AddCategoryElement"
import AdminCategoryElement from "./AdminCategoryElement"

type Props = {
  mutate: KeyedMutator<AxiosResponse<unknown, unknown>>
  categories: CategoryType[]
}

const AdminCategoriesTable = ({ categories, mutate }: Props) => {
  // const tableHead: TableHead[] = [
  //   {
  //     id: 1,
  //     key: "name",
  //     name: "التصنيف",
  //     type: "string",
  //     render: (row: CategoryType) => row.name
  //   },
  //   {
  //     id: 1,
  //     key: "id",
  //     name: "المعرف",
  //     type: "string",
  //     render: (row: CategoryType) => row.id_car_type
  //   }
  // ]
  return (
    <Card
      className={clsx(CardBackgrounds, 'w-full p-5')}
    >
      <CardBody
        className='p-0 min-w-full'
      >
        <ol className="overflow-scroll h-[60vh]">
          {
            categories.map(category => (
              <>
                <AdminCategoryElement
                  mutate={mutate}
                  category={category}
                />
                <hr className="mt-0.5 mb-2 border-text-light-primary dark:border-text-dark-primary"/>
              </>
            ))
          }
        </ol>
      </CardBody>
      <CardFooter
        className="p-0 pt-5"
      >
        <AddCategoryElement
          mutate={mutate}
        />
      </CardFooter>
    </Card>
  )
}

export default AdminCategoriesTable