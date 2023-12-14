'use client'

import { FormEvent, ReactNode, createContext, useContext, useState } from "react";
import { saveAddress } from "~/actions";

type AddressFormContext = {
  error?: string
  dirty?: boolean
  saving?: boolean
}

const addressFormContext = createContext<AddressFormContext>({})

export const useAddressFormContext = () => useContext(addressFormContext)

export function AddressForm({ children, className }: { children: ReactNode; className?: string }) {
  const [error, setError] = useState('')
  const [dirty, setDirty] = useState(false)
  const [saving, setSaving] = useState(false)

  async function handleSubmit(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault()
    const formData = new FormData(ev.currentTarget)

    setSaving(true)
    setError('')
    try {
      await saveAddress(formData)
      setDirty(false)
    } catch (err) {
      console.error('Cannot save address', err)
      const message = err instanceof Error ? err.message : 'Oops! Error!11'
      setError(message)
    } finally {
      setSaving(false)
    }
  }

  function handleChange() {
    setDirty(true)
  }

  return (
    <form className={className} onSubmit={handleSubmit} onChange={handleChange}>
      <addressFormContext.Provider value={{ error, dirty, saving }}>
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

export function AddressFormSubmit({ children, className }: { children: ReactNode; className?: string }) {
  const { dirty, saving } = useAddressFormContext()

  return (
    <button type="submit" disabled={!dirty || saving} className={className}>{saving ? 'Saving...' : children}</button>
  )
}