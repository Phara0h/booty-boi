for(var i = 0; i < items.length; i++) {
  var cur = items[i];

  for (var j = 0; j < cur.consumables.length; j++) {
    var xcv = cur.consumables[j];
    xcv.type = "consumable";
    xcv.level = i;
    newItems.push(xcv)
  }
  for (var k = 0; k < cur.permanent.length; k++) {
    var xcv = cur.permanent[k];
    xcv.type = "permanent";
    xcv.level = i;
    newItems.push(xcv)
  }
}


for (var i = 0; i < items.length; i++) {
  items[i].name = items[i].name.toLowerCase()
  .split(' ')
  .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
  .join(' ');

  var t = items[i].name.split(' ');
 items[i].subType = t.pop();
items[i].name = t.join(' ');
  var rarity = items[i].name[items[i].name.length -1] === 'R' ? 'Rare' : items[i].name[items[i].name.length -1] === 'U' ? 'Uncommon' : 'Common';
  if(rarity === 'Rare' || rarity == 'Uncommon')
  {
    var split = items[i].name.split(' ');
    split.pop();
    items[i].name = split.join(' ');
  }

  items[i].rarity = rarity;


  if(items[i].name.indexOf(', ') > -1){
      var split =  items[i].name.split(', ');
      items[i].name = split.pop() + ' ' + split.pop();
  }

  if(items[i].subType == 'Rune') {
    items[i].name = items[i].name+' ' +'Rune'
  }

  if(items[i].subType == 'Wand') {
    var split =  items[i].name.split(' ');
    if(split.length > 4) {
      split.pop();
      var lvl = ' ('+split.pop().replace('-level',')')
      items[i].name = split.join(' ') + lvl;
    }
  }

  try {
    var itemsLevel = array[items[i].level];


    items[i].url = itemsLevel[items[i].name];
    if(!items[i].url) {
      console.log('No url for, ',items[i].name);
    }
  } catch (e) {
      console.log('No url for, ',items[i].name);
  }


}
