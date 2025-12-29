import BaseListingForm from "@/components/listings/BaseListingForm";
import GeneralForm from "@/components/listings/categories/GeneralForm";

export default function NewGeneralListingPage() {
  return (
    <BaseListingForm category="general">
      <GeneralForm />
    </BaseListingForm>
  );
}