import { Spinner } from "@/lib/ui/MTFix";

const NormalLoading = () => {
  return (
    <div className='w-full h-full p-20 flex justify-center items-center'>
      <Spinner
        color='green'
      />
    </div>
  )
}

export default NormalLoading