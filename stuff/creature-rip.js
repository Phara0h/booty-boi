const fasquest = require('fasquest');
var fs = require('fs');
var array = [{"name":"Arbiter","id":"3600"},{"name":"Axiomite","id":"3601"},{"name":"Kolyarut","id":"3602"},{"name":"Pleroma","id":"3603"},{"name":"Skum (ulat-kini)","id":"3604"},{"name":"Faceless Stalker (ugothol)","id":"3605"},{"name":"Alghollthu Master (aboleth)","id":"3606"},{"name":"Veiled Master (vidileth)","id":"3607"},{"name":"Aluum Enforcer","id":"4693"},{"name":"Spiritbound Aluum","id":"4694"},{"name":"Anadi Hunter","id":"4163"},{"name":"Anadi Sage","id":"4164"},{"name":"Anadi Elder","id":"4165"},{"name":"Cassisian (archive Angel)","id":"3608"},{"name":"Choral (choir Angel)","id":"3609"},{"name":"Balisse (confessor Angel)","id":"3610"},{"name":"Astral Deva (emissary Angel)","id":"3611"},{"name":"Animated Broom","id":"3612"},{"name":"Animated Armor","id":"3613"},{"name":"Animated Statue","id":"3614"},{"name":"Giant Animated Statue","id":"3615"},{"name":"Ankhrav","id":"3616"},{"name":"Hive Mother","id":"3617"},{"name":"Gorilla","id":"3618"},{"name":"Megaprimatus","id":"3619"},{"name":"Arboreal Warden","id":"3620"},{"name":"Awakened Tree","id":"3621"},{"name":"Arboreal Regent","id":"3622"},{"name":"Lantern Archon","id":"3623"},{"name":"Horned Archon","id":"3624"},{"name":"Legion Archon","id":"3625"},{"name":"Shield Archon","id":"3626"},{"name":"Asanbosam","id":"4183"},{"name":"Lyrakien (wanderer Azata)","id":"3517"},{"name":"Gancanagh (passion Azata)","id":"3518"},{"name":"Lillend (muse Azata)","id":"3519"},{"name":"Ghaele (crusader Azata)","id":"3520"},{"name":"Banshee","id":"3521"},{"name":"Baomal","id":"3522"},{"name":"Barghest","id":"3523"},{"name":"Greater Barghest","id":"3524"},{"name":"Basilisk","id":"3525"},{"name":"Vampire Bat Swarm","id":"3526"},{"name":"Giant Bat","id":"3527"},{"name":"Grizzly Bear","id":"3528"},{"name":"Cave Bear","id":"3529"},{"name":"Bee Swarm","id":"4137"},{"name":"Flash Beetle","id":"3530"},{"name":"Giant Stag Beetle","id":"3531"},{"name":"Bida","id":"4184"},{"name":"Biloko Warrior","id":"4185"},{"name":"Biloko Veteran","id":"4186"},{"name":"Eloko","id":"4187"},{"name":"Bloodseeker","id":"3532"},{"name":"Boar","id":"3533"},{"name":"Daeodon","id":"3534"},{"name":"Blood Boar","id":"4230"},{"name":"Boggard Scout","id":"3535"},{"name":"Boggard Warrior","id":"3536"},{"name":"Boggard Swampseer","id":"3537"},{"name":"Brain Collector","id":"3546"},{"name":"Bugbear Thug","id":"3547"},{"name":"Bugbear Tormentor","id":"3548"},{"name":"Bulette","id":"3549"},{"name":"Bunyip","id":"3550"},{"name":"Caligni Dancer","id":"3551"},{"name":"Caligni Creeper","id":"3552"},{"name":"Caligni Stalker","id":"3553"},{"name":"Calikang","id":"4695"},{"name":"Fiery Leopard","id":"4143"},{"name":"Leopard","id":"3554"},{"name":"Lion","id":"3555"},{"name":"Tiger","id":"3556"},{"name":"Smilodon","id":"3557"},{"name":"Catfolk Pouncer","id":"3558"},{"name":"Cauthooj","id":"3559"},{"name":"Purple Worm","id":"3573"},{"name":"Azure Worm","id":"3574"},{"name":"Crimson Worm","id":"3575"},{"name":"Centaur","id":"3576"},{"name":"Giant Centipede","id":"3577"},{"name":"Centipede Swarm","id":"3578"},{"name":"Changeling Exile","id":"3579"},{"name":"Charau-ka Warrior","id":"4188"},{"name":"Charau-ka Acolyte Of Angazhan","id":"4189"},{"name":"Charau-ka Butcher","id":"4190"},{"name":"Chimera","id":"3580"},{"name":"Chuul","id":"3581"},{"name":"Cloaker","id":"3582"},{"name":"Cockatrice","id":"3583"},{"name":"Crocodile","id":"3584"},{"name":"Deinosuchus","id":"3585"},{"name":"Cyclops","id":"3586"},{"name":"Great Cyclops","id":"3587"},{"name":"Cacodaemon (harvester Daemon)","id":"3588"},{"name":"Ceustodaemon (guardian Daemon)","id":"3589"},{"name":"Leukodaemon (pestilence Daemon)","id":"3590"},{"name":"Crucidaemon (torture Daemon)","id":"4696"},{"name":"Astradaemon (void Daemon)","id":"3591"},{"name":"Dalos","id":"4578"},{"name":"Vine Lasher","id":"4153"},{"name":"Bloodlash Bush","id":"4152"},{"name":"Deculi","id":"4579"},{"name":"Deep Gnome Scout","id":"3634"},{"name":"Deep Gnome Warrior","id":"3635"},{"name":"Deep Gnome Rockwarden","id":"3636"},{"name":"Quasit","id":"3637"},{"name":"Succubus (lust Demon)","id":"3638"},{"name":"Vrock (wrath Demon)","id":"3639"},{"name":"Kalavakus","id":"4231"},{"name":"Glabrezu (treachery Demon)","id":"3640"},{"name":"Nalfeshnee (boar Demon)","id":"4697"},{"name":"Shemhazian (mutilation Demon)","id":"3641"},{"name":"Marilith (pride Demon)","id":"3642"},{"name":"Balor (fire Demon)","id":"3643"},{"name":"Dero Stalker","id":"3644"},{"name":"Dero Strangler","id":"3645"},{"name":"Dero Magister","id":"3646"},{"name":"Lemure","id":"3647"},{"name":"Imp","id":"3648"},{"name":"Barbazu (bearded Devil)","id":"3649"},{"name":"Erinys (fury Devil)","id":"3650"},{"name":"Osyluth","id":"4232"},{"name":"Phistophilus (contract Devil)","id":"3651"},{"name":"Gelugon (ice Devil)","id":"3652"},{"name":"Cornugon (horned Devil)","id":"4698"},{"name":"Pit Fiend (tyrant Devil)","id":"3653"},{"name":"Devourer","id":"4580"},{"name":"Dhampir Wizard","id":"3659"},{"name":"Dezullon","id":"3658"},{"name":"Velociraptor","id":"3660"},{"name":"Deinonychus","id":"3661"},{"name":"Ankylosaurus","id":"3662"},{"name":"Stegosaurus","id":"3663"},{"name":"Triceratops","id":"3664"},{"name":"Brontosaurus","id":"3665"},{"name":"Tyrannosaurus","id":"3666"},{"name":"Guard Dog","id":"3667"},{"name":"Riding Dog","id":"3668"},{"name":"Doorwarden","id":"4166"},{"name":"Doppelganger","id":"3669"},{"name":"Dragon Turtle","id":"3679"},{"name":"White Dragon","id":"4112"},{"name":"Black Dragon","id":"4100"},{"name":"Green Dragon","id":"4106"},{"name":"Blue Dragon","id":"4103"},{"name":"Adult White Dragon","id":"4113"},{"name":"Red Dragon","id":"4109"},{"name":"Adult Black Dragon","id":"4101"},{"name":"Adult Green Dragon","id":"4107"},{"name":"Adult Blue Dragon","id":"4104"},{"name":"Adult Red Dragon","id":"4110"},{"name":"Ancient White Dragon","id":"4114"},{"name":"Ancient Black Dragon","id":"4102"},{"name":"Ancient Green Dragon","id":"4108"},{"name":"Ancient Blue Dragon","id":"4105"},{"name":"Ancient Red Dragon","id":"4111"},{"name":"Lesser Manifestation Of Dahak","id":"4781"},{"name":"Manifestation Of Dahak","id":"4789"},{"name":"Brass Dragon","id":"4116"},{"name":"Copper Dragon","id":"4122"},{"name":"Bronze Dragon","id":"4119"},{"name":"Silver Dragon","id":"4128"},{"name":"Adult Brass Dragon","id":"4117"},{"name":"Gold Dragon","id":"4125"},{"name":"Adult Copper Dragon","id":"4123"},{"name":"Adult Bronze Dragon","id":"4120"},{"name":"Adult Silver Dragon","id":"4129"},{"name":"Adult Gold Dragon","id":"4126"},{"name":"Ancient Brass Dragon","id":"4118"},{"name":"Ancient Copper Dragon","id":"4124"},{"name":"Ancient Bronze Dragon","id":"4121"},{"name":"Ancient Silver Dragon","id":"4130"},{"name":"Ancient Gold Dragon","id":"4127"},{"name":"Mengkare","id":"4778"},{"name":"Dragon, Magma","id":"4555"},{"name":"Adult Magma Dragon","id":"4556"},{"name":"Ancient Magma Dragon","id":"4557"},{"name":"Dragonscarred Dead","id":"4581"},{"name":"Dragonshard Guardian","id":"4769"},{"name":"Drakauthix","id":"3680"},{"name":"River Drake","id":"3681"},{"name":"Flame Drake","id":"3682"},{"name":"Jungle Drake","id":"3683"},{"name":"Wyvern","id":"3684"},{"name":"Frost Drake","id":"3685"},{"name":"Desert Drake","id":"3686"},{"name":"Drow Fighter","id":"3687"},{"name":"Drow Rogue","id":"3688"},{"name":"Drow Priestess","id":"3689"},{"name":"Duergar Sharpshooter","id":"3690"},{"name":"Duergar Bombardier","id":"3691"},{"name":"Duergar Taskmaster","id":"3692"},{"name":"Dullahan","id":"3693"},{"name":"Eagle","id":"3694"},{"name":"Giant Eagle","id":"3695"},{"name":"Electric Eel","id":"3696"},{"name":"Giant Moray Eel","id":"3697"},{"name":"Elananx","id":"3698"},{"name":"Zephyr Hawk","id":"3709"},{"name":"Living Whirlwind","id":"3710"},{"name":"Invisible Stalker","id":"3711"},{"name":"Storm Lord","id":"3712"},{"name":"Elemental Hurricane","id":"3713"},{"name":"Sod Hound","id":"3714"},{"name":"Living Landslide","id":"3715"},{"name":"Xorn","id":"3716"},{"name":"Stone Mauler","id":"3717"},{"name":"Elemental Avalanche","id":"3718"},{"name":"Cinder Rat","id":"3719"},{"name":"Living Wildfire","id":"3720"},{"name":"Salamander","id":"3721"},{"name":"Firewyrm","id":"3722"},{"name":"Elemental Inferno","id":"3723"},{"name":"Air Mephit","id":"3724"},{"name":"Earth Mephit","id":"3725"},{"name":"Fire Mephit","id":"3726"},{"name":"Water Mephit","id":"3727"},{"name":"Brine Shark","id":"3728"},{"name":"Living Waterfall","id":"3729"},{"name":"Quatoid","id":"3730"},{"name":"Tidal Master","id":"3731"},{"name":"Elemental Tsunami","id":"3732"},{"name":"Elephant","id":"3733"},{"name":"Mammoth","id":"3734"},{"name":"Emperor Bird","id":"4167"},{"name":"Ether Spider","id":"3735"},{"name":"Ettin","id":"3736"},{"name":"Faerie Dragon","id":"3737"},{"name":"Grothlut","id":"3738"},{"name":"Drider","id":"3739"},{"name":"Snapping Flytrap","id":"3748"},{"name":"Giant Flytrap","id":"3749"},{"name":"Forge-spurned","id":"4582"},{"name":"Gargoyle","id":"3893"},{"name":"Kapoacinth","id":"3750"},{"name":"Gashadokuro","id":"4583"},{"name":"Janni","id":"3751"},{"name":"Djinni","id":"3752"},{"name":"Shaitan","id":"3753"},{"name":"Efreeti","id":"3754"},{"name":"Marid","id":"3755"},{"name":"Ghost Commoner","id":"3774"},{"name":"Ghost Mage","id":"3775"},{"name":"Ghoul","id":"3776"},{"name":"Ghast","id":"3777"},{"name":"Ghastly Bears","id":"4248"},{"name":"Hill Giant","id":"3756"},{"name":"Stone Giant","id":"3757"},{"name":"Frost Giant","id":"3758"},{"name":"Fire Giant","id":"3759"},{"name":"Cloud Giant","id":"3760"},{"name":"Shadow Giant","id":"4233"},{"name":"Storm Giant","id":"3761"},{"name":"Rune Giant","id":"3762"},{"name":"Dragonstorm Fire Giants","id":"4780"},{"name":"Gibbering Mouther","id":"3763"},{"name":"Gimmerling","id":"3764"},{"name":"Gnoll Hunter","id":"3765"},{"name":"Gnoll Cultist","id":"3766"},{"name":"Gnoll Sergeant","id":"3767"},{"name":"Goblin Warrior","id":"3768"},{"name":"Goblin Commando","id":"3769"},{"name":"Goblin Pyro","id":"3770"},{"name":"Goblin War Chanter","id":"3771"},{"name":"Goblin Dog","id":"3789"},{"name":"Gogiteth","id":"3790"},{"name":"Flesh Golem","id":"3791"},{"name":"Alchemical Golem","id":"3792"},{"name":"Clay Golem","id":"3793"},{"name":"Stone Golem","id":"3794"},{"name":"Lazurite-infused Stone Golems","id":"4574"},{"name":"Iron Golem","id":"3795"},{"name":"Adamantine Golem","id":"3796"},{"name":"Grauladon","id":"4168"},{"name":"Graveknight","id":"4098"},{"name":"Graveshell","id":"4169"},{"name":"Mitflit","id":"3797"},{"name":"Pugwampi","id":"3798"},{"name":"Jinkin","id":"3799"},{"name":"Griffon","id":"3800"},{"name":"Grikkitog","id":"3801"},{"name":"Lesser Death","id":"3803"},{"name":"Grim Reaper","id":"3802"},{"name":"Grippli Scout","id":"4191"},{"name":"Grippli Archer","id":"4192"},{"name":"Grippli Greenspeaker","id":"4193"},{"name":"Gug","id":"3804"},{"name":"Guthallath","id":"3805"},{"name":"Sea Hag","id":"3806"},{"name":"Green Hag","id":"3807"},{"name":"Annis Hag","id":"3808"},{"name":"Night Hag","id":"3809"},{"name":"Harpy","id":"3822"},{"name":"Hell Hound","id":"3823"},{"name":"Nessian Warhound","id":"3824"},{"name":"Hellcrown","id":"4170"},{"name":"Hobgoblin Soldier","id":"3825"},{"name":"Hobgoblin Archer","id":"3826"},{"name":"Hobgoblin General","id":"3827"},{"name":"Homunculus","id":"3828"},{"name":"Alchemical Drudges","id":"4148"},{"name":"Riding Pony","id":"3829"},{"name":"Riding Horse","id":"3830"},{"name":"War Pony","id":"3831"},{"name":"Stone Horse","id":"4141"},{"name":"War Horse","id":"3832"},{"name":"Hydra","id":"3833"},{"name":"Hyena","id":"3834"},{"name":"Hyaenodon","id":"3835"},{"name":"Kishi","id":"4194"},{"name":"Kobold Warrior","id":"3836"},{"name":"Kobold Scout","id":"3837"},{"name":"Kobold Dragon Mage","id":"3838"},{"name":"Kraken","id":"3839"},{"name":"Krooth","id":"3840"},{"name":"Lamia","id":"3841"},{"name":"Lamia Matriarch","id":"3842"},{"name":"Leaf Leshy","id":"3843"},{"name":"Gourd Leshy","id":"3844"},{"name":"Fungus Leshy","id":"3845"},{"name":"Lich","id":"3849"},{"name":"Demilich","id":"3850"},{"name":"Crag Linnorm","id":"3866"},{"name":"Ice Linnorm","id":"3867"},{"name":"Tarn Linnorm","id":"3868"},{"name":"Tor Linnorm","id":"3869"},{"name":"Living Sap","id":"4195"},{"name":"Giant Gecko","id":"3870"},{"name":"Giant Monitor Lizard","id":"3871"},{"name":"Giant Frilled Lizard","id":"3872"},{"name":"Lizardfolk Defender","id":"3873"},{"name":"Lizardfolk Scout","id":"3874"},{"name":"Lizardfolk Stargazer","id":"3875"},{"name":"Manticore","id":"3876"},{"name":"Giant Mantis","id":"3877"},{"name":"Deadly Mantis","id":"3878"},{"name":"Medusa","id":"3879"},{"name":"Merfolk Warrior","id":"3880"},{"name":"Merfolk Wavecaller","id":"3881"},{"name":"Mimic","id":"3882"},{"name":"Minotaur","id":"3883"},{"name":"Mokele-mbembe","id":"4196"},{"name":"Mu Spore","id":"3884"},{"name":"Mukradi","id":"3885"},{"name":"Mummy Guardian","id":"3886"},{"name":"Mummy Pharaoh","id":"3887"},{"name":"Drunken Farmer","id":"4136"},{"name":"Bloody Blade Mercenaries","id":"4202"},{"name":"Skorp And Venak","id":"4200"},{"name":"Warbal Bumblebrasher","id":"4207"},{"name":"Alak Stagram","id":"4198"},{"name":"Ekujae Guardians","id":"4208"},{"name":"Skeletal Hellknight","id":"4201"},{"name":"Calmont","id":"4199"},{"name":"Graytusk","id":"4147"},{"name":"Hallod","id":"4139"},{"name":"The Behemoth","id":"4150"},{"name":"Charming Scoundrel","id":"4544"},{"name":"Dmiri Yoltosha","id":"4203"},{"name":"Hellknight Armiger","id":"4546"},{"name":"Lord Nar","id":"4146"},{"name":"Pathfinder Field Agent","id":"4552"},{"name":"Rain-scribe","id":"4550"},{"name":"Renali","id":"4205"},{"name":"The Amalgam","id":"4149"},{"name":"The Sculptor","id":"4145"},{"name":"Virtuous Defender","id":"4548"},{"name":"Malarunk","id":"4204"},{"name":"Mercenary Sailors","id":"4244"},{"name":"Vilree","id":"4151"},{"name":"Voz Lirayne","id":"4206"},{"name":"Charau-ka Dragon Priest","id":"4213"},{"name":"Nketiah","id":"4215"},{"name":"Scarlet Triad Sneaks","id":"4241"},{"name":"Scarlet Triad Thug","id":"4243"},{"name":"Gerhard Pendergrast","id":"4211"},{"name":"Hezle","id":"4212"},{"name":"Jahsi","id":"4209"},{"name":"Kelda Halrig","id":"4585"},{"name":"Racharak","id":"4210"},{"name":"Scarlet Triad Poisoners","id":"4246"},{"name":"Belmazog","id":"4214"},{"name":"Heuberk Thropp","id":"4240"},{"name":"One-eye Amnin","id":"4245"},{"name":"Rusty Mae","id":"4242"},{"name":"Barushak Il-varashma","id":"4247"},{"name":"Hellknight Paravicar","id":"4547"},{"name":"Pathfinder Venture-captain","id":"4553"},{"name":"Privateer Captain","id":"4545"},{"name":"Scarlet Triad Snipers","id":"4251"},{"name":"Tempest-sun Mage","id":"4551"},{"name":"Thea","id":"4569"},{"name":"Veteran Reclaimer","id":"4549"},{"name":"Corrupt Guards","id":"4567"},{"name":"Vaklish","id":"4250"},{"name":"Duergar Slave Lords","id":"4576"},{"name":"Jaggaki","id":"4249"},{"name":"Talamira","id":"4565"},{"name":"Xevalorg","id":"4566"},{"name":"Falrok","id":"4575"},{"name":"King Harral","id":"4572"},{"name":"Kralgurn","id":"4568"},{"name":"Zephyr Guard","id":"4707"},{"name":"Accursed Forge-spurned","id":"4570"},{"name":"Ilssrah Embermead","id":"4586"},{"name":"Scarlet Triad Enforcers","id":"4705"},{"name":"Scarlet Triad Mages","id":"4709"},{"name":"Zuferian","id":"4571"},{"name":"Veshumirix","id":"4587"},{"name":"Bshez “sand Claws” Shak","id":"4704"},{"name":"Ingnovim’s Assistants","id":"4785"},{"name":"Promise Guard","id":"4783"},{"name":"Scarlet Triad Boss","id":"4708"},{"name":"Weathered Wail","id":"4712"},{"name":"Animated Dragonstorms","id":"4779"},{"name":"Ishti","id":"4706"},{"name":"Hermean Mutants","id":"4786"},{"name":"Ingnovim Tluss","id":"4784"},{"name":"Teyam Ishtori","id":"4710"},{"name":"Uri Zandivar","id":"4711"},{"name":"Emaliza Zandivar","id":"4776"},{"name":"Ilgreth","id":"4788"},{"name":"Inizra Arumelo","id":"4777"},{"name":"Rinnarv Bontimar","id":"4782"},{"name":"Candlaron’s Echo","id":"4787"},{"name":"Dark Naga","id":"3888"},{"name":"Guardian Naga","id":"3889"},{"name":"Nightmare","id":"3890"},{"name":"Greater Nightmare","id":"3891"},{"name":"Nilith","id":"3892"},{"name":"Naiad","id":"3910"},{"name":"Dryad","id":"3911"},{"name":"Naiad Queen","id":"3912"},{"name":"Dryad Queen (hamadryad)","id":"3913"},{"name":"Giant Octopus","id":"3914"},{"name":"Ofalth","id":"3915"},{"name":"Ogre Warrior","id":"3916"},{"name":"Ogre Glutton","id":"3917"},{"name":"Ogre Boss","id":"3918"},{"name":"Sewer Ooze","id":"3919"},{"name":"Gelatinous Cube","id":"3920"},{"name":"Blood Ooze","id":"4154"},{"name":"Ochre Jelly","id":"3921"},{"name":"Black Pudding","id":"3922"},{"name":"Carnivorous Crystal","id":"4577"},{"name":"Immortal Ichor","id":"4699"},{"name":"Orc Brute","id":"3923"},{"name":"Orc Warrior","id":"3924"},{"name":"Orc Alchemists","id":"4144"},{"name":"Orc Warchief","id":"3925"},{"name":"Otyugh","id":"3926"},{"name":"Owlbear","id":"3927"},{"name":"Pegasus","id":"3928"},{"name":"Phoenix","id":"3929"},{"name":"Tiefling","id":"3930"},{"name":"Duskwalker","id":"3931"},{"name":"Aasimar","id":"3932"},{"name":"Poltergeist","id":"3933"},{"name":"Saggorak Poltergeists","id":"4573"},{"name":"Poracha","id":"3934"},{"name":"Voidworm","id":"4094"},{"name":"Naunet","id":"4095"},{"name":"Keketar","id":"4096"},{"name":"Nosoi","id":"3943"},{"name":"Morrigna","id":"3944"},{"name":"Pteranodon","id":"3945"},{"name":"Quetzalcoatlus","id":"3946"},{"name":"Quelaunt","id":"3947"},{"name":"Dandasuka","id":"3948"},{"name":"Raja Rakshasa","id":"3949"},{"name":"Giant Rat","id":"3950"},{"name":"Icy Rats","id":"4142"},{"name":"Rat Swarm","id":"3951"},{"name":"Ratfolk Grenadier","id":"3952"},{"name":"Redcap","id":"3953"},{"name":"Reefclaw","id":"3954"},{"name":"Remnant Of Barzillai","id":"4234"},{"name":"Remorhaz","id":"3966"},{"name":"Roc","id":"3967"},{"name":"Roper","id":"3968"},{"name":"Rusalka","id":"4235"},{"name":"Rust Monster","id":"3969"},{"name":"Sabosan","id":"4197"},{"name":"Satyr","id":"3970"},{"name":"Giant Scorpion","id":"3971"},{"name":"Scorpion Swarm","id":"3972"},{"name":"Sea Devil Scout","id":"3973"},{"name":"Sea Devil Brute","id":"3974"},{"name":"Sea Devil Baron","id":"3975"},{"name":"Sea Serpent","id":"3976"},{"name":"Shadow","id":"3977"},{"name":"Greater Shadow","id":"3978"},{"name":"Shambler","id":"3979"},{"name":"Great White Shark","id":"3980"},{"name":"Megalodon","id":"3981"},{"name":"Shining Child","id":"3987"},{"name":"Shoggoth","id":"3988"},{"name":"Shuln","id":"3989"},{"name":"Simurgh","id":"3990"},{"name":"Envyspawn","id":"3991"},{"name":"Gluttonyspawn","id":"3992"},{"name":"Greedspawn","id":"3993"},{"name":"Lustspawn","id":"3994"},{"name":"Pridespawn","id":"3995"},{"name":"Slothspawn","id":"3996"},{"name":"Wrathspawn","id":"3997"},{"name":"Skeleton Guard","id":"3999"},{"name":"Skeletal Champion","id":"4000"},{"name":"Skeletal Horse","id":"4001"},{"name":"Skeletal Giant","id":"4002"},{"name":"Skeletal Hulk","id":"4003"},{"name":"Skulltaker","id":"4012"},{"name":"Slurk","id":"4013"},{"name":"Viper","id":"4014"},{"name":"Ball Python","id":"4015"},{"name":"Giant Lightning Serpent","id":"4138"},{"name":"Giant Viper","id":"4016"},{"name":"Giant Anaconda","id":"4017"},{"name":"Giant Solifugid","id":"4700"},{"name":"Duneshaker Solifugid","id":"4701"},{"name":"Chaotic Evil Soulbound Doll","id":"4038"},{"name":"Chaotic Good Soulbound Doll","id":"4032"},{"name":"Chaotic Neutral Soulbound Doll","id":"4035"},{"name":"Lawful Evil Soulbound Doll","id":"4036"},{"name":"Lawful Good Soulbound Doll","id":"4030"},{"name":"Lawful Neutral Soulbound Doll","id":"4033"},{"name":"Neutral Evil Soulbound Doll","id":"4037"},{"name":"Neutral Good Soulbound Doll","id":"4031"},{"name":"Neutral Soulbound Doll","id":"4034"},{"name":"Soulbound Ruin","id":"4584"},{"name":"Xotani, The Firebleeder","id":"4771"},{"name":"Tarrasque, The Armageddon Engine","id":"4770"},{"name":"Sphinx","id":"4018"},{"name":"Spider Swarm","id":"4019"},{"name":"Hunting Spider","id":"4020"},{"name":"Giant Tarantula","id":"4021"},{"name":"Goliath Spider","id":"4022"},{"name":"Sprite","id":"4023"},{"name":"Grig","id":"4024"},{"name":"Pixie","id":"4025"},{"name":"Tengu Sneak","id":"4026"},{"name":"Terotricus","id":"4027"},{"name":"Tixitog","id":"4171"},{"name":"Treerazer","id":"4051"},{"name":"Troll","id":"4052"},{"name":"Troll King","id":"4053"},{"name":"Tzitzimitl","id":"4772"},{"name":"Unicorn","id":"4054"},{"name":"Uthul","id":"4055"},{"name":"Vampire Spawn","id":"4056"},{"name":"Vampire Count","id":"4057"},{"name":"Vampire Mastermind","id":"4058"},{"name":"Vazgorlu","id":"4773"},{"name":"Augur","id":"4236"},{"name":"Evangelist","id":"4237"},{"name":"Interlocutor","id":"4238"},{"name":"Precentor","id":"4239"},{"name":"Warg","id":"4059"},{"name":"Winter Wolf","id":"4060"},{"name":"Warsworn","id":"4061"},{"name":"Giant Wasp","id":"4062"},{"name":"Wasp Swarm","id":"4063"},{"name":"Web Lurker","id":"4064"},{"name":"Wemmuth","id":"4065"},{"name":"Wendigo","id":"4066"},{"name":"Wererat","id":"4076"},{"name":"Werewolf","id":"4077"},{"name":"Werebear","id":"4078"},{"name":"Wight","id":"4079"},{"name":"Will-o’-wisp","id":"4080"},{"name":"Witchwyrd","id":"4702"},{"name":"Mangy Wolves","id":"4134"},{"name":"Wolf","id":"4081"},{"name":"Caustic Wolf","id":"4135"},{"name":"Dire Wolf","id":"4082"},{"name":"Mutant Wolves","id":"4140"},{"name":"Wraith","id":"4083"},{"name":"Aiudara Wraith","id":"4768"},{"name":"Wyrmwraith","id":"4774"},{"name":"Elder Wyrmwraith","id":"4775"},{"name":"Xotanispawn","id":"4703"},{"name":"Xulgath Warrior","id":"4084"},{"name":"Xulgath Skulker","id":"4085"},{"name":"Xulgath Leader","id":"4086"},{"name":"Yeti","id":"4087"},{"name":"Zaramuun","id":"4088"},{"name":"Zombie Shambler","id":"4089"},{"name":"Plague Zombie","id":"4090"},{"name":"Zombie Brute","id":"4091"},{"name":"Zombie Hulk","id":"4092"},{"name":"pleroma","id":"3603"},{"name":"arbiter","id":"3600"},{"name":"axiomite","id":"3601"},{"name":"kolyarut","id":"3602"},{"name":"pleroma","id":"3603"}]
const htmlparser2 = require("htmlparser2");
async function rip() {
  // for (var i = 0; i < array.length; i++) {
  //
  for (var i = 0; i < array.length; i++) {
    var options = {
      uri: 'http://pf2.easytool.es/php/actionInfo.php',
      method: 'POST',
      form: {
        id_feature: array[i].id
      },
      resolveWithFullResponse: true,
      simple: false,
    }
    console.log(array[i].name, i)
    var res;
    try {
      res = await fasquest.request(options);
    } catch (e) {
      res = await fasquest.request(options);
    }

    var traits;
    try {
      var traitsHtml = res.body.match(/\<section class='traits'\>(.*?)\<\/section\>/gs)[0];
      traits = Array.from(traitsHtml.matchAll(/ title='\<strong\>(?<trait>.*?) Trait\<\/strong\>'/gi)).map(a => a.groups.trait);
    } catch (e) {
      console.log(`traits error for ${array[i].name}`)
    }
    array[i].traits = traits;

    fs.writeFileSync('temp.txt', res.body);
    var htmls = fs.readFileSync('temp.txt', {
      encoding: 'UTF8'
    }).replace(/\n/gms, '').replace(/\r/gms, '');

    var description = "";
    try {
      description = Array.from(htmls.matchAll(/\<section class=.description.\><p class="fancy">(?<trait>.*?)<\/p>\<\/section\>/gms)).map(a => a.groups.trait)[0];
    } catch (e) {
      console.log(`details error for ${array[i].name}`)
    }
    array[i].description = description;

    array[i].details = {};
    array[i].saves = {};
    array[i].stats = {};

    const detailsRegex = /\<section class=.details.\>(?<details>.*?)<\/section>/gms;
    htmls = htmls.replace(/\<i class=.pf2 action1.*?><\/i>/gms,'<p>(1x Action)</p>')
    .replace(/\<i class=.pf2 action2.*?><\/i>/gms,'<p>(2x Actions)</p>')
    .replace(/\<i class=.pf2 action3.*?><\/i>/gms,'<p>(3x Actions)</p>')
    .replace(/\<i class=.pf2 Reaction.*?><\/i>/gms,'<p>(Reaction)</p>')
    .replace(/\<i class=.pf2 actionF.*?><\/i>/gms,'<p>(Free Action)</p>');

    var detailsHtml = Array.from(htmls.matchAll(detailsRegex)).map(a => a.groups.details)

    for (var j = 0; j < detailsHtml.length; j++) {
      var details = await parseDetails(detailsHtml[j]);
      for (var k = 0; k < details.length; k++) {
        var sd = details[k].split(':');
        sd[0] = sd[0].toLowerCase().replace(/ /g,'_');
        switch(sd[0]) {
          case 'perception':
            array[i].perception = sd[1];
            break;
          case 'hp':
            array[i].hp = sd[1];
            break;
          case 'ac':
            array[i].ac = sd[1];
            break;
          case 'speed':
            array[i].speed = sd[1];
            break;
          case 'fort':
          case 'ref':
          case 'will':
            array[i].saves[sd[0]] = sd[1];
            break;
          case 'str':
          case 'dex':
          case 'con':
          case 'int':
          case 'wis':
          case 'cha':
            array[i].stats[sd[0]] = sd[1];
            break;
          default:
              array[i].details[sd[0]] = sd[1];
        }

      }
    }
    console.log(array[i])
    fs.appendFileSync('creatures.json', JSON.stringify(array[i]) + (i+1 == array.length ? ']' :', \n'));
  }
  //}
}
async function parseDetails(html) {
    return new Promise((resolve, reject) => {
          var filpFlop = false;
          var tempText = "";

    var details = [];
    const parser = new htmlparser2.Parser(
        {

            ontext(text) {
              //console.log(text)
                if(/[A-Z]/.test(text[0])) {
                  if(tempText.length > 0) {
                    details.push(tempText)
                    tempText = '';
                  }
                  tempText += text + ':';
                }
                else {
                  tempText += text;
                }
            },
            onend() {
              if(tempText.length > 0) {
                details.push(tempText)
                tempText = '';
              }
              resolve(details)

            }

        },
        { decodeEntities: true }
    );
    parser.write(html);
    parser.end();
  });


}
rip();
