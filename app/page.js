import "server-only";
import HomeSectionWrapper from "@/components/Home/HomeSectionWrapper";
import GamesCarousel from "@/components/Home/GamesCarousel";
import Standings from "@/components/Home/Standings";
import TopPerformers from "@/components/Home/TopPerformers";

function getDay(offset) {
  const date = new Date();
  date.setDate(date.getDate() + offset);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function getGames(status, ...gamesArrays) {
  return gamesArrays.flat().filter((game) => game.Status === status);
}

function getTopPlayers(players) {}

export default async function Home() {
  const today = getDay(0);
  const yesterday = getDay(-1);
  const tomorrow = getDay(1);

  //const seasonResponse = await fetch(`https://api.sportsdata.io/v3/nba/scores/json/CurrentSeason?key=${process.env.API_KEY}`)
  //const season = await seasonResponse.json()

  //const standingsResponse = await fetch(`https://api.sportsdata.io/v3/nba/scores/json/Standings/${season}?key=${process.env.API_KEY}`)
  //const standings = await standingsResponse.json()

  //const todaysGamesResponse = await fetch(`https://api.sportsdata.io/v3/nba/scores/json/ScoresBasic/${today}?key=${process.env.API_KEY}`)
  //const todaysGames = await todaysGamesResponse.json()

  //const yesterdaysGamesResponse = await fetch(`https://api.sportsdata.io/v3/nba/scores/json/ScoresBasic/${yesterday}?key=${process.env.API_KEY}`)
  //const yesterdaysGames = await yesterdaysGamesResponse.json()

  //const tomorrowsGamesResponse = await fetch(`https://api.sportsdata.io/v3/nba/scores/json/ScoresBasic/${tomorrow}?key=${process.env.API_KEY}`)
  //const tomorrowsGames = await tomorrowsGamesResponse.json()

  //const playersResponse = await fetch(`https://api.sportsdata.io/v3/nba/stats/json/PlayerSeasonStats/${season}?key=${process.env.API_KEY}`)
  //const players = await playersResponse.json()

  //const finishedGames = getGames("Final", todaysGames, yesterdaysGames, tomorrowsGames)
  //const upcomingGames = getGames("Scheduled", todaysGames, yesterdaysGames, tomorrowsGames)
  //const liveGames = getGames("InProgress", todaysGames, yesterdaysGames, tomorrowsGames)
  //const topPlayers = getTopPlayers(players)

  return (
    <main className="flex-grow overflow-auto">
      {/* liveGames.length !== 0 &&       */}

      <HomeSectionWrapper title="Live:">
        <GamesCarousel
          state="InProgress"
          games={[
            {
              GameID: 12346,
              Status: "InProgress",
              DateTime: "2025-06-11T19:30:00",
              DateTimeUTC: "2025-06-11T23:30:00Z",
              AwayTeam: "LAL",
              HomeTeam: "GSW",
              AwayTeamScore: 58,
              HomeTeamScore: 61,
              IsClosed: false,
              NeutralVenue: false,
              Season: 2025,
              SeasonType: 1,
            },
            {
              GameID: 12346,
              Status: "InProgress",
              DateTime: "2025-06-11T19:30:00",
              DateTimeUTC: "2025-06-11T23:30:00Z",
              AwayTeam: "LAL",
              HomeTeam: "GSW",
              AwayTeamScore: 58,
              HomeTeamScore: 61,
              IsClosed: false,
              NeutralVenue: false,
              Season: 2025,
              SeasonType: 1,
            },
          ]}
        />
      </HomeSectionWrapper>

      <HomeSectionWrapper title="Upcoming Games:">
        <GamesCarousel
          state="Scheduled"
          games={[
            {
              GameID: 12345,
              Status: "Scheduled",
              DateTime: "2025-06-11T19:30:00",
              DateTimeUTC: "2025-06-11T23:30:00Z",
              AwayTeam: "TOR",
              HomeTeam: "CLE",
              AwayTeamScore: 0,
              HomeTeamScore: 0,
              IsClosed: false,
              NeutralVenue: false,
              Season: 2025,
              SeasonType: 1,
            },
            {
              GameID: 12345,
              Status: "Scheduled",
              DateTime: "2025-06-11T19:30:00",
              DateTimeUTC: "2025-06-11T23:30:00Z",
              AwayTeam: "BULLS",
              HomeTeam: "CEL",
              AwayTeamScore: 0,
              HomeTeamScore: 0,
              IsClosed: false,
              NeutralVenue: false,
              Season: 2025,
              SeasonType: 1,
            },
            {
              GameID: 12345,
              Status: "Scheduled",
              DateTime: "2025-06-11T19:30:00",
              DateTimeUTC: "2025-06-11T23:30:00Z",
              AwayTeam: "LAK",
              HomeTeam: "SAS",
              AwayTeamScore: 0,
              HomeTeamScore: 0,
              IsClosed: false,
              NeutralVenue: false,
              Season: 2025,
              SeasonType: 1,
            },
          ]}
        />
      </HomeSectionWrapper>

      <HomeSectionWrapper title="Recent Games:">
        <GamesCarousel
          state="Final"
          games={[
            {
              GameID: 12347,
              Status: "Final",
              DateTime: "2025-06-10T19:30:00",
              DateTimeUTC: "2025-06-10T23:30:00Z",
              AwayTeam: "BOS",
              HomeTeam: "MIA",
              AwayTeamScore: 102,
              HomeTeamScore: 105,
              IsClosed: true,
              NeutralVenue: false,
              Season: 2025,
              SeasonType: 1,
              GameEndDateTime: "2025-06-10T22:15:00",
            },
            {
              GameID: 12347,
              Status: "Final",
              DateTime: "2025-06-10T19:30:00",
              DateTimeUTC: "2025-06-10T23:30:00Z",
              AwayTeam: "SAS",
              HomeTeam: "76",
              AwayTeamScore: 102,
              HomeTeamScore: 105,
              IsClosed: true,
              NeutralVenue: false,
              Season: 2025,
              SeasonType: 1,
              GameEndDateTime: "2025-06-10T22:15:00",
            },
            {
              GameID: 12347,
              Status: "Final",
              DateTime: "2025-06-10T19:30:00",
              DateTimeUTC: "2025-06-10T23:30:00Z",
              AwayTeam: "LAL",
              HomeTeam: "CAV",
              AwayTeamScore: 102,
              HomeTeamScore: 105,
              IsClosed: true,
              NeutralVenue: false,
              Season: 2025,
              SeasonType: 1,
              GameEndDateTime: "2025-06-10T22:15:00",
            },
          ]}
        />
      </HomeSectionWrapper>

      <HomeSectionWrapper title="Top Performers:">
        <TopPerformers
          players={[
            {
              Assists: 162.7,
              BlockedShots: 16.6,
              FieldGoalsPercentage: 31.5,
              FreeThrowsPercentage: 49.9,
              Games: 53,
              Name: "Bradley Beal",
              Points: 591.9,
              Position: "SG",
              Rebounds: 142.4,
              Steals: 31.9,
              Team: "PHO",
              ThreePointersPercentage: 26.4,
              Turnovers: 80.4,
              TwoPointersPercentage: 33.9,
            },
          ]}
        />
      </HomeSectionWrapper>

      <HomeSectionWrapper title="Standings:">
        <Standings
          teams={[
            {
              TeamID: 1,
              Key: "BOS",
              City: "Boston",
              Name: "Celtics",
              Conference: "Eastern",
              Division: "Atlantic",
              Wins: 52,
              Losses: 30,
              Percentage: 0.634,
              GamesBehind: 0,
              ConferenceWins: 32,
              ConferenceLosses: 18,
              DivisionWins: 12,
              DivisionLosses: 6,
              HomeWins: 28,
              HomeLosses: 13,
              AwayWins: 24,
              AwayLosses: 17,
              LastTenWins: 7,
              LastTenLosses: 3,
              Streak: "W3",
              ClinchedPlayoffs: true,
              PlayoffSeed: 2,
              PointsFor: 8300,
              PointsAgainst: 8100,
              NetRating: 5.5,
            },
          ]}
        />
      </HomeSectionWrapper>
    </main>
  );
}

//all things should also be links
