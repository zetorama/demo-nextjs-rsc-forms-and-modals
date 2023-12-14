import { DeliveryAddress } from "~/actions";

export function Address({ address }: { address?: DeliveryAddress; }) {
  if (!address) return null;

  return (
    <address className="block">
      <b>{address.name}</b><br />
      {address.street}<br />
      {address.city} {address.country}<br />
      {address.zip}

    </address>
  );
}
