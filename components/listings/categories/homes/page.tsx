import BaseListingForm from "@/components/listings/BaseListingForm";
import HomesForm from "@/components/listings/categories/HomesForm";

export default function NewHomeListingPage() {
  return (
    <BaseListingForm category="homes">
      <HomesForm />
    </BaseListingForm>
  );
}