// var xpbudget = 100;
// var partysize = 4;
// var partylevel = 1;
import items from "./items.js";
var lootGen = {
  getLoots: function(xp, level, size, types, subTypes, money_percentage = 0) {
    console.log(xp, level, size, types, subTypes, money_percentage);
    var multiplier = xp / 100 / 10;
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
      }
    ];

    var amount =
      partyTreasure[level].total * multiplier +
      (size - 4) * partyTreasure[level].adder;
    var raw_money = 0;
    if (money_percentage > 0) {
      raw_money = amount * (money_percentage / 100);
      amount = amount - raw_money;
    }
    console.log(xp, level, size, multiplier, amount);
    var item;
    var loot = {
      items: {}
    };
    do {
      item = this.pickRandomLoot(level, types, subTypes, amount);
      if (item) {
        if (!loot.items[item.name]) {
          loot.items[item.name] = {qty: 1, ...item};
        } else {
          loot.items[item.name].qty = loot.items[item.name].qty + 1;
        }

        amount -= item.gp;
      }
    } while (item);

    amount += raw_money;
    loot.gold = Math.floor(amount);
    amount = (amount - Math.floor(amount)) * 10;
    loot.silver = Math.floor(amount);
    amount = (amount - Math.floor(amount)) * 10;
    loot.copper = Math.floor(amount);
    loot.total = (
      partyTreasure[level].total * multiplier +
      (size - 4) * partyTreasure[level].adder
    ).toFixed(2);
    return loot; //console.log(loot);
  },

  pickRandomLoot: function(level, types = [], subTypes = [], amount) {
    if (level == 20) {
      level = 19;
    }

    var itemPool = items.filter(i => {
      if (i.level == level - 1 || i.level == level) {
        var type = true;
        var subType = true;
        if (types.length > 0) {
          type = types.indexOf(i.type) > -1;
        }
        if (subTypes.length > 0) {
          subType = subTypes.indexOf(i.subType) > -1;
        }
        return type && subType;
      }

      return false;
    });

    if (
      itemPool.sort((a, b) => a.gp - b.gp)[0].gp > amount ||
      itemPool.length <= 0
    ) {
      return null;
    }

    return pickLoot(itemPool, amount);
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
    // if (minSameLevelConsumables > amount && minNextLevelConsumables > amount)
    // {
    //   return null;
    // }
    //
    // if (minSameLevelPermanent > amount && minNextLevelPermanent > amount)
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
    //   if (minNextLevelPermanent > amount)
    //   {
    //     return pickLoot(level, 'permanent', amount)
    //   }
    //   else
    //   {
    //     return pickLoot(level + 1, 'permanent', amount)
    //   }
    // }
    // else
    // {
    //   if (minNextLevelConsumables > amount)
    //   {
    //     return pickLoot(level, 'consumables', amount)
    //   }
    //   else
    //   {
    //     return pickLoot(level + 1, 'consumables', amount)
    //   }
    // }

    function pickLoot(itemPool, amount) {
      var item;
      do {
        item = itemPool[Math.round(Math.random() * (itemPool.length - 1))];
      } while (amount < item.gp);
      return item;
    }
  }
};
export default lootGen;
