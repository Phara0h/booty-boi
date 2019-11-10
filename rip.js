const { JSDOM } = require('jsdom');
const striptags = require('striptags');
const path = require('path');
const fs = require('fs');

let time = new Date;
let report = {
	name: time.toString().replace(/\:/g, '-'),
	type: '_reports_',
	itemId: 'report',
	pass: [],
	fail: [],
	'missing parsers': []
};

const toCap = (string) => {
	//	Captialize first letter of a string
	return string.charAt(0).toUpperCase() + string.slice(1);
}

const reEncode = (string) => {
	return unescape(encodeURIComponent(string));
}

const getContent = async (pageId) => {
	const jsdomOpts = {};
	const url = `http://pf2.easytool.es/index.php?id=${pageId}`;
	return await JSDOM.fromURL(url, jsdomOpts);
};

const getName = (document) => {
	//  Second header tag with class d-flex contains the name, type and level
	const typeHeader = document.querySelectorAll("header.d-flex");
	const name = typeHeader[1].querySelector("h1").innerHTML.toLowerCase() || null;
	return name ? reEncode(name) : name;
};

const getLevel = (document) => {
	//  Second header tag with class d-flex contains the name, type and level
	const typeHeader = document.querySelectorAll("header.d-flex")[1];
	const typeString = typeHeader.querySelector("h2").innerHTML;
	const level = /[0-9]+/.exec(typeString);
	return Array.isArray(level) ? level[0] : 0;
};

const getTraits = (document) => {
	//  section tag with class .traits contains the traits
	const traitsSection = document.querySelector("section.traits");
	let traitsList = [];
	//  each trait is an h3 tag inside this but not all items have traits
	if (traitsSection) {
		const traitsHeaders = traitsSection.querySelectorAll("h3");
		Object.values(traitsHeaders).reduce((traitsList, trait) => {
			traitsList.push(trait.innerHTML.toLowerCase());
			return traitsList;
		}, traitsList);
	}
	return traitsList;
};

const getPrice = (document) => {
	//  section tag with class .details contains the bulk, price, and usage
	const detailsSection = document.querySelector("section.details");
	//  price one of the <p> tag inside...
	const priceDetails = detailsSection.querySelectorAll("p");
	const filter = (p) => {
		return priceDetails[p].innerHTML.toLowerCase().includes("price");
	}
	const p = Object.keys(priceDetails).find(filter);
	let price = {
		amount: 0,
		currency: null
	};
	if (p) {
		price.amount = /(\d+)/gi.exec(striptags(priceDetails[p].innerHTML))[1];
		price.currency = /([c|g|s]p)/gi.exec(striptags(priceDetails[p].innerHTML))[1];
	}
	return price;
}

const getUsage = (document) => {
	//  section tag with class .details contains the bulk, price, and usage
	const detailsSection = document.querySelector("section.details");
	//  usage is in one of the <p> tags, immediately after the keyword
	const usageDetails = detailsSection.querySelectorAll("p");
	const filter = (p) => {
		return usageDetails[p].innerHTML.toLowerCase().includes("usage");
	}
	const p = Object.keys(usageDetails).find(filter);
	let usage = null;
	if (p) {
		let usageText = /usage\s(.*);/gi.exec(striptags(usageDetails[p].innerHTML));
		usage = Array.isArray(usageText) ? usageText[1] : usage;
	}
	return usage ? toCap(reEncode(usage).trim()) : usage;
};

const getBulk = (document) => {
	//  section tag with class .details contains the bulk, price, and usage
	const detailsSection = document.querySelector("section.details");
	//  bulk is in one of the <p> tags, immediately after the keyword
	const bulkDetails = detailsSection.querySelectorAll("p");
	const filter = (p) => {
		return bulkDetails[p].innerHTML.toLowerCase().includes("bulk");
	}
	const p = Object.keys(bulkDetails).find(filter);
	let bulk = 0;
	if (p) {
		//  Bulk can be a number or a symbol?
		let bulkText = /bulk\s(s|m|l|\d*\.?\d*)/gi.exec(striptags(bulkDetails[p].innerHTML));
		bulk = Array.isArray(bulkText) ? bulkText[1] : bulk;
	}
	return bulk;
};

const getDetails = (document) => {
	//  section tag with class .content contains the actions and details
	const detailsSection = document.querySelector("section.content");
	//  activate is alawys in actions, everything else is details...
	const details = detailsSection.querySelectorAll("p");
	const detailsText = Object.values(details).reduce((detailString, detailSection) => {
		if (detailSection.innerHTML.toLowerCase().includes("activate") === false) {
			detailString = detailString.concat(' ', striptags(detailSection.innerHTML));
		}
		return detailString;
	}, new String());
	return toCap(reEncode(detailsText).trim());
};

const getActions = (document) => {
	//	@TODO: Some items have their actions in the details, not the content

	//  section tag with class .content contains the actions and details
	const detailsSection = document.querySelector("section.content");
	//  activate is alawys in actions, everything else is details...
	const actions = detailsSection.querySelectorAll("p");
	//  @TODO: This could use more love to parse out the action
	//  @FIXME: number of actions, action type, effect fields
	const actionText = Object.values(actions).reduce((actionString, actionSection) => {
		if (actionSection.innerHTML.toLowerCase().includes("activate")) {
			actionString = actionString.concat(' ', striptags(actionSection.innerHTML));
		}
		return actionString;
	}, new String());
	return toCap(reEncode(actionText).trim());
};

const getSource = (document) => {
	//  Footer contains the book and page
	const sourceSection = document.querySelector("footer.d-flex");
	//  The source is a link inside of the footer
	const sourceLink = sourceSection.querySelector("a");
	return {
		reference: /(.*)\s\(/.exec(striptags(sourceLink.innerHTML))[1],
		page: /\((\d+)\)/gi.exec(striptags(sourceLink.innerHTML))[1]
	}
};
//  Weapons and shields have more attributes...
const getHands = (document) => {
	return null;
};

const getDamage = (document) => {
	return null;
};

const getCritEffect = (document) => {
	return null;
}

const getHardness = (document) => {
	return null;
};

const getHitPoints = (document) => {
	return null;
};

const getBreakThreshold = (document) => {
	return null;
}

const getShieldAttributes = (document) => {
	return {
		type: 'shield',
		hardness: getHardness(document),
		hitPoints: getHitPoints(document),
		brokenTreshold: getBreakThreshold(document)
	};
}

const getWeaponAttributes = (document) => {
	return {
		type: 'weapon',
		hands: getHands(document),
		damage: getDamage(document),
		critEffect: getCritEffect(document),
	}
};

// @TODO - I think these are only item attributes, feats/etc will be different
const getBaseAttributes = (document) => {
	const baseAttributes = {
		name: getName(document),
		level: getLevel(document),
		traits: getTraits(document),
		price: getPrice(document),
		usage: getUsage(document),
		bulk: getBulk(document),
		actions: getActions(document),
		details: getDetails(document),
		source: getSource(document),
	};
	return baseAttributes;
}

const parseItem = (itemId, document) => {
	const baseAttributes = getBaseAttributes(document);
	return Object.assign({ itemId, type: 'item' }, baseAttributes);
};

const parseGear = (itemId, document) => {
	const baseAttributes = getBaseAttributes(document);
	return Object.assign({ itemId, type: 'gear' }, baseAttributes);
};

const parseWeapon = (itemId, document) => {
	const baseAttributes = getBaseAttributes(document);
	const weaponAttributes = getWeaponAttributes(document);
	return Object.assign({ itemId }, weaponAttributes, baseAttributes);
};

const parseShield = (itemId, document) => {
	const baseAttributes = getBaseAttributes(document);
	const shieldAttributes = getShieldAttributes(document);
	return Object.assign({ itemId }, shieldAttributes, baseAttributes);
};

//  @TODO: COMPLETE CONTENT TYPE MAP
const contentTypeMap = {
	weapon: parseWeapon,
	shield: parseShield,
	item: parseItem,
	gear: parseGear,
	//	feat: [ race | class | skill ]
	//	feature: [ race | class ]
	//	ability: [race | class | heritage]
	//	spell:
	//	CRITICAL SPECIALIZATION EFFECT:
	//	armor:
	//	category: ?? ignore ??
	//	rune
	//	snare
	//	hazard
	//	activity
	//	ACTIVATION COMPONENT
};

const getContentByType = (itemId, page) => {
	const { window: { document = {} } = {} } = page;
	//  Second header tag with class d-flex contains the name, type and level
	const typeHeader = document.querySelectorAll("header.d-flex")[1];
	const typeString = typeHeader.querySelector("h2").innerHTML;

	const type = Object.keys(contentTypeMap).find((type) => { return RegExp(type, 'gi').test(typeString) });
	if (contentTypeMap.hasOwnProperty(type)) {
		return contentTypeMap[type](itemId, document);
	} else {
		report['missing parsers'].push(typeString);
		throw new Error(`No parser found for page type: ${typeString}`);
	}
};


const exportContents = async (content) => {
	const formattedName = content.name ? content.name.replace(/\s/g, '-').toLowerCase() : null;
	const fileName = content.itemId.toString().concat(formattedName ? `-${formattedName}` : '', '.json');
	//  I'm lazy, make sure these paths exist before starting
	const writeTarget = path.resolve(__dirname, 'ripperoni', content.type, fileName);
	//  Write this in human readable thank
	const writeStatus = await new Promise((resolve) => {
		fs.writeFile(writeTarget, JSON.stringify(content, null, 4), (err) => {
			if (err) {
				console.error(err);
				resolve('fail');
			} else if (content.type === '_failed_') {
				console.error(`Could not rip page: ${content.itemId}`);
				resolve('fail');
			} else {
				console.log(`Wrote: ${writeTarget}`);
				resolve('pass');
			}
		});
	});
	return writeStatus;
};

async function ripPage(itemId) {
	let page;
	let content;
	try {
		page = await getContent(itemId);
		content = getContentByType(itemId, page);
	} catch (err) {
		content = {
			type: '_failed_',
			itemId,
			name: null,
			error: err.stack.toString()
		};
	}

	//  Terminate the jsdom to remove any listeners and stop any script execution
	if (page.hasOwnProperty('window')) {
		page.window.close();
	}
	return await exportContents(content);
};

const slowPHPServerBullshit = async (timer) => {
	return new Promise((resolve) => setTimeout(resolve, timer))
};

//  Take an array of pages to rip
async function rip(pages = []) {

	for (const itemId of pages) {
		await slowPHPServerBullshit(50);
		const status = await ripPage(itemId);
		report[status].push(itemId);
	}

	console.log(report);
	exportContents(report);

}

const start = 3000;
const stop = 3100;
const range = new Array(stop - start + 1).fill().map((_, i) => i + start);

//  By all means, feed it an array of specific pages if you have one
rip(range);
