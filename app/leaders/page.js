import getCurrentSeason from "@/lib/getCurrentSeason";
import { redirect } from "next/navigation";

async function page() {
  const currentSeason = await getCurrentSeason();
  return redirect(`/leaders/${currentSeason}`);
}

export default page;
