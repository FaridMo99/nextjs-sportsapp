import getCurrentSeason from "@/lib/getCurrentSeason";
import { redirect } from "next/navigation";

async function page() {
  const {season} = await getCurrentSeason();
  return redirect(`/schedule/${season}`);
}

export default page;
