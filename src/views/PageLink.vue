<template>
  <v-network-graph
    ref="pagelinkgraph"
    v-model:layouts="pageNodesLayouts"
    :configs="graphConfig"
    :edges="pageLinks"
    :event-handlers="eventHandlers"
    :nodes="pageNodes"
  >
    <template
      #override-node-label="{
        nodeId,
        scale,
        // text,
        // x,
        // y,
        // config,
        // textAnchor,
        // dominantBaseline,
      }"
    >
      <text
        :font-size="15 * scale"
        dominant-baseline="central"
        fill="#000000"
        text-anchor="middle"
        x="0"
        y="0"
        >{{ this.pageAbstracts[nodeId]?.pageTitle }}
      </text>
    </template>
  </v-network-graph>
  <div
    ref="tooltip"
    :style="{ ...tooltipPos, opacity: tooltipOpacity }"
    class="tooltip"
  >
    <n-card>
      <div>{{ this.pageAbstracts[targetNodeId]?.pageTitle }}</div>
      <div>{{ this.pageAbstracts[targetNodeId]?.content ?? "" }}</div>
    </n-card>
  </div>
</template>

<script lang="ts">
import * as vNG from "v-network-graph";
import { Layouts } from "v-network-graph";
import { PageLinkResponse, PageLinkService } from "@/services/pagelink.service";
import { PageBrief, PageService } from "@/services/page.service";
import { defineComponent, reactive, ref } from "vue";
import {
  ForceEdgeDatum,
  ForceLayout,
  ForceNodeDatum,
} from "v-network-graph/lib/force-layout";

const configs = reactive(
  vNG.defineConfigs({
    node: {
      selectable: true,
      normal: {
        type: "rect",
        width: (node) => node.size,
        height: 32,
        borderRadius: 8,
        color: (node) => node.color,
      },
      hover: {
        color: "#ff5500",
        width: (node) => node.size,
        height: 32,
        borderRadius: 8,
      },
      label: {
        fontSize: 6,
        color: "#000000",
        direction: "north",
      },
    },
    view: {
      layoutHandler: new ForceLayout({
        positionFixedByDrag: false,
        positionFixedByClickWithAltKey: true,
        // * The following are the default parameters for the simulation.
        // * You can customize it by uncommenting below.
        createSimulation: (d3, nodes, edges) => {
          const forceLink = d3
            .forceLink<ForceNodeDatum, ForceEdgeDatum>(edges)
            .id((d) => d.id);
          return d3
            .forceSimulation(nodes)
            .force("edge", forceLink.distance(200))
            .force("charge", d3.forceManyBody())
            .force("collide", d3.forceCollide(50).strength(0.2))
            .force("center", d3.forceCenter().strength(0.05))
            .alphaMin(0.001);
        },
      }),
    },
    edge: {
      gap: 1,
      marker: {
        target: {
          type: "arrow",
        },
      },
    },
  })
);

export default defineComponent({
  name: "PageLink",
  data: function () {
    // for tooltip
    const tooltipOpacity = ref(0);
    const targetNodeId = ref("");
    const eventHandlers: vNG.EventHandlers = {
      "node:pointerover": ({ node }) => {
        targetNodeId.value = node;
        tooltipOpacity.value = 1; // show
      },
      "node:pointerout": () => {
        tooltipOpacity.value = 0; // hide
      },
    };
    const pageNodesLayouts: Layouts = { nodes: {} };
    //tooltip
    return {
      id: -1,
      pageNodes: ref({}),
      pageLinks: ref({}),
      pageNodesLayouts,
      pageNodeNum: 0,
      nodeList: [],
      pageAbstracts: {},
      graphConfig: configs,
      // for tooltip
      targetNodeId,
      tooltipOpacity,
      eventHandlers,
      tooltipPos: ref({}),
    };
  },
  mounted() {
    this.id = this.$route.params.id;
    this.updateLink(this.id);
  },
  methods: {
    updateLink(id: bigint) {
      PageLinkService.getPageLinkOf(id, 2).then((res) => {
        res.data.items.forEach((pagelinkitem: PageLinkResponse) => {
          this.pageNodes[pagelinkitem.pageTo.toString()] = {
            name: pagelinkitem.pageTo.toString(),
            size: pagelinkitem.pageTo.toString().length * 75,
            color: "#ffffff",
          };
          this.pageNodes[pagelinkitem.pageFrom.toString()] = {
            name: pagelinkitem.pageFrom.toString(),
            size: pagelinkitem.pageTo.toString().length * 75,
            color: "#ffffff",
          };
          if (this.nodeList.indexOf(pagelinkitem.pageTo) == -1) {
            this.nodeList.push(pagelinkitem.pageTo);
          }
          if (this.nodeList.indexOf(pagelinkitem.pageFrom) == -1) {
            this.nodeList.push(pagelinkitem.pageFrom);
          }
        });
        res.data.items.forEach((pagelinkitem: PageLinkResponse) => {
          this.pageLinks[pagelinkitem.pageLinkId.toString()] = {
            source: pagelinkitem.pageFrom.toString(),
            target: pagelinkitem.pageTo.toString(),
          };
        });
        // console.log(this.nodeList);
        this.updatePageAbstracts();
        this.$nextTick(() => {
          this.pageNodesLayouts.nodes[this.id].fixed = true;
          this.pageNodes[this.id].color = "#99ccff";
        });
      });
    },
    updatePageAbstracts() {
      PageService.getPageAbstracts(this.nodeList).then((res) => {
        res.data.pageItems.forEach((pageAbstractItem: PageBrief) => {
          this.pageAbstracts[pageAbstractItem.pageId.toString()] =
            pageAbstractItem;
        });
      });
    },
  },
  watch: {
    tooltipOpacity: function () {
      this.$nextTick(() => {
        if (!this.$refs.pagelinkgraph || !this.$refs.tooltip)
          return { x: 0, y: 0 };
        if (!this.targetNodeId) return { x: 0, y: 0 };
        const nodePos = this.pageNodesLayouts.nodes[this.targetNodeId];
        // translate coordinates: SVG -> DOM
        const domPoint =
          this.$refs.pagelinkgraph.translateFromSvgToDomCoordinates(nodePos);
        // calculates top-left position of the tooltip.
        this.tooltipPos = {
          left: domPoint.x - this.$refs.tooltip.offsetWidth / 2 + "px",
          top: domPoint.y + this.$refs.tooltip.offsetHeight + 20 + "px",
        };
      });
    },
  },
});
</script>

<style scoped>
.tooltip-wrapper {
  position: relative;
}

.tooltip {
  top: 0;
  left: 0;
  opacity: 0;
  position: absolute;
  min-width: 80px;
  min-height: 36px;
  text-align: center;
  font-size: 20px;
  border: 1px solid rgba(255, 185, 80, 0.06);
  box-shadow: 2px 2px 2px #aaa;
  transition: opacity 0.2s linear;
}
</style>
