<template>
<v-card class="loot">
  <v-card-title class="v-title">Lvl {{ loot.level }} Loot [{{ loot.xp }} xp, {{ loot.size }} Players] <v-icon v-on:click="$emit('delete-loot',index)" class="delete">mdi-delete-forever</v-icon></v-card-title>
  <v-card-text>
    <v-card v-if="loot.gold || loot.silver || loot.copper" class="item">
      <b>Money</b>
      <v-divider></v-divider>
      <div>
        <span>
          <b>{{ loot.gold }} <v-icon style="color:gold;">mdi-coin-outline</v-icon></b>,
          <b>{{ loot.silver }} <v-icon style="color:silver;">mdi-coin-outline</v-icon></b>,
          <b>{{ loot.copper }} <v-icon style="color:sandybrown;">mdi-coin-outline</v-icon></b>
        </span>
      </div>
    </v-card>
    <div v-for="(value, name) in loot.items">
      <v-card class="item">
        <v-badge>
          <template v-slot:badge>
            x{{ value.qty }}
          </template>

          <span class="inner">
            <a v-bind:href="value.url" target="_blank"  v-bind:style="color(value)"> {{ name }}</a>
            <v-divider></v-divider>
            <div class="details">
                          <div> <b>Rarity:</b> {{value.rarity}}</div>
            <b>Type:</b>  <span> {{ value.subType }}, {{ value.type }}</span>

             <div> <b>Total Worth:</b>  {{(value.gp * value.qty).toFixed(1) }} gp</div>

            </div>
          </span>

        </v-badge>

      </v-card>

    </div>
  </v-card-text>

    <div>Loot Worth</div> <div>  <b> {{ loot.total }}<v-icon style="color:gold;">mdi-coin-outline</v-icon></b></div>

</v-card>
</template>

<script>
export default {
  name: 'Loot',
  props: {
    loot: Object,
    index: Number
  },
  methods: {
    color(item) {
      switch(item.rarity) {
        case "Rare":
          return 'color:#9c27b0';
          break;
        case "Uncommon":
          return 'color:#4caf50';
          break;
        default:
          return 'color:inherit';

      }
    }
  },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.item {
    display: flex;
    margin: 15px;
    padding: 5px;
    flex-direction: column;
    z-index: 0;
    line-height: 1.5;

}

.loot .delete {
  cursor: pointer;
  color: #e53935;
  float: right;
  flex: 1;
  justify-content: flex-end;
}

.inner {
    line-height: 1.5;

}
.inner .details {
  font-size: 12px;
}
.inner a {
  text-decoration: none;
  color: inherit;
  font-weight: bold;
}
.loot {
    width: fit-content;
    margin: 10px;
    min-width: 341px;
}
</style>
