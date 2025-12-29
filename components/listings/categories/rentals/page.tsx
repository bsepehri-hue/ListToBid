import BaseListingForm from "@/components/listings/BaseListingForm";
import RentalsForm from "@/components/listings/categories/RentalsForm";

export default function NewRentalListingPage() {
  return (
    <BaseListingForm category="rentals">
      <RentalsForm />
    </BaseListingForm>
  );
}