import { notFound } from "next/navigation";
import { ReportDetailsPage } from "@/components/report-details-page";

const reportIds = ["RPT-401", "RPT-402", "RPT-403", "RPT-404", "RPT-405"];

export function generateStaticParams() {
  return reportIds.map((reportId) => ({ reportId }));
}

export default async function Page({ params }: PageProps<"/hospital/reports/[reportId]">) {
  const { reportId } = await params;

  if (!reportIds.includes(reportId)) {
    notFound();
  }

  return <ReportDetailsPage reportId={reportId} />;
}
