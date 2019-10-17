<template>
<v-card class="loot">
  <v-card-title class="v-title">Lvl {{ loot.level }} Loot [{{ loot.xp }} xp, {{ loot.size }} Players]</v-card-title>
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
            <b>{{ name }}</b>
            <v-divider></v-divider>
            <div>
              <span>Total Worth: {{(value.gp * value.qty).toFixed(1) }} gp, </span>
              <span>Page: {{ value.page }}</span>
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
    loot: Object
  }
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
.inner {
    line-height: 1.5;
}
.loot {
    width: fit-content;
    margin: 10px;
    min-width: 341px;
}
</style>
