import { notFound } from "next/navigation";
import { LaboratoryOrderDetailsPage } from "@/components/laboratory-order-details-page";

const orderIds = ["LAB-204", "LAB-205", "LAB-206", "RX-702", "RX-703"];

export function generateStaticParams() {
  return orderIds.map((orderId) => ({ orderId }));
}

export default async function Page({ params }: PageProps<"/hospital/laboratory/orders/[orderId]">) {
  const { orderId } = await params;

  if (!orderIds.includes(orderId)) {
    notFound();
  }

  return <LaboratoryOrderDetailsPage orderId={orderId} />;
}
