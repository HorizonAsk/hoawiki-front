<template>
  <n-space item-style="width: 100%" vertical>
    <h2>最新页面</h2>
    <InfiniteScroll :scroll="getLatestPages">
      <div
        v-for="conceptPage in pageItems"
        :key="conceptPage"
        class="latest_pages"
      >
        <PageBrief :conceptPage="conceptPage"></PageBrief>
        <n-divider></n-divider>
      </div>
    </InfiniteScroll>
    <div v-if="end">
      <n-empty description="没啦"></n-empty>
    </div>
    <div v-else>
      <n-spin size="small" />
    </div>
  </n-space>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { PageService } from "@/services/page.service.ts";
import PageBrief from "@/components/Page/PageBrief.vue";
import InfiniteScroll from "@/components/template/InfiniteScroll.vue";

export default defineComponent({
  name: "LatestPages",
  components: {
    PageBrief,
    InfiniteScroll,
  },
  data: function () {
    const currentItemsNumber = ref(0);
    const columns = [
      { title: "", key: "pageTitle" },
      {
        title: "",
        key: "updateTime",
      },
      {
        title: "",
        key: "pageId",
      },
      {
        title: "",
        key: "content",
      },
    ];
    const loadingRef = ref(false);
    return {
      currentItemsNumber,
      currentPage: 1,
      columns,
      loading: loadingRef,
      pageItems: [],
      end: false,
    };
  },
  methods: {
    getLatestPages(currentPage: number) {
      if (!this.loading) {
        this.loading = true;
        if (!currentPage) {
          currentPage = this.currentPage;
        }
        PageService.getLatestPages(currentPage).then((res) => {
          if (res.data?.pageItems) {
            this.pageItems = this.pageItems.concat(res.data.pageItems);
            this.currentItemsNumber = this.pageItems.length;
            // console.log(this.pageItems);
            this.loading = false;
          } else {
            this.end = true;
          }
        });
        this.currentPage += 1;
      }
    },
  },
});
</script>

<style scoped>
n-space::-webkit-scrollbar {
  display: none;
}
</style>
