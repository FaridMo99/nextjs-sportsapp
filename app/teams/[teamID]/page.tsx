import getCurrentSeason from "@/lib/getCurrentSeason";
import { notFound, redirect } from "next/navigation";

export async function generateStaticParams(): Promise<{ teamID: string }[]> {
  const teamIDs = Array.from({ length: 30 }, (_, i) => ({
    teamID: String(i + 1),
  }));
  return teamIDs;
}

async function page({ params }: { params: Promise<{ teamID: string }> }) {
  const { teamID } = await params;
  const { season } = await getCurrentSeason();

  if (Number(teamID) > 30 || Number(teamID) < 1) return notFound();

  return redirect(`/teams/${teamID}/${season}`);
}

export default page;
