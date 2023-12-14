'use client'

import { ReactNode, createContext, useContext, useState } from "react";
import { saveAddress } from "~/actions";

type AddressFormContext = {
  error?: string
}

const addressFormContext = createContext<AddressFormContext>({})

export const useAddressFormContext = () => useContext(addressFormContext)

export function AddressForm({ children, className }: { children: ReactNode; className?: string }) {
  const [error, setError] = useState('')

  async function handleAction(formData: FormData) {
    try {
      setError('')
      await saveAddress(formData)
    } catch (err) {
      console.error('Cannot save address', err)
      const message = err instanceof Error ? err.message : 'Oops! Error!11'
      setError(message)
    }
  }

  return (
    <form className={className} action={handleAction}>
      <addressFormContext.Provider value={{ error }}>
        {children}
      </addressFormContext.Provider>
    </form>
  )

}

export function AddressFormError() {
  const { error } = useAddressFormContext()

  if (!error) return null

  return (
    <p className="text-red-600">{error}</p>
  )
}