import { notFound } from "next/navigation";
import { PharmacyOrderDetailsPage } from "@/components/pharmacy-order-details-page";

const orderIds = ["RX-701", "RX-702", "RX-703", "RX-704"];

export function generateStaticParams() {
  return orderIds.map((orderId) => ({ orderId }));
}

export default async function Page({ params }: PageProps<"/hospital/pharmacy/orders/[orderId]">) {
  const { orderId } = await params;

  if (!orderIds.includes(orderId)) {
    notFound();
  }

  return <PharmacyOrderDetailsPage orderId={orderId} />;
}
