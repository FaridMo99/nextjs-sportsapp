import React from "react";
import "server-only";
import GameCard from "./GameCard";
import QuarterTabs from "./QuarterTabs";
import TeamStatsSlider from "./TeamStatsSlider";

async function page({ id }) {
  const GameID = 21022;
  const res = await fetch(
    `https://api.sportsdata.io/v3/nba/stats/json/BoxScore/${GameID}?key=${process.env.API_KEY}`,
  );
  const game = await res.json();
  const { Game, PlayerGames, Quarters, TeamGames } = game;

  return (
    <main className="p-4 flex-grow overflow-auto">
      <GameCard game={Game} />
      <QuarterTabs
        quarters={Quarters}
        hometeam={Game.HomeTeam}
        awayteam={Game.AwayTeam}
        hometeamId={Game.HomeTeamID}
        awayteamId={Game.AwayTeamID}
      />
      <TeamStatsSlider teamGames={TeamGames} />
    </main>
  );
}

export default page;
//if game "Final" give box score
//if game "InProgress" give box score
//if game "Scheduled" give starting lineups

/*const obj = {
  PlayerGames: [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
}*/

/*const PlayerGames = [
  {
    "Name": "OG Anunoby",
    "PlayerID": 20001838,
    "Team": "NY",
    "Position": "SF",
    "Season": 2025,
    "Games": 1,
    "Minutes": 58,
    "Points": 11.8,
    "Rebounds": 14.8,
    "OffensiveRebounds": 0,
    "DefensiveRebounds": 14.8,
    "Assists": 8.9,
    "Steals": 3,
    "BlockedShots": 0,
    "Turnovers": 0,
    "PersonalFouls": 8.9,
    "FieldGoalsAttempted": 12,
    "FieldGoalsMade": 3,
    "FieldGoalsPercentage": 24.6,
    "ThreePointersAttempted": 11.8,
    "ThreePointersMade": 0,
    "ThreePointersPercentage": 0,
    "FreeThrowsAttempted": 5.9,
    "FreeThrowsMade": 5.9,
    "FreeThrowsPercentage": 171.8,
    "PlusMinus": -36.1,
    "PlayerEfficiencyRating": 10.7,
    "FantasyPoints": 28.3,
    "DraftKingsSalary": 9105,
    "FanDuelSalary": 9449,
    "HomeOrAway": "AWAY",
    "Opponent": "BOS",
    "DateTime": "2024-10-22T19:30:00"
  },
  {
    "Name": "Mikal Bridges",
    "PlayerID": 20001998,
    "Team": "NY",
    "Position": "SF",
    "Season": 2025,
    "Games": 1,
    "Minutes": 58,
    "Points": 27.5,
    "Rebounds": 0,
    "OffensiveRebounds": 0,
    "DefensiveRebounds": 0,
    "Assists": 5.9,
    "Steals": 0,
    "BlockedShots": 0,
    "Turnovers": 3,
    "PersonalFouls": 0,
    "FieldGoalsAttempted": 22.3,
    "FieldGoalsMade": 12,
    "FieldGoalsPercentage": 92.4,
    "ThreePointersAttempted": 12,
    "ThreePointersMade": 5.9,
    "ThreePointersPercentage": 49.1,
    "FreeThrowsAttempted": 3,
    "FreeThrowsMade": 0,
    "FreeThrowsPercentage": 0,
    "PlusMinus": -56.7,
    "PlayerEfficiencyRating": 23.1,
    "FantasyPoints": 30.9,
    "DraftKingsSalary": 11682,
    "FanDuelSalary": 10652,
    "HomeOrAway": "AWAY",
    "Opponent": "BOS",
    "DateTime": "2024-10-22T19:30:00"
  },
{
Assists:3
AssistsPercentage:12.9
BlockedShots:0
BlocksPercentage:0
DateTime:"2024-10-22T19:30:00"
Day:"2024-10-22T00:00:00"
DefensiveRebounds:14.8
DefensiveReboundsPercentage:40.5
DoubleDoubles:0
DraftKingsPosition:"SG/SF"
DraftKingsSalary:14088
EffectiveFieldGoalsPercentage:95.5
FanDuelPosition:"SF/SG"
FanDuelSalary:13916
FantasyDataSalary:14088
FantasyDraftPosition:"Scrambled"
FantasyDraftSalary:null
FantasyPoints:58.2
FantasyPointsDraftKings:64
FantasyPointsFanDuel:60
FantasyPointsFantasyDraft:64
FantasyPointsYahoo:60
FieldGoalsAttempted:30.9
FieldGoalsMade:12
FieldGoalsPercentage:66.8
FreeThrowsAttempted:11.8
FreeThrowsMade:11.8
FreeThrowsPercentage:171.8
GameID:21022
Games:1
GlobalGameID:20021022
GlobalOpponentID:20000006
GlobalTeamID:20000009
HomeOrAway:"HOME"
InjuryBodyPart:"Scrambled"
InjuryNotes:"Scrambled"
InjuryStartDate:null
InjuryStatus:"Scrambled"
IsClosed:true
IsGameOver:true
LineupConfirmed:true
LineupStatus:"Scrambled"
Minutes:50
Name:"Jaylen Brown"
OffensiveRebounds:5.9
OffensiveReboundsPercentage:13.8
Opponent:"NY"
OpponentID:6
OpponentPositionRank:27
OpponentRank:9
PersonalFouls:8.9
PlayerEfficiencyRating:43.2
PlayerID:20001672
PlusMinus:39.5
Points:39.5
Position:"SG"
Rebounds:12
Season:2025
SeasonType:1
Seconds:93
Started:1
StatID:1278285
Steals:3
StealsPercentage:5.3
Team:"BOS"
TeamID:9
ThreePointersAttempted:15.5
ThreePointersMade:14.8
ThreePointersPercentage:95.5
TotalReboundsPercentage:26.1
TripleDoubles:0
TrueShootingAttempts:33.9
TrueShootingPercentage:98.8
TurnOversPercentage:14.2
Turnovers:3
TwoPointersAttempted:15.5
TwoPointersMade:5.9
TwoPointersPercentage:38.1
Updated:"2024-10-25T03:59:26"
UsageRatePercentage:56.4
YahooPosition:"SF"
YahooSalary:64
}
] 18stück*/

/*const TeamGames = [
{
Assists:4
AssistsPercentage:null
BlockedShots:8.9
BlocksPercentage:null
DateTime:"2024-10-22T19:30:00"
Day:"2024-10-22T00:00:00"
DefensiveRebounds:49.8
DefensiveReboundsPercentage:null
DoubleDoubles:0
EffectiveFieldGoalsPercentage:105.7
FantasyPoints:307.2
FantasyPointsDraftKings:329
FantasyPointsFanDuel:315.8
FantasyPointsFantasyDraft:329
FantasyPointsYahoo:315.8
FieldGoalsAttempted:134
FieldGoalsMade:73.9
FieldGoalsPercentage:94.7
FreeThrowsAttempted:5
FreeThrowsMade:20.6
FreeThrowsPercentage:128.8
GameID:21022
Games:1
GlobalGameID:20021022
GlobalOpponentID:20000009
GlobalTeamID:20000006
HomeOrAway:"AWAY"
IsClosed:false
IsGameOver:true
LineupConfirmed:null
LineupStatus:"Scrambled"
Losses:1
Minutes:412
Name:"New York Knicks"
OffensiveRebounds:14.8
OffensiveReboundsPercentage:null
Opponent:"BOS"
OpponentID:9
PersonalFouls:20.6
PlayerEfficiencyRating:null
PlusMinus:-197.6
Points:187.3
Possessions:152.3
Rebounds:58.4
Season:2025
SeasonType:1
Seconds:0
StatID:1278268
Steals:5.9
StealsPercentage:null
Team:"NY"
TeamID:6
ThreePointersAttempted:51.5
ThreePointersMade:18.9
ThreePointersPercentage:63.1
TotalReboundsPercentage:null
TripleDoubles:0
TrueShootingAttempts:146.1
TrueShootingPercentage:110.1
TurnOversPercentage:null
Turnovers:18.9
TwoPointersAttempted:82.5
TwoPointersMade:55
TwoPointersPercentage:114.6
Updated:"2024-10-25T03:59:26"
UsageRatePercentage:null
Wins:0
},{
Assists:56.7
AssistsPercentage:null
BlockedShots:8.9
BlocksPercentage:null
DateTime:"2024-10-22T19:30:00"
Day:"2024-10-22T00:00:00"
DefensiveRebounds:49.8
DefensiveReboundsPercentage:null
DoubleDoubles:3
EffectiveFieldGoalsPercentage:112.2
FantasyPoints:420.1
FantasyPointsDraftKings:453.6
FantasyPointsFanDuel:435.5
FantasyPointsFantasyDraft:453.6
FantasyPointsYahoo:435.5
FieldGoalsAttempted:163.2
FieldGoalsMade:82.5
FieldGoalsPercentage:86.8
FreeThrowsAttempted:13.7
FreeThrowsMade:12
FreeThrowsPercentage:150.3
GameID:21022
Games:1
GlobalGameID:20021022
GlobalOpponentID:20000006
GlobalTeamID:20000009
HomeOrAway:"HOME"
IsClosed:false
IsGameOver:true
LineupConfirmed:null
LineupStatus:"Scrambled"
Losses:0
Minutes:412
Name:"Boston Celtics"
OffensiveRebounds:18.9
OffensiveReboundsPercentage:null
Opponent:"NY"
OpponentID:6
PersonalFouls:25.8
PlayerEfficiencyRating:null
PlusMinus:197.6
Points:226.8
Possessions:152.3
Rebounds:68.7
Season:2025
SeasonType:1
Seconds:0
StatID:1278269
Steals:10.3
StealsPercentage:null
Team:"BOS"
TeamID:9
ThreePointersAttempted:104.8
ThreePointersMade:49.8
ThreePointersPercentage:81.6
TotalReboundsPercentage:null
TripleDoubles:0
TrueShootingAttempts:169.3
TrueShootingPercentage:115.1
TurnOversPercentage:null
Turnovers:8.9
TwoPointersAttempted:58.4
TwoPointersMade:32.6
TwoPointersPercentage:96
Updated:"2024-10-25T03:59:26"
UsageRatePercentage:null
Wins:1
}
] */
