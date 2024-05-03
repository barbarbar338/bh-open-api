import { config } from "dotenv";

config();

export default {
	API_VERSION: "/v1",
	BH_API_BASE: "https://api.brawlhalla.com",
	BH_API_KEY: process.env.BH_API_KEY as string,
	PORT: process.env.PORT as unknown as number,
	MONGODB_URI: process.env.MONGODB_URI as string,
	SYNC_PERIOD: 1000 * 60 * 15,
	SYNC_RATELIMIT: {
		points: 1,
		duration: 60 * 2,
	},
	SEASONAL_RANKED: "rotating",
	BANNERS: {
		bodvar: "https://cms.brawlhalla.com/c/uploads/2021/07/bodvar.png",
		cassidy: "https://cms.brawlhalla.com/c/uploads/2021/07/cassidy.png",
		orion: "https://cms.brawlhalla.com/c/uploads/2021/07/orion.png",
		"lord vraxx":
			"https://cms.brawlhalla.com/c/uploads/2021/07/a_Roster_Pose_VraxxM-1.png",
		gnash: "https://cms.brawlhalla.com/c/uploads/2021/07/gnash.png",
		"queen nai": "https://cms.brawlhalla.com/c/uploads/2021/07/nai.png",
		hattori: "https://cms.brawlhalla.com/c/uploads/2021/07/hattori.png",
		"sir roland": "https://cms.brawlhalla.com/c/uploads/2021/07/roland.png",
		scarlet: "https://cms.brawlhalla.com/c/uploads/2021/07/scarlet.png",
		thatch: "https://cms.brawlhalla.com/c/uploads/2021/07/thatch.png",
		ada: "https://cms.brawlhalla.com/c/uploads/2021/07/ada.png",
		sentinel: "https://cms.brawlhalla.com/c/uploads/2021/07/sentinel.png",
		lucien: "https://cms.brawlhalla.com/c/uploads/2021/07/lucien.png",
		teros: "https://cms.brawlhalla.com/c/uploads/2021/07/teros.png",
		brynn: "https://cms.brawlhalla.com/c/uploads/2021/07/a_Roster_Pose_ValkyrieM.png",
		asuri: "https://cms.brawlhalla.com/c/uploads/2021/07/a_Roster_Pose_CatM.png",
		barraza:
			"https://cms.brawlhalla.com/c/uploads/2021/07/a_Roster_Pose_ApocM.png",
		ember: "https://cms.brawlhalla.com/c/uploads/2021/07/a_Roster_Pose_ElfM.png",
		azoth: "https://cms.brawlhalla.com/c/uploads/2021/07/a_Roster_Pose_AzothM.png",
		koji: "https://cms.brawlhalla.com/c/uploads/2021/07/a_Roster_Pose_SamuraiM.png",
		ulgrim: "https://cms.brawlhalla.com/c/uploads/2021/07/a_Roster_Pose_DwarfM.png",
		diana: "https://cms.brawlhalla.com/c/uploads/2021/07/a_Roster_Pose_MonsterHunterM.png",
		jhala: "https://cms.brawlhalla.com/c/uploads/2021/07/a_Roster_Pose_BarbarianM.png",
		kor: "https://cms.brawlhalla.com/c/uploads/2021/07/a_Roster_Pose_GolemM.png",
		"wu shang":
			"https://cms.brawlhalla.com/c/uploads/2021/07/a_Roster_Pose_MonkM.png",
		val: "https://cms.brawlhalla.com/c/uploads/2021/07/a_Roster_Pose_ValM.png",
		ragnir: "https://cms.brawlhalla.com/c/uploads/2021/07/a_Roster_Pose_DragonM.png",
		cross: "https://cms.brawlhalla.com/c/uploads/2021/07/a_Roster_Pose_CrossM.png",
		mirage: "https://cms.brawlhalla.com/c/uploads/2021/07/a_Roster_Pose_AssassinM.png",
		nix: "https://cms.brawlhalla.com/c/uploads/2021/07/a_Roster_Pose_ReaperM.png",
		mordex: "https://cms.brawlhalla.com/c/uploads/2021/07/a_Roster_Pose_WerewolfM.png",
		yumiko: "https://cms.brawlhalla.com/c/uploads/2021/07/a_Roster_Pose_KitsuneM.png",
		artemis:
			"https://cms.brawlhalla.com/c/uploads/2021/07/a_Roster_Pose_SpaceHunterM.png",
		caspian:
			"https://cms.brawlhalla.com/c/uploads/2021/07/a_Roster_Pose_Thief.png",
		sidra: "https://cms.brawlhalla.com/c/uploads/2021/07/a_Roster_Pose_Corsair.png",
		xull: "https://cms.brawlhalla.com/c/uploads/2021/07/a_Roster_Pose_BruteM.png",
		kaya: "https://cms.brawlhalla.com/c/uploads/2021/07/a_Roster_Pose_IniuitM-1.png",
		isaiah: "https://cms.brawlhalla.com/c/uploads/2021/07/a_Roster_Pose_SoldierM.png",
		jiro: "https://cms.brawlhalla.com/c/uploads/2021/07/a_Roster_Pose_ShinobiM.png",
		"lin fei":
			"https://cms.brawlhalla.com/c/uploads/2021/07/a_Roster_Pose_WuxiaM.png",
		zariel: "https://cms.brawlhalla.com/c/uploads/2021/07/a_Roster_Pose_CelestialM.png",
		rayman: "https://cms.brawlhalla.com/c/uploads/2021/07/a_Roster_Pose_RaymanM.png",
		dusk: "https://cms.brawlhalla.com/c/uploads/2021/07/a_Roster_Pose_ElfwarM.png",
		fait: "https://cms.brawlhalla.com/c/uploads/2021/07/a_Roster_Pose_SpellwitchM.png",
		thor: "https://cms.brawlhalla.com/c/uploads/2021/07/a_Roster_Pose_ThorM.png",
		petra: "https://cms.brawlhalla.com/c/uploads/2021/07/a_Roster_Pose_RagefighterM.png",
		vector: "https://cms.brawlhalla.com/c/uploads/2021/07/a_Roster_Pose_ActualRobotM.png",
		volkov: "https://cms.brawlhalla.com/c/uploads/2021/07/a_Roster_Pose_VampLordM.png",
		onyx: "https://cms.brawlhalla.com/c/uploads/2021/07/a_Roster_Pose_GargoyleM.png",
		jaeyun: "https://cms.brawlhalla.com/c/uploads/2021/07/a_Roster_Pose_SellswordM.png",
		mako: "https://cms.brawlhalla.com/c/uploads/2021/07/a_Roster_Pose_ActualSharkM.png",
		magyar: "https://cms.brawlhalla.com/c/uploads/2021/07/a_Roster_Pose_GhostArmorM.png",
		reno: "https://cms.brawlhalla.com/c/uploads/2021/07/a_Roster_Pose_BountyHunterM.png",
		munin: "https://cms.brawlhalla.com/c/uploads/2021/12/a_Roster_Pose_BirdBardM.png",
		arcadia:
			"https://cms.brawlhalla.com/c/uploads/2022/03/a_Roster_Pose_FairyQueenM.png",
		ezio: "https://cms.brawlhalla.com/c/uploads/2022/07/a_Roster_Pose_EzioM.png",
		tezca: "https://cms.brawlhalla.com/c/uploads/2022/12/a_Roster_Pose_LuchadorM.png",
		loki: "https://cms.brawlhalla.com/c/uploads/2023/09/Loki_icon-1.png",
		thea: "https://cms.brawlhalla.com/c/uploads/2023/03/a_Roster_Pose_SpeedsterM.png",
		redraptor:
			"https://cms.brawlhalla.com/c/uploads/2023/06/a_Roster_Pose_SentaiM.png",
			vivi: "https://cms.brawlhalla.com/c/uploads/2024/04/Vivilegendpage.jpg",
			seven: "https://cms.brawlhalla.com/c/uploads/2023/12/roboengineer-rostericon.png"
	},
};
