import { SearchResponse } from "@/app/api/route";
import { PlayerInfo, Team } from "@/app/types";

export type SearchResult =
  | { type: "player"; item: PlayerInfo }
  | { type: "team"; item: Team };


export function sortAndFilterList(
  search: string,
  data: SearchResponse
): SearchResult[] {
  const query = search.toLowerCase();

  const players = data.players
    .filter(
      (player) =>
        player.FirstName.toLowerCase().includes(query) ||
        player.LastName.toLowerCase().includes(query)
    )
    .map((player) => ({ type: "player" as const, item: player }));

  const teams = data.teams
    .filter(
      (team) =>
        team.Name.toLowerCase().includes(query) ||
        team.City.toLowerCase().includes(query)
    )
    .map((team) => ({ type: "team" as const, item: team }));

  const combined = [...players, ...teams];

  return combined.sort((a, b) => {
    const queryLower = search.toLowerCase();

    const getLabel = (entry: SearchResult) => {
      if (entry.type === "player") {
        return `${entry.item.FirstName} ${entry.item.LastName}`.toLowerCase();
      } else {
        return `${entry.item.City} ${entry.item.Name}`.toLowerCase();
      }
    };

    const labelA = getLabel(a);
    const labelB = getLabel(b);

    const aStartsWith = labelA.startsWith(queryLower);
    const bStartsWith = labelB.startsWith(queryLower);

    if (aStartsWith && !bStartsWith) return -1;
    if (!aStartsWith && bStartsWith) return 1;

    return labelA.localeCompare(labelB);
  });
}
