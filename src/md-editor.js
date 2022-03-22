import VueMarkdownEditor from "@kangc/v-md-editor";
import VueMarkdownPreviewer from "@kangc/v-md-editor/lib/preview";
import "@kangc/v-md-editor/lib/style/base-editor.css";
import vuepressTheme from "@kangc/v-md-editor/lib/theme/vuepress.js";
import "@kangc/v-md-editor/lib/theme/style/vuepress.css";

import Prism from "prismjs";

// highlightjs

// codemirror 编辑器的相关资源
import Codemirror from "codemirror";
// mode
import "codemirror/mode/markdown/markdown";
import "codemirror/mode/javascript/javascript";
import "codemirror/mode/css/css";
import "codemirror/mode/htmlmixed/htmlmixed";
import "codemirror/mode/vue/vue";
// edit
import "codemirror/addon/edit/closebrackets";
import "codemirror/addon/edit/closetag";
import "codemirror/addon/edit/matchbrackets";
// placeholder
import "codemirror/addon/display/placeholder";
// active-line
import "codemirror/addon/selection/active-line";
// scrollbar
import "codemirror/addon/scroll/simplescrollbars";
import "codemirror/addon/scroll/simplescrollbars.css";
// style
import "codemirror/lib/codemirror.css";

//katex
import createKatexPlugin from "@kangc/v-md-editor/lib/plugins/katex/cdn";

VueMarkdownEditor.Codemirror = Codemirror;

export const vueMarkdownEditor = VueMarkdownEditor;
vueMarkdownEditor
  .use(vuepressTheme, {
    Prism,
  })
  .use(createKatexPlugin());

export const vueMarkdownPreviewer = VueMarkdownPreviewer;
vueMarkdownPreviewer
  .use(vuepressTheme, {
    Prism,
  })
  .use(createKatexPlugin());
