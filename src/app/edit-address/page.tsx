import { getAddress } from "~/actions";
import { AddressForm, AddressFormError } from "~/app/edit-address/AddressForm";
import { Field } from "~/components/Field";

export default async function AddressPage() {
  const address = await getAddress()

  return (
    <main className="container max-w-5xl w-full m-auto p-8 flex flex-col gap-8">
      <h1 className="text-3xl">Delivery Address</h1>

      <AddressForm className="flex flex-col gap-4">
        <fieldset className="flex flex-col gap-2">
          <Field label='Name' type="text" name="name" defaultValue={address?.name} autoComplete="shipping name" />
          <Field label='Street number' type="text" name="street" defaultValue={address?.street} autoComplete="shipping street-address" />
          <Field label='City' type="text" name="city" defaultValue={address?.city} autoComplete="shipping address-level2" />
          <Field label='Country' type="text" name="country" defaultValue={address?.country} autoComplete="shipping country" />
          <Field label='Postal code' type="text" name="zip" defaultValue={address?.zip} autoComplete="shipping postal-code" />
        </fieldset>

        <AddressFormError />

        <div className="flex gap-2">
          <a href=".." className="p-2 rounded bg-slate-500 text-white hover:ring ring-slate-500">Back</a>
          <button type="submit" className="p-2 rounded bg-blue-500 text-white hover:ring ring-slate-500">Save address</button>
        </div>
      </AddressForm>
    </main>
  )
}
