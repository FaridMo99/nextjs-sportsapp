import getCurrentSeason from "@/lib/getCurrentSeason";
import { notFound, redirect } from "next/navigation";

export async function generateStaticParams() {
  const teamIDs = Array.from({ length: 30 }, (_, i) => ({
    teamID: String(i + 1),
  }));
  return teamIDs;
}

async function page({ params }) {
  const { teamID } = params;
  const currentSeason = await getCurrentSeason();

  if (Number(teamID) > 30 || Number(teamID) < 1) return notFound();

  return redirect(`teams/${teamID}/${currentSeason}`);
}

export default page;
