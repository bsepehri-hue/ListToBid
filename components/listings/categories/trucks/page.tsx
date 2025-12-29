import BaseListingForm from "@/components/listings/BaseListingForm";
import TrucksForm from "@/components/listings/categories/TrucksForm";

export default function NewTruckListingPage() {
  return (
    <BaseListingForm category="trucks">
      <TrucksForm />
    </BaseListingForm>
  );
}