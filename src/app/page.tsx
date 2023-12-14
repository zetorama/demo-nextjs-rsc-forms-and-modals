import Link from "next/link"
import { getAddress } from "~/actions"
import { Address } from "~/components/Address"

/**
 * Home page
 */
export default async function HomePage() {
  const address = await getAddress()

  return (
    <main className="container max-w-5xl w-full m-auto p-8 flex flex-col gap-8">
      <h1 className='text-3xl'>Welcome to our delivery service</h1>

      <Address address={address} />

      <div>
        <Link href='./edit-address' className='text-blue-500 hover:ring'>{address ? 'Edit' : 'Add new'} address</Link>
      </div>
    </main>
  )
}
