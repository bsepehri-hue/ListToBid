import BaseListingForm from "@/components/listings/BaseListingForm";
import RoomsForm from "@/components/listings/categories/RoomsForm";

export default function NewRoomListingPage() {
  return (
    <BaseListingForm category="rooms">
      <RoomsForm />
    </BaseListingForm>
  );
}