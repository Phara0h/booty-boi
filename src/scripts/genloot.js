// var xpbudget = 100;
// var partysize = 4;
// var partylevel = 1;
import items from './items.js'
var lootGen = {
  getLoots: function(xp, level, size)
  {
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
    },
    {
      total: 500,
      adder: 30
    },
    {
      total: 850,
      adder: 50
    },
    {
      total: 1350,
      adder: 80
    },
    {
      total: 2000,
      adder: 125
    },
    {
      total: 2900,
      adder: 180
    },
    {
      total: 4000,
      adder: 250
    },
    {
      total: 5700,
      adder: 350
    },
    {
      total: 8000,
      adder: 500
    },
    {
      total: 11500,
      adder: 700
    },
    {
      total: 16500,
      adder: 1000
    },
    {
      total: 25000,
      adder: 1500
    },
    {
      total: 36500,
      adder: 2250
    },
    {
      total: 54500,
      adder: 3250
    },
    {
      total: 82500,
      adder: 5000
    },
    {
      total: 128000,
      adder: 75000
    },
    {
      total: 208000,
      adder: 12000
    },
    {
      total: 355000,
      adder: 20000
    },
    {
      total: 490000,
      adder: 35000
    },
  ];

    var ammount = (partyTreasure[level].total * multiplier) + ((size - 4) * partyTreasure[level].adder);
    console.log(xp,level,size, multiplier, ammount)
    var item;
    var loot = {
      items:
      {}
    };
    do {
      item = this.pickRandomLoot(level, [], [], ammount);
      if (item)
      {
        if (!loot.items[item.name])
        {
          loot.items[item.name] = { qty: 1, ...item }

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

  pickRandomLoot: function(level, types = [], subTypes = [], ammount)
  {
    if(level == 20) {
      level = 19;
    }

    var itemPool = items.filter(i=>{

      if(i.level == level-1 || i.level == level) {
        var type = true;
        var subType = true;
        if(types.length > 0) {
          type = types.indexOf(i.type) > -1
        }
        if(subTypes.length > 0) {
          subType = subtypes.indexOf(i.type) > -1
        }
        return type && subType;
      }

      return false;
    });

    if((itemPool.sort((a,b)=>a.gp-b.gp))[0].gp > ammount || itemPool.length <= 0) {
      return null;
    }

    return pickLoot(itemPool, ammount)
    //var nextLevelItems = items.filter(i=>i.level == level+1);

    //
    // var minSameLevelConsumables = items[level].consumables[0].gp;
    // var minSameLevelPermanent = items[level].permanent[0].gp;
    // var maxSameLevelConsumables = items[level].consumables[items[level].consumables.length - 1].gp;
    // var maxSameLevelPermanent = items[level].permanent[items[level].permanent.length - 1].gp;
    //
    //
    // var minNextLevelConsumables = items[level + 1].consumables[0].gp;
    // var minNextLevelPermanent = items[level + 1].permanent[0].gp;
    // var maxNextLevelConsumables = items[level + 1].consumables[items[level + 1].consumables.length - 1].gp;
    // var maxNextLevelPermanent = items[level + 1].permanent[items[level + 1].permanent.length - 1].gp;
    //
    // var permanent = true;
    //
    // if (minSameLevelConsumables > ammount && minNextLevelConsumables > ammount)
    // {
    //   return null;
    // }
    //
    // if (minSameLevelPermanent > ammount && minNextLevelPermanent > ammount)
    // {
    //   permanent = false;
    // }
    // else
    // {
    //   permanent = !!Math.round(Math.random());
    // }
    //
    // if (permanent)
    // {
    //   if (minNextLevelPermanent > ammount)
    //   {
    //     return pickLoot(level, 'permanent', ammount)
    //   }
    //   else
    //   {
    //     return pickLoot(level + 1, 'permanent', ammount)
    //   }
    // }
    // else
    // {
    //   if (minNextLevelConsumables > ammount)
    //   {
    //     return pickLoot(level, 'consumables', ammount)
    //   }
    //   else
    //   {
    //     return pickLoot(level + 1, 'consumables', ammount)
    //   }
    // }

    function pickLoot(itemPool, ammount)
    {
      var item;
      do {
        item = itemPool[Math.round(Math.random() * (itemPool.length - 1))]
      } while (ammount < item.gp);
      return item;
    }
  }
}
export default lootGen;
