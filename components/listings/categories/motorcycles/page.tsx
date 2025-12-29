import BaseListingForm from "@/components/listings/BaseListingForm";
import MotorcyclesForm from "@/components/listings/categories/MotorcyclesForm";

export default function NewMotorcycleListingPage() {
  return (
    <BaseListingForm category="motorcycles">
      <MotorcyclesForm />
    </BaseListingForm>
  );
}