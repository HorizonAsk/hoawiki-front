<template>
  <div>
    <slot id="infiniteContent"></slot>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "InfiniteScroll",
  data() {
    return {
      scrollDisable: false,
    };
  },
  props: {
    scroll: Function,
    distance: { type: Number, default: 0 },
  },
  mounted() {
    this.scroll();
    this.$nextTick(() => {
      window.addEventListener("scroll", () => {
        // console.log(
        //   document.documentElement.scrollTop,
        //   "+",
        //   window.innerHeight,
        //   "+",
        //   this.distance,
        //   ">=",
        //   this.$el.parentElement.clientHeight
        // );
        if (
          document.documentElement.scrollTop +
            window.innerHeight +
            this.distance >=
          this.$el.parentElement.clientHeight
        ) {
          if (!this.scrollDisable) {
            this.scrollDisable = true;
            this.scroll();
            this.scrollDisable = false;
          }
        }
      });
    });
  },
});
</script>

<style></style>
