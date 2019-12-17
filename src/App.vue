<template>
  <v-app id="app">
    <v-app-bar app height="64">
      <v-toolbar-title class="headline text-uppercase">
        <span>Booty Boi</span>
        <span class="font-weight-light"> - Pathfinder 2e Treasure Generator</span>

      </v-toolbar-title>

    </v-app-bar>

    <v-content class="content">
      <v-switch inset color="primary"  :label="`Dark Theme`" class="dt" v-model="darkness" @change="edgy"></v-switch>
      <v-slider
         v-model="level"
         label="Party Level"
         step="1"
         thumb-label="always"
         min="1"
         max="20"
         ticks
       ></v-slider>
       <v-slider
          v-model="size"

          label="Party Size"
          step="1"
          thumb-label="always"
          max="20"
          ticks
        ></v-slider>
      <v-slider
         v-model="xp"
         :color="color"
         label="XP Budget"
         step="20"
         thumb-label="always"
         max="160"
         ticks
       ></v-slider>

       <v-slider
          v-model="xpbonus"
          :color="color"
          label="Bonus XP Budget"
          step="10"
          thumb-label="always"
          max="500"
        ></v-slider>

      <v-btn color="primary" class="btn" @click="genloot">Generate</v-btn>
      <v-btn color="secondary" class="btn" @click="clear">Clear</v-btn>
      <div  class="loots">
      <div v-for="(item, index) in lootItems">
        <Loot  v-on:delete-loot="deleteLoot" :loot="item" :index="index"></Loot>
      </div>
     </div>
    </v-content>
  </v-app>

</template>

<script>

import lootGen from './scripts/genloot.js'
import Loot from './components/Loot.vue'

export default {
  name: 'app',
  data() {
      return {
        lootItems: [],
        xp: 80,
        xpbonus: 0,
        level: 1,
        size: 4,
        darkness: true
      }
    },
  created() {
    this.$vuetify.theme.dark = this.darkness
    var items = localStorage.getItem("Loot");
    if(items) {
      this.lootItems = JSON.parse(items);
    }

  },
  components: {
    Loot
  },
  computed: {
    color() {
      if (this.xp <= 40) return 'pink'
       if (this.xp < 80) return 'teal'
       if (this.xp < 120) return 'green'
       if (this.xp < 160) return 'orange'
       return 'red'
    }
  },
  methods: {
    deleteLoot(index) {
      this.lootItems.splice(index, 1);
       localStorage.setItem("Loot",  JSON.stringify(this.lootItems));
      console.log(index)
    },
    genloot: function() {
      var items = lootGen.getLoots(this.xp+this.xpbonus,this.level,this.size);
      items.level = this.level;
      items.xp = this.xp;
      items.size = this.size;

      this.lootItems.unshift(items);
      localStorage.setItem("Loot", JSON.stringify(this.lootItems));
    },
     clear() {
       this.lootItems = [];
       localStorage.setItem("Loot",  this.lootItems);
     }
     ,
     edgy() {
       return this.$vuetify.theme.dark = this.darkness;
     }
  }
}
</script>

<style lang="less">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.content {
  margin: 20px;
  padding: 5px !important;
}
.top {
  height: 62px !important;
}
.btn {
  margin: 10px;
}
.dt {
  display: flex !important;
justify-content: flex-end !important;
}
.loots {
  display: flex;
      justify-content: flex-start;
      flex-direction: column;
      align-items: center;
}
</style>
