import BaseListingForm from "@/components/listings/BaseListingForm";
import TimeshareForm from "@/components/listings/categories/TimeshareForm";

export default function NewTimeshareListingPage() {
  return (
    <BaseListingForm category="timeshare">
      <TimeshareForm />
    </BaseListingForm>
  );
}