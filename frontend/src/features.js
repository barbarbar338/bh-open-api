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
    },
    {
        title: "Get Glory By Steam ID",
        query: `glory/steamid?${defaultSteamID}`,
    },
    {
        title: "Get Glory By Steam URL",
        query: `glory/steamurl?${defaultSteamURL}`,
    },
    {
        title: "Get Ranked By ID",
        query: `ranked/id?${defaultBrawlhallaID}`,
    },
    {
        title: "Get Ranked By Steam ID",
        query: `ranked/steamid?${defaultSteamID}`,
    },
    {
        title: "Get Ranked By Steam URL",
        query: `ranked/steamurl?${defaultSteamURL}`,
    },
    {
        title: "Get Stats By ID",
        query: `stats/id?${defaultBrawlhallaID}`,
    },
    {
        title: "Get Stats By Steam ID",
        query: `ranked/steamid?${defaultSteamID}`,
    },
    {
        title: "Get Stats By Steam URL",
        query: `ranked/steamurl?${defaultSteamURL}`,
    },
    {
        title: "Get All Legends",
        query: `legends/all`,
    },
    {
        title: "Get Legend By ID",
        query: `legends/id?${defaultLegendID}`,
    },
    {
        title: "Get Legend By Name",
        query: `legends/name?${defaultLegendName}`,
    },
    {
        title: "Get Steam Data By Steam ID",
        query: `steamdata/id?${defaultSteamID}`,
        path: "/get-steam-data-by-steam-id",
    },
    {
        title: "Get Steam Data By Steam URL",
        query: `steamdata/url?${defaultSteamURL}`,
    },
    {
        title: "Get Ranked 1v1 Data",
        query: `utils/rankings?${defaultRankedData}&type=1v1`,
    },
    {
        title: "Get Ranked 2v2 Data",
        query: `utils/rankings?${defaultRankedData}&type=2v2`,
    },
    {
        title: "Get Ranked Seasonal Data",
        query: `utils/rankings?${defaultRankedData}&type=seasonal`,
    },
    {
        title: "Get Clan Data",
        query: `utils/clan?${defaultClanID}`,
    },
];

export default FEATURES;
