import BaseListingForm from "@/components/listings/BaseListingForm";
import LandForm from "@/components/listings/categories/LandForm";

export default function NewLandListingPage() {
  return (
    <BaseListingForm category="land">
      <LandForm />
    </BaseListingForm>
  );
}