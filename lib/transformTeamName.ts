export type TeamAbbreviation =
  | "ATL"
  | "BOS"
  | "BKN"
  | "CHA"
  | "CHI"
  | "CLE"
  | "DAL"
  | "DEN"
  | "DET"
  | "GS"
  | "HOU"
  | "IND"
  | "LAC"
  | "LAL"
  | "MEM"
  | "MIA"
  | "MIL"
  | "MIN"
  | "NO"
  | "NY"
  | "OKC"
  | "ORL"
  | "PHI"
  | "PHO"
  | "POR"
  | "SAC"
  | "SA"
  | "TOR"
  | "UTA"
  | "WAS";

type Teams = Record<TeamAbbreviation, TeamName>;

type TeamIds = Record<string, TeamAbbreviation>;

export type TeamName = [string, string];

const teams: Teams = {
  ATL: ["Atlanta", "Hawks"],
  BOS: ["Boston", "Celtics"],
  BKN: ["Brooklyn", "Nets"],
  CHA: ["Charlotte", "Hornets"],
  CHI: ["Chicago", "Bulls"],
  CLE: ["Cleveland", "Cavaliers"],
  DAL: ["Dallas", "Mavericks"],
  DEN: ["Denver", "Nuggets"],
  DET: ["Detroit", "Pistons"],
  GS: ["Golden State", "Warriors"],
  HOU: ["Houston", "Rockets"],
  IND: ["Indiana", "Pacers"],
  LAC: ["LA", "Clippers"],
  LAL: ["LA", "Lakers"],
  MEM: ["Memphis", "Grizzlies"],
  MIA: ["Miami", "Heat"],
  MIL: ["Milwaukee", "Bucks"],
  MIN: ["Minnesota", "Timberwolves"],
  NO: ["New Orleans", "Pelicans"],
  NY: ["New York", "Knicks"],
  OKC: ["Oklahoma City", "Thunder"],
  ORL: ["Orlando", "Magic"],
  PHI: ["Philadelphia", "Sixers"],
  PHO: ["Phoenix", "Suns"],
  POR: ["Portland", "Trailblazers"],
  SAC: ["Sacramento", "Kings"],
  SA: ["San Antonio", "Spurs"],
  TOR: ["Toronto", "Raptors"],
  UTA: ["Utah", "Jazz"],
  WAS: ["Washington", "Wizards"],
};

const teamIds: TeamIds = {
  1: "WAS",
  2: "CHA",
  3: "ATL",
  4: "MIA",
  5: "ORL",
  6: "NY",
  7: "PHI",
  8: "BKN",
  9: "BOS",
  10: "TOR",
  11: "CHI",
  12: "CLE",
  13: "IND",
  14: "DET",
  15: "MIL",
  16: "MIN",
  17: "UTA",
  18: "OKC",
  19: "POR",
  20: "DEN",
  21: "MEM",
  22: "HOU",
  23: "NO",
  24: "SA",
  25: "DAL",
  26: "GS",
  27: "LAL",
  28: "LAC",
  29: "PHO",
  30: "SAC",
};

export function getTeamAbbreviationById(id: string): TeamAbbreviation {
  return teamIds[id];
}

export default function transformTeamName(
  abbreviation: TeamAbbreviation,
): TeamName {
  if (abbreviation && teams[abbreviation]) {
    return teams[abbreviation];
  }
  return ["Base", "Base"];
}
