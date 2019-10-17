// var xpbudget = 100;
// var partysize = 4;
// var partylevel = 1;
import items from './items.js'
var lootGen = {
  getLoots: function(xp, level, size)
  {
    console.log()
    var multiplier = (xp / 100 ) / 10;
    var partyTreasure = [
    {},
    {
      total: 175,
      adder: 10
    },
    {
      total: 300,
      adder: 18
    }, ];

    var ammount = (partyTreasure[level].total * multiplier) + ((size - 4) * partyTreasure[level].adder);
    console.log(xp,level,size, multiplier, ammount)
    var item;
    var loot = {
      items:
      {}
    };
    do {
      item = this.pickRandomLoot(level, ammount);
      if (item)
      {
        if (!loot.items[item.name])
        {
          loot.items[item.name] = {
            qty: 1,
            gp: item.gp,
            page: item.page
          }

        }
        else
        {
          loot.items[item.name].qty = loot.items[item.name].qty + 1;
        }

        ammount -= item.gp
      }
    } while (item);

    loot.gold = Math.floor(ammount);
    ammount = (ammount - Math.floor(ammount)) * 10;
    loot.silver = Math.floor(ammount)
    ammount = (ammount - Math.floor(ammount)) * 10;
    loot.copper = Math.floor(ammount)
    loot.total = ((partyTreasure[level].total * multiplier) + ((size - 4) * partyTreasure[level].adder)).toFixed(2);
    return loot;//console.log(loot);
  },

  pickRandomLoot: function(level, ammount)
  {
    var minSameLevelConsumables = items[level].consumables[0].gp;
    var minSameLevelPermanent = items[level].permanent[0].gp;
    var maxSameLevelConsumables = items[level].consumables[items[level].consumables.length - 1].gp;
    var maxSameLevelPermanent = items[level].permanent[items[level].permanent.length - 1].gp;


    var minNextLevelConsumables = items[level + 1].consumables[0].gp;
    var minNextLevelPermanent = items[level + 1].permanent[0].gp;
    var maxNextLevelConsumables = items[level + 1].consumables[items[level + 1].consumables.length - 1].gp;
    var maxNextLevelPermanent = items[level + 1].permanent[items[level + 1].permanent.length - 1].gp;

    var permanent = true;

    if (minSameLevelConsumables > ammount && minNextLevelConsumables > ammount)
    {
      return null;
    }

    if (minSameLevelPermanent > ammount && minNextLevelPermanent > ammount)
    {
      permanent = false;
    }
    else
    {
      permanent = !!Math.round(Math.random());
    }

    if (permanent)
    {
      if (minNextLevelPermanent > ammount)
      {
        return pickLoot(level, 'permanent', ammount)
      }
      else
      {
        return pickLoot(level + 1, 'permanent', ammount)
      }
    }
    else
    {
      if (minNextLevelConsumables > ammount)
      {
        return pickLoot(level, 'consumables', ammount)
      }
      else
      {
        return pickLoot(level + 1, 'consumables', ammount)
      }
    }

    function pickLoot(level, type, ammount)
    {
      var item;
      do {

        item = items[level][type][Math.round(Math.random() * (items[level][type].length - 1))]
      } while (ammount < item.gp);
      return item;
    }
  }
}
export default lootGen;
