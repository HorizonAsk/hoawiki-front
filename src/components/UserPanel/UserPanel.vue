<template>
  <v-menu>
    <template v-slot:activator="{ props }">
      <v-btn v-bind="props">
        <v-icon> mdi-account</v-icon>
      </v-btn>
    </template>
    <div>
      <v-card right top>
        <v-list>
          <v-list-item v-for="item in items" :key="item.title">
            <v-icon>{{ item.icon }}</v-icon>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-card>
    </div>
  </v-menu>
</template>

<script>
export default {
  name: "UserPanel",
  data() {
    return {
      drawer: false,
      items: [
        { title: "Home", icon: "mdi-home-city" },
        { title: "My Account", icon: "mdi-account" },
        { title: "Users", icon: "mdi-account-group-outline" },
      ],
    };
  },
};
</script>
