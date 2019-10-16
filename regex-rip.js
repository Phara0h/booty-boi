var test = `Maestro’s instrument, lesser Held 60 gp 574
Thurible of revelation, lesser Held 55 gp 575
Returning Rune 55 gp 584
Shadow Rune 55 gp 583
Slick Rune 45 gp 583
Staff of fire Staff 60 gp 594
Wand of 1st-level spell Wand 60 gp 597
Fighter’s fork Weapon 50 gp 600
Retribution axe Weapon 60 gp 602
Bracelet of dashing Worn 58 gp 607
Bracers of missile deflection Worn 52 gp 607
Channel protection amulet U Worn 56 gp 608
Coyote cloak Worn 60 gp 609
Crafter’s eyepiece Worn 60 gp 609
Dancing scarf Worn 60 gp 609
Doubling rings Worn 50 gp 609
Hat of the magi Worn 50 gp 611
Pendant of the occult Worn 60 gp 613
Persona mask Worn 50 gp 613
Tracker’s goggles Worn 60 gp 616
Ventriloquist’s ring Worn 60 gp 617`;

test = test.split(/\n/);

for (var i = 0; i < test.length; i++) {

  var name =  test[i].match(/.+?(?= \d{1,}.+.p)/)[0];
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
