<template>
  <div class="message">
    <template v-for="(item, index) in $store.state.msgPool" :key="index">
      <div class="d-flex justify-center" transition="slide-y-transition">
        <template v-if="item.elevation === 0" transition="scale-transition">
          <v-alert :type="item.type" dense>{{ item.message }}</v-alert>
        </template>
        <template v-if="item.elevation !== 0" transition="fade-transition">
          <v-alert :elevation="item.elevation" :type="item.type" dense
            >{{ item.message }}
          </v-alert>
        </template>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: "Message",
};
</script>

<style scoped>
.message {
  left: 50%;
  z-index: 9999;
  display: flex;
  position: fixed;
  min-width: 300px;
  max-width: 460px;
  flex-direction: column;
  transform: translateX(-50%);
}
</style>
