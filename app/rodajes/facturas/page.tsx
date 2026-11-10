import { redirect } from 'next/navigation';

export default function FacturasRedirectPage() {
  redirect('/rodajes?tab=facturas');
}
