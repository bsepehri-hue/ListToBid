import BaseListingForm from "@/components/listings/BaseListingForm";
import RVsForm from "@/components/listings/categories/RVsForm";

export default function NewRVListingPage() {
  return (
    <BaseListingForm category="rvs">
      <RVsForm />
    </BaseListingForm>
  );
}