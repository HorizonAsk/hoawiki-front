<template>
  <ul
    v-infinite-scroll="load"
    :infinite-scroll-disabled="end"
    class="infinite-list"
    style="overflow: auto"
  >
    <el-space
      v-for="conceptPage in pageItems"
      :key="conceptPage"
      :underline="false"
      alignment="left"
      class="box-card"
      direction="vertical"
      style="width: 100%"
    >
      <PageBrief :conceptPage="conceptPage"></PageBrief>
    </el-space>
  </ul>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { PageService } from "@/services/page.service.ts";
import PageBrief from "@/components/Page/PageBrief.vue";

export default defineComponent({
  name: "LatestPages",
  components: {
    PageBrief,
  },
  data: function () {
    const currentItemsNumber = ref(0);
    const load = () => {
      this.getLatestPages(this.currentPage);
    };
    return {
      currentItemsNumber,
      currentPage: 1,
      load,
      pageItems: [],
      end: false,
    };
  },
  methods: {
    getLatestPages(currentPage: number) {
      PageService.getLatestPages(currentPage).then((res) => {
        if (res.data?.pageItems) {
          this.pageItems = this.pageItems.concat(res.data.pageItems);
          this.currentItemsNumber = this.pageItems.length;
          console.log(this.pageItems);
        } else {
          this.end = true;
        }
      });
      this.currentPage += 1;
    },
  },
});
</script>

<style>
.infinite-list {
  height: 900px;
  padding: 0;
  margin: 0;
  list-style: none;
}

.infinite-list .infinite-list-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100px;
  background: var(--el-color-primary-light-9);
  margin: 1px;
  color: var(--el-text-color-primary);
}

.page_time {
  margin-right: 13px;
  line-height: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.page_time {
  font-size: 13px;
  color: #999;
}
</style>
