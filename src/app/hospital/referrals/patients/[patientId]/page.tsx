import { notFound } from "next/navigation";
import { PatientProfilePage } from "@/components/patient-profile-page";

const patientIds = ["P-301", "P-302", "P-303", "P-304"];

export function generateStaticParams() {
  return patientIds.map((patientId) => ({ patientId }));
}

export default async function Page({ params }: PageProps<"/hospital/referrals/patients/[patientId]">) {
  const { patientId } = await params;

  if (!patientIds.includes(patientId)) {
    notFound();
  }

  return <PatientProfilePage patientId={patientId} moduleLabel="Referrals" moduleHref="/hospital/referrals" />;
}
