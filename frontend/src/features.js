const defaultBrawlhallaID = "brawlhalla_id=3145331";
const defaultSteamID = "steam_id=76561198320003276";
const defaultSteamURL = "steam_url=https://steamcommunity.com/id/barbarbar338/";
const defaultLegendID = "legend_id=3";
const defaultLegendName = "legend_name=cassidy";
const defaultRankedData = "region=eu&page=1";
const defaultClanID = "clan_id=960634";

const FEATURES = [
    {
        title: "Get Glory By ID",
        query: `glory/id?${defaultBrawlhallaID}`,
        path: "/get-glory-by-id",
    },
    {
        title: "Get Glory By Steam ID",
        query: `glory/steamid?${defaultSteamID}`,
        path: "/get-glory-by-steam-id",
    },
    {
        title: "Get Glory By Steam URL",
        query: `glory/steamurl?${defaultSteamURL}`,
        path: "/get-glory-by-steam-url",
    },
    {
        title: "Get Ranked By ID",
        query: `ranked/id?${defaultBrawlhallaID}`,
        path: "/get-ranked-by-id",
    },
    {
        title: "Get Ranked By Steam ID",
        query: `ranked/steamid?${defaultSteamID}`,
        path: "/get-ranked-by-steam-id",
    },
    {
        title: "Get Ranked By Steam URL",
        query: `ranked/steamurl?${defaultSteamURL}`,
        path: "/get-ranked-by-steam-url",
    },
    {
        title: "Get Stats By ID",
        query: `stats/id?${defaultBrawlhallaID}`,
        path: "/get-stats-by-id",
    },
    {
        title: "Get Stats By Steam ID",
        query: `ranked/steamid?${defaultSteamID}`,
        path: "/get-stats-by-steam-id",
    },
    {
        title: "Get Stats By Steam URL",
        query: `ranked/steamurl?${defaultSteamURL}`,
        path: "/get-stats-by-steam-url",
    },
    {
        title: "Get All Legends",
        query: `legends/all`,
        path: "/get-all-legends",
    },
    {
        title: "Get Legend By ID",
        query: `legends/id?${defaultLegendID}`,
        path: "/get-legend-by-id",
    },
    {
        title: "Get Legend By Name",
        query: `legends/name?${defaultLegendName}`,
        path: "/get-legend-by-name",
    },
    {
        title: "Get Steam Data By Steam ID",
        query: `steamdata/id?${defaultSteamID}`,
        path: "/get-steam-data-by-steam-id",
    },
    {
        title: "Get Steam Data By Steam URL",
        query: `steamdata/url?${defaultSteamURL}`,
        path: "/get-steam-data-by-steam-url",
    },
    {
        title: "Get Ranked 1v1 Data",
        query: `utils/ranked1v1?${defaultRankedData}`,
        path: "/get-ranked-1v1-data",
    },
    {
        title: "Get Ranked 2v2 Data",
        query: `utils/ranked2v2?${defaultRankedData}`,
        path: "/get-ranked-2v2-data",
    },
    {
        title: "Get Ranked Seasonal Data",
        query: `utils/rankedseasonal?${defaultRankedData}`,
        path: "/get-ranked-seasonal-data",
    },
    {
        title: "Get Clan Data",
        query: `utils/clan?${defaultClanID}`,
        path: "/get-clan-data",
    },
];

export default FEATURES;
