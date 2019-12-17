var test = `+3 major resilient armor Armor 70000 gp 556
Elven chain, high-grade U Armor 52000 gp 555
Orichalcum armor, high-grade R Armor 60500 gp 556
Resilient, major Rune 49440 gp 581
Staff of the magi R Staff 90000 gp 595
Wand of slaying 9th Wand 70000 gp 598
Wand of smoldering fireballs 9th Wand 70000 gp 598
Wand of widening 9th Wand 70000 gp 598
Skyhammer R Weapon 70000 gp 602
Bracers of armor type III Worn 60000 gp 607
Ring of spell turning R Worn 67000 gp 615
Whisper of the first lie R Worn 60000 gp 617`;

test = test.split(/\n/);

for (var i = 0; i < test.length; i++) {

  var name =  test[i].match(/.+?(?= \d+ .p)/)[0];
  var curr = Number(test[i].match(/(\d+.)(?=.p )/)[0])
  var currType = test[i].match(/(.p)(?= \d+)/)[0];
  if(currType.indexOf('sp') > -1) {
    curr = curr / 10;
  }
  var page = test[i].split(' ').pop();
  test[i] = {
    name,
    gp: curr,
    page
  }
}
JSON.stringify(test.sort((a, b) =>
{
  return a.gp - b.gp;
}))
