import Link from "next/link";
import { getAddress } from "~/actions";
import { AddressForm, AddressFormError, AddressFormFields, AddressFormSubmit } from "~/components/AddressForm";
import Modal from "~/components/Modal";

export default async function AddressModal() {
  const address = await getAddress()

  return (
    <AddressForm>
      <Modal
        header='Edit Address'
        footer={(
          <div className="flex gap-2">
            <Link href=".." className="p-2 rounded bg-slate-500 text-white hover:ring ring-slate-500">Cancel</Link>
            <AddressFormSubmit className="p-2 rounded bg-blue-500 text-white enabled:hover:ring ring-slate-500 disabled:opacity-50">Save address</AddressFormSubmit>
          </div>
        )}
        className="flex flex-col gap-2"
      >
        <AddressFormFields address={address} />
        <AddressFormError />
      </Modal>
    </AddressForm>
  )
}