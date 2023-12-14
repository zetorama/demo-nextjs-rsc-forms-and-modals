'use server'
import { access, readFile, writeFile } from "fs/promises"
import { redirect } from "next/navigation"

const DB_FILE = './db.file'

export type DeliveryAddress = {
  name: string
  street: string
  city: string
  country: 'US' | 'CA' | 'FR'
  zip: string
}

function validateAddress(address: any): address is DeliveryAddress {
  return Boolean(address.name && address.street && address.city && ['US' , 'CA' , 'FR'].includes(address.country) && address.zip)
}

export async function saveAddress(formData: FormData) {
  const address = {
    name: formData.get('name'),
    street: formData.get('street'),
    city: formData.get('city'),
    country: formData.get('country'),
    zip: formData.get('zip'),
  }

  if (!validateAddress(address)) {
    throw new Error('Address is invalid.')
  }

  await writeFile(DB_FILE, '\n' + JSON.stringify(address), 'utf-8')
  redirect('/')
}

export async function getAddress() {
  try {
    await access(DB_FILE)
  } catch (err) {
    // silently exit
    return
  }

  const raw = await readFile(DB_FILE, 'utf-8')
  if (raw) return JSON.parse(raw) as DeliveryAddress
}