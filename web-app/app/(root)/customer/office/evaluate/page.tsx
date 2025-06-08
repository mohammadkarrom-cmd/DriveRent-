import PageHeader from "@/app/components/layout/header/PageHeader"
import OfficeEvaluationPageContent from "../components/OfficeEvaluationPageContent"


const OfficeEvaluationPage = () => {
  return (
    <section className="flex flex-col gap-y-5">
      <div
        className="p-5"
      >
        <PageHeader
          title="هنا يمكنك تقييم المكاتب"
          body="قم بتقييم المكاتب التي تعاملت معها للمشاركة في تحسين خدماتنا"
        />
      </div>
      <OfficeEvaluationPageContent />
    </section>
  )
}

export default OfficeEvaluationPage