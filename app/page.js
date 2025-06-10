import "server-only";
import HomeSectionWrapper from "@/components/Home/HomeSectionWrapper";
import RecentGames from "@/components/Home/RecentGames";
import Standings from "@/components/Home/Standings";
import TopPerformers from "@/components/Home/TopPerformers";
import UpcomingGames from "@/components/Home/UpcomingGames";
import getCurrentSeason from "@/lib/getCurrentSeason";

export default async function Home() {
  const season = getCurrentSeason();
  //const standingsResponse = await fetch(`https://api.sportsdata.io/v3/nba/scores/json/Standings/${season}?key=${process.env.API_KEY}`)
  //const standingsData = await standingsResponse.json()

  return (
    <main className="w-full h-screen">
      <HomeSectionWrapper title="Upcoming Games:">
        <UpcomingGames content="" />
      </HomeSectionWrapper>

      <HomeSectionWrapper title="Recent Games:">
        <RecentGames content="" />
      </HomeSectionWrapper>

      <HomeSectionWrapper title="Top Performers:">
        <TopPerformers content={[]} />
      </HomeSectionWrapper>

      <HomeSectionWrapper title="Standings:">
        <Standings
          teams={[
            {
              Name: "Celtics",
              Wins: 64,
              Losses: 18,
              Percentage: 0.78,
              Conference: "Eastern",
            },
            {
              Name: "Celtics",
              Wins: 64,
              Losses: 18,
              Percentage: 0.78,
              Conference: "Eastern",
            },
            {
              Name: "Celtics",
              Wins: 64,
              Losses: 18,
              Percentage: 0.78,
              Conference: "Eastern",
            },
            {
              Name: "Celtics",
              Wins: 64,
              Losses: 18,
              Percentage: 0.78,
              Conference: "Eastern",
            },
          ]}
        />
      </HomeSectionWrapper>
    </main>
  );
}

//upcoming games section
//make upcoming games a carousel

//recent games scores etc. section

//top performers season section
//player cards as carousel

//standings section
//standings should be two lists for eastern and western conference

//all things should also be links
