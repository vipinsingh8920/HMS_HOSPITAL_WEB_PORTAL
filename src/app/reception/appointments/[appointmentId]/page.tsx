import { notFound } from "next/navigation";
import { ReceptionAppointmentDetailsPage } from "@/components/reception-appointment-details-page";

const appointmentIds = ["APT-901", "APT-902", "APT-903", "APT-904", "APT-905"];

export function generateStaticParams() {
  return appointmentIds.map((appointmentId) => ({ appointmentId }));
}

export default async function Page({ params }: PageProps<"/reception/appointments/[appointmentId]">) {
  const { appointmentId } = await params;

  if (!appointmentIds.includes(appointmentId)) {
    notFound();
  }

  return <ReceptionAppointmentDetailsPage appointmentId={appointmentId} />;
}
