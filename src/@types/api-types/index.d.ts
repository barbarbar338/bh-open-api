declare module "api-types" {
    export interface APIRes {
        statusCode: number;
        message: string | string[];
        data: unknown;
        error?: string | string[];
    }
    export interface UnknownObject {
        [key: string]: unknown;
    }
    export interface ISteamData {
        name: string;
        id: number;
        profile: string;
    }
    export interface BHIDFromSteamID {
        name: string;
        id: number;
    }
    export interface IGloryData {
        brawlhalla_id: number;
        name: string;
        bestElo: number;
        eloReset: number;
        glory: {
            wins: number;
            rating: number;
        };
    }

    export interface IRankingsOptions {
        region: RankedRegion;
        page: string | number;
        name: string;
    }
    export interface IPlayerStats {
        brawlhalla_id: number;
        name: string;
        xp: number;
        level: number;
        xp_percentage: number;
        games: number;
        wins: number;
        damagebomb: string;
        damagemine: string;
        damagespikeball: string;
        damagesidekick: string;
        hitsnowball: number;
        kobomb: number;
        komine: number;
        kospikeball: number;
        kosidekick: number;
        kosnowball: number;
        legends: ILegendStats[];
        clan: IPlayerClan | undefined;
    }
    export interface ILegendStats {
        legend_id: number;
        legend_name_key: string;
        damagedealt: string;
        damagetaken: string;
        kos: number;
        falls: number;
        suicides: number;
        teamkos: number;
        matchtime: number;
        games: number;
        wins: number;
        damageunarmed: string;
        damagethrownitem: string;
        damageweaponone: string;
        damageweapontwo: string;
        damagegadgets: string;
        kounarmed: number;
        kothrownitem: number;
        koweaponone: number;
        koweapontwo: number;
        kogadgets: number;
        timeheldweaponone: number;
        timeheldweapontwo: number;
        xp: number;
        level: number;
        xp_percentage: number;
    }
    export interface IPlayerClan {
        clan_name: string;
        clan_id: number;
        clan_xp: string;
        personal_xp: number;
    }
    export interface IPlayerRanked extends IPlayerSeason {
        name: string;
        brawlhalla_id: number;
        global_rank: number;
        region_rank: number;
        legends: ILegendRanked[];
        "2v2": I2v2Team[];
    }
    export interface IPlayerSeason {
        rating: number;
        peak_rating: number;
        tier: RankedTier;
        wins: number;
        games: number;
        region: RankedRegion;
    }
    export interface ILegendRanked {
        legend_id: number;
        legend_name_key: string;
        rating: number;
        peak_rating: number;
        tier: RankedTier;
        wins: number;
        games: number;
    }
    export interface I2v2Team {
        brawlhalla_id_one: number;
        brawlhalla_id_two: number;
        rating: number;
        peak_rating: number;
        tier: RankedTier;
        wins: number;
        games: number;
        teamname: string;
        region: number;
        global_rank: number;
    }
    export interface IClan {
        clan_id: number;
        clan_name: string;
        clan_create_date: number;
        clan_xp: string;
        clan: IClanMember[];
    }
    export interface IClanMember {
        brawlhalla_id: number;
        name: string;
        rank: ClanRank;
        join_date: number;
        xp: number;
    }
    export interface IRanking {
        rank: number;
        rating: number;
        tier: RankedTier;
        games: number;
        wins: number;
        region: RankedRegion;
        peak_rating: number;
    }
    export interface IRanking1v1 extends IRanking {
        name: string;
        brawlhalla_id: number;
        best_legend: number;
        best_legend_games: number;
        best_legend_wins: number;
        twitch_name?: string;
    }
    export interface IRanking2v2 extends IRanking {
        teamname: string;
        brawlhalla_id_one: number;
        brawlhalla_id_two: number;
        twitch_name_one?: string;
        twitch_name_two?: string;
    }
    export interface IStaticAllLegends {
        legend_id: number;
        legend_name_key: string;
        bio_name: string;
        bio_aka: string;
        weapon_one: string;
        weapon_two: string;
        strength: string;
        dexterity: string;
        defense: string;
        speed: string;
    }
    export interface IStaticLegend extends IStaticAllLegends {
        bio_quote: string;
        bio_quote_about_attrib: string;
        bio_quote_from: string;
        bio_quote_from_attrib: string;
        bio_text: string;
        bot_name: string;
    }
    export type ClanRank = "Leader" | "Officer" | "Member" | "Recruit";
    export type RankedTier =
        | "Diamond"
        | "Platinum 5"
        | "Platinum 4"
        | "Platinum 3"
        | "Platinum 2"
        | "Platinum 1"
        | "Gold 5"
        | "Gold 4"
        | "Gold 3"
        | "Gold 2"
        | "Gold 1"
        | "Gold 0"
        | "Silver 5"
        | "Silver 4"
        | "Silver 3"
        | "Silver 2"
        | "Silver 1"
        | "Silver 0"
        | "Bronze 5"
        | "Bronze 4"
        | "Bronze 3"
        | "Bronze 2"
        | "Bronze 1"
        | "Bronze 0"
        | "Tin 5"
        | "Tin 4"
        | "Tin 3"
        | "Tin 2"
        | "Tin 1"
        | "Tin 0";
    export type RankedRegion =
        | "all"
        | "ALL"
        | "us-e"
        | "US-E"
        | "eu"
        | "EU"
        | "sea"
        | "SEA"
        | "brz"
        | "BRZ"
        | "aus"
        | "AUS"
        | "us-w"
        | "US-W"
        | "jpn"
        | "JPN";
}
