import BaseListingForm from "@/components/listings/BaseListingForm";
import CarsForm from "@/components/listings/categories/CarsForm";

export default function NewCarListingPage() {
  return (
    <BaseListingForm category="cars">
      <CarsForm />
    </BaseListingForm>
  );
}