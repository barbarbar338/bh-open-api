import {
    Injectable,
    RequestTimeoutException,
    BadRequestException,
    NotFoundException,
} from "@nestjs/common";
import {
    IRankingsOptions,
    UnknownObject,
    ISteamData,
    BHIDFromSteamID,
    IPlayerRanked,
    IPlayerStats,
    IClan,
    IRanking1v1,
    IStaticAllLegends,
    IStaticLegend,
    IGloryData,
    IRanking2v2,
} from "api-types";
import fetch from "node-fetch";
import CONFIG from "src/config";
import * as xml from "xml2js";

@Injectable()
export class BHAPIService {
    private async makeAPIRequest(
        path: string,
        queries?: UnknownObject,
    ): Promise<unknown> {
        queries = { ...queries, api_key: CONFIG.BH_API_KEY };
        const URLQuery = `?${Object.keys(queries)
            .map(
                query =>
                    `${encodeURIComponent(query)}=${encodeURIComponent(
                        queries[query] as string | boolean | number,
                    )}`,
            )
            .join("&")}`;
        const res = await fetch(`${CONFIG.BH_API_BASE}${path}${URLQuery}`)
            .then(res => {
                if (res.ok) return res.json();
                else throw new RequestTimeoutException("Brawlhalla API error");
            })
            .catch(() => {
                throw new RequestTimeoutException("Brawlhalla API error");
            });
        return res;
    }
    private validateURL(url: string): string {
        const parsed = url.trim();
        if (parsed.startsWith("http://") || url.startsWith("https://"))
            return parsed;
        if (parsed.startsWith("/"))
            return parsed.replace(/^(\/+)(.*)/, "https://$2");
        if (parsed.includes(":/"))
            return parsed.replace(/(.*)(:\/+)(.*)/, "https://$3");
        return `https://${parsed}`;
    }
    private bestRating(rank: IPlayerRanked) {
        let ratings: { peak_rating: number }[] = [rank, ...rank.legends];
        if (rank["2v2"] && rank["2v2"].length > 0)
            ratings = [...ratings, ...rank["2v2"]];
        const peak = ratings.map(r => r.peak_rating);
        return Math.max(...peak);
    }
    private gloryFromWins(totalwins: number): number {
        if (totalwins <= 150) return 20 * totalwins;
        return Math.floor(
            10 * (45 * Math.pow(Math.log10(totalwins * 2), 2)) + 245,
        );
    }
    private gloryFromBestRating(bestrating: number): number {
        let retval = 0;
        if (bestrating < 1200) retval = 250;
        if (bestrating >= 1200 && bestrating < 1286)
            retval = 10 * (25 + 0.872093023 * (86 - (1286 - bestrating)));
        if (bestrating >= 1286 && bestrating < 1390)
            retval = 10 * (100 + 0.721153846 * (104 - (1390 - bestrating)));
        if (bestrating >= 1390 && bestrating < 1680)
            retval = 10 * (187 + 0.389655172 * (290 - (1680 - bestrating)));
        if (bestrating >= 1680 && bestrating < 2000)
            retval = 10 * (300 + 0.428125 * (320 - (2000 - bestrating)));
        if (bestrating >= 2000 && bestrating < 2300)
            retval = 10 * (437 + 0.143333333 * (300 - (2300 - bestrating)));
        if (bestrating >= 2300)
            retval = 10 * (480 + 0.05 * (400 - (2700 - bestrating)));
        return Math.floor(retval);
    }
    private newEloFromOldElo(elo) {
        if (elo >= 1400)
            return Math.floor(1400 + (elo - 1400) / (3 - (3000 - elo) / 800));
        return elo;
    }
    public async getSteamDataByURL(profileUrl: string): Promise<ISteamData> {
        const test = /(steamcommunity\.com\/(id|profiles)\/([^\s]+))/i;
        const match = test.exec(profileUrl);
        if (match) {
            const url = this.validateURL("https://" + match[0] + "?xml=1");
            if (url) {
                const res = await fetch(url)
                    .then(r => {
                        if (r.ok) return r.text();
                        else
                            throw new BadRequestException(
                                "Not a valid Steam profile URL",
                            );
                    })
                    .catch(() => {
                        throw new BadRequestException(
                            "Not a valid Steam profile URL",
                        );
                    });
                const result = await xml.parseStringPromise(res).catch(() => {
                    throw new BadRequestException(
                        "Not a valid Steam profile URL",
                    );
                });
                if (result.profile && result.profile.steamID64)
                    return {
                        name: result.profile.steamID[0],
                        steam_id: result.profile.steamID64[0],
                        steam_url:
                            "https://steamcommunity.com/profiles/" +
                            result.profile.steamID64,
                    };
                else
                    throw new BadRequestException(
                        "Not a valid Steam profile URL",
                    );
            } else
                throw new BadRequestException("Not a valid Steam profile URL");
        } else throw new BadRequestException("Not a valid Steam profile URL");
    }
    public async getSteamDataByID(steamID: string): Promise<ISteamData> {
        const res = await fetch(
            "https://steamcommunity.com/profiles/" + steamID + "?xml=1",
        )
            .then(r => {
                if (r.ok) return r.text();
                else
                    throw new BadRequestException(
                        "Not a valid Steam profile ID",
                    );
            })
            .catch(() => {
                throw new BadRequestException("Not a valid Steam profile ID");
            });
        const result = await xml.parseStringPromise(res).catch(() => {
            throw new BadRequestException("Not a valid Steam profile ID");
        });
        if (result.profile && result.profile.steamID64)
            return {
                name: result.profile.steamID[0],
                steam_id: result.profile.steamID64[0],
                steam_url:
                    "https://steamcommunity.com/profiles/" +
                    result.profile.steamID64,
            };
        else throw new BadRequestException("Not a valid Steam profile ID");
    }
    public async getBHIDFromSteamID(steamID: string): Promise<BHIDFromSteamID> {
        const res = (await this.makeAPIRequest("/search", {
            steamid: steamID,
        })) as BHIDFromSteamID;
        return res;
    }
    private async getBHIDFromSteamURL(steamURL: string): Promise<number> {
        const steamData = await this.getSteamDataByURL(steamURL);
        const { brawlhalla_id } = await this.getBHIDFromSteamID(
            steamData.steam_id,
        );
        return brawlhalla_id;
    }
    public async getBHIDFromName(name: string): Promise<number> {
        const playerArray = (await this.makeAPIRequest("/rankings/1v1/all/1", {
            name,
        })) as IPlayerStats[];
        const res = playerArray.filter(
            p =>
                decodeURIComponent(escape(p.name)).toLowerCase() ==
                name.toLowerCase(),
        );
        if (res[0]) return res[0].brawlhalla_id;
        else throw new NotFoundException("Player not found");
    }
    public async getStatsByBHID(bhid: number): Promise<IPlayerStats> {
        const res = (await this.makeAPIRequest(
            `/player/${bhid}/stats`,
        )) as IPlayerStats;
        return res;
    }
    public async getRankedByBHID(bhid: number): Promise<IPlayerRanked> {
        const res = (await this.makeAPIRequest(
            `/player/${bhid}/ranked`,
        )) as IPlayerRanked;
        return res;
    }
    public async getRankedBySteamID(steamID: string): Promise<IPlayerRanked> {
        const bhID = await this.getBHIDFromSteamID(steamID);
        return this.getRankedByBHID(bhID.brawlhalla_id);
    }
    public async getStatsBySteamID(steamID: string): Promise<IPlayerStats> {
        const bhID = await this.getBHIDFromSteamID(steamID);
        return this.getStatsByBHID(bhID.brawlhalla_id);
    }
    public async getRankedBySteamURL(steamURL: string): Promise<IPlayerRanked> {
        const bhID = await this.getBHIDFromSteamURL(steamURL);
        return this.getRankedByBHID(bhID);
    }
    public async getStatsBySteamURL(steamURL: string): Promise<IPlayerStats> {
        const bhID = await this.getBHIDFromSteamURL(steamURL);
        return this.getStatsByBHID(bhID);
    }
    public async getRankedByName(name: string): Promise<IPlayerRanked> {
        const bhID = await this.getBHIDFromName(name);
        return this.getRankedByBHID(bhID);
    }
    public async getStatsByName(name: string): Promise<IPlayerStats> {
        const bhID = await this.getBHIDFromName(name);
        return this.getStatsByBHID(bhID);
    }

    public async getClanByID(clanID: number): Promise<IClan> {
        const res = (await this.makeAPIRequest(`/clan/${clanID}`)) as IClan;
        return res;
    }
    public async get1v1Rankings({
        region,
        page,
    }: IRankingsOptions): Promise<IRanking1v1[]> {
        const res = (await this.makeAPIRequest(
            `/rankings/1v1/${region.toLocaleLowerCase()}/${page}`,
        )) as IRanking1v1[];
        return res;
    }
    public async get2v2Rankings({
        region,
        page,
    }: IRankingsOptions): Promise<IRanking2v2[]> {
        const res = (await this.makeAPIRequest(
            `/rankings/2v2/${region.toLocaleLowerCase()}/${page}`,
        )) as IRanking2v2[];
        return res;
    }

    public async getAllLegends(): Promise<IStaticAllLegends[]> {
        const res = (await this.makeAPIRequest(
            "/legend/all",
        )) as IStaticAllLegends[];
        return res;
    }
    public async getLegendByID(id: number): Promise<IStaticLegend> {
        const res = (await this.makeAPIRequest(
            `/legend/${id}`,
        )) as IStaticLegend;
        return res;
    }
    public async getLegendByName(name: string): Promise<IStaticLegend> {
        const allLegends = await this.getAllLegends();
        const filtered = allLegends.filter(
            legend => legend.legend_name_key == name,
        );
        if (filtered.length < 1)
            throw new BadRequestException("Legend not found");
        const res = (await this.makeAPIRequest(
            `/legend/${filtered[0].legend_id}`,
        )) as IStaticLegend;
        return res;
    }
    public async getGloryByBHID(bhid: number): Promise<IGloryData> {
        const rankedData = await this.getRankedByBHID(bhid);
        let { games, wins } = rankedData;
        if (rankedData["2v2"] && rankedData["2v2"].length > 0) {
            rankedData["2v2"].forEach(data => {
                wins += data.wins;
                games += data.games;
            });
        }
        const bestElo = this.bestRating(rankedData);
        const glory =
            games < 10
                ? { wins: 0, rating: 0 }
                : {
                      wins: this.gloryFromWins(wins),
                      rating: this.gloryFromBestRating(bestElo),
                  };
        const eloReset = this.newEloFromOldElo(rankedData.rating);
        return {
            brawlhalla_id: bhid,
            name: rankedData.name,
            bestElo,
            eloReset,
            glory,
        };
    }
    public async getGloryBySteamID(steamid: string) {
        const bhdata = await this.getBHIDFromSteamID(steamid);
        return this.getGloryByBHID(bhdata.brawlhalla_id);
    }
    public async getGloryBySteamURL(steamurl: string) {
        const bhid = await this.getBHIDFromSteamURL(steamurl);
        return this.getGloryByBHID(bhid);
    }
    public async getGloryByName(name: string) {
        const bhid = await this.getBHIDFromName(name);
        return this.getGloryByBHID(bhid);
    }
}
