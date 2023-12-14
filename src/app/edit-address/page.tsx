import Link from "next/link";
import { getAddress } from "~/actions";
import { AddressForm, AddressFormError, AddressFormFields, AddressFormSubmit } from "~/components/AddressForm";

export default async function AddressPage() {
  const address = await getAddress()

  return (
    <main className="container max-w-5xl w-full m-auto p-8 flex flex-col gap-8">
      <h1 className="text-3xl">Delivery Address</h1>

      <AddressForm className="flex flex-col gap-4">
        <fieldset className="flex flex-col gap-2">
          <AddressFormFields address={address} />
        </fieldset>

        <AddressFormError />

        <div className="flex gap-2">
          <Link href=".." className="p-2 rounded bg-slate-500 text-white hover:ring ring-slate-500">Back</Link>
          <AddressFormSubmit className="p-2 rounded bg-blue-500 text-white enabled:hover:ring ring-slate-500 disabled:opacity-50">Save address</AddressFormSubmit>
        </div>
      </AddressForm>
    </main>
  )
}
