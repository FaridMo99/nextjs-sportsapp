import "server-only";
import SectionWrapper from "@/components/Home/SectionWrapper";
import GamesCarousel from "@/components/Home/GamesCarousel";
import Standings from "@/components/Home/Standings";
import getCurrentSeason from "@/lib/getCurrentSeason";
import getData from "@/lib/getData";
import { GameScore, Standing } from "./types";
import NoDataText from "@/components/NoDataText";
import SeasonDisclaimer from "@/components/SeasonDisclaimer";

function getDay(offset: number): string {
  const date = new Date();
  date.setDate(date.getDate() + offset);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function getGames(status: string, ...gamesArrays: GameScore[][]): GameScore[] {
  return gamesArrays.flat().filter((game) => game.Status === status);
}

export default async function Home() {
  const { season, message } = await getCurrentSeason();

  let standings: Standing[] = [];
  let liveGames: GameScore[] = [];
  let upcomingGames: GameScore[] = [];
  let finishedGames: GameScore[] = [];

  standings = await getData<Standing[]>(
    `https://api.sportsdata.io/v3/nba/scores/json/Standings/${season}?key=${process.env.API_KEY}`
  );

  if (message === "current") {
    const today = getDay(0);
    const yesterday = getDay(-1);
    const tomorrow = getDay(1);

    const [todaysGames, yesterdaysGames, tomorrowsGames] = await Promise.all([
      getData<GameScore[]>(
        `https://api.sportsdata.io/v3/nba/scores/json/ScoresBasic/${today}?key=${process.env.API_KEY}`
      ),
      getData<GameScore[]>(
        `https://api.sportsdata.io/v3/nba/scores/json/ScoresBasic/${yesterday}?key=${process.env.API_KEY}`
      ),
      getData<GameScore[]>(
        `https://api.sportsdata.io/v3/nba/scores/json/ScoresBasic/${tomorrow}?key=${process.env.API_KEY}`
      ),
    ]);

    finishedGames = getGames(
      "Final",
      todaysGames,
      yesterdaysGames,
      tomorrowsGames
    );
    upcomingGames = getGames(
      "Scheduled",
      todaysGames,
      yesterdaysGames,
      tomorrowsGames
    );
    liveGames = getGames(
      "InProgress",
      todaysGames,
      yesterdaysGames,
      tomorrowsGames
    );
  }

  return (
    <main className="flex-grow overflow-auto">
      {liveGames.length === 0 && upcomingGames.length === 0 && finishedGames.length === 0 && <NoDataText text="No Games Today. Check back later!"/>}
      {liveGames.length > 0 && (
        <SectionWrapper title="Live:" home>
          <GamesCarousel state="InProgress" games={liveGames} />
        </SectionWrapper>
      )}
      {upcomingGames.length > 0 && (
        <SectionWrapper title="Upcoming Games:" home>
          <GamesCarousel state="Scheduled" games={upcomingGames} />
        </SectionWrapper>
      )}
      {finishedGames.length > 0 && (
        <SectionWrapper title="Recent Games:" home>
          <GamesCarousel state="Final" games={finishedGames} />
        </SectionWrapper>
      )}
      <SectionWrapper title="Standings:" home>
        <Standings teams={standings}/>
      </SectionWrapper>
      <SeasonDisclaimer seasonType={message} season={season}/>
    </main>
  );
}
