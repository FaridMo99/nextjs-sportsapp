import getCurrentSeason from "@/lib/getCurrentSeason";
import { redirect } from "next/navigation";

async function page() {
  const currentSeason = await getCurrentSeason();
  return redirect(`/schedule/${currentSeason}`);
}

export default page;
