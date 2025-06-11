const teams = {
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

export default function transformTeamName(nickname) {
  if (nickname && teams[nickname]) {
    return teams[nickname];
  }
  return ["Base", "Base"];
}
