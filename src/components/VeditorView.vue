<template>
  <div>
    <editor-content class="editor__content" :editor="editor"/>
  </div>
</template>

<script>
  import javascript from 'highlight.js/lib/languages/javascript'
  import css from 'highlight.js/lib/languages/css'
  import {Editor, EditorContent} from 'tiptap';
  import '../assets/css/main.less';
  import {
    Blockquote,
    CodeBlock,
    HardBreak,
    Heading,
    HorizontalRule,
    OrderedList,
    BulletList,
    ListItem,
    TodoItem,
    TodoList,
    Bold,
    Italic,
    Image,
    Link,
    Strike,
    Underline,
    History,
    CodeBlockHighlight,
    Table,
    TableHeader,
    TableCell,
    TableRow,
    Placeholder,
  } from 'tiptap-extensions'
  export default {
    name: "VeditorView",
    components: {
      EditorContent,
    },
    props:{
      value: {

      }
    },
    data() {
      return {
        editor: new Editor({
          extensions: [
            new Blockquote(),
            new BulletList(),
            new CodeBlock(),
            new HardBreak(),
            new Heading({levels: [1, 2, 3]}),
            new HorizontalRule(),
            new ListItem(),
            new OrderedList(),
            new TodoItem(),
            new TodoList(),
            new Bold(),
            new Italic(),
            new Link(),
            new Image(),
            new Strike(),
            new Underline(),
            new History(),
            new Table(),
            new TableHeader(),
            new TableCell(),
            new TableRow(),
            new CodeBlockHighlight({
              languages: {
                javascript,
                css,
              },
            }),
            new Placeholder({
              emptyClass: 'is-empty',
              emptyNodeText: this.placeholder,
              showOnlyWhenEditable: true,
            }),
          ],
          content: this.value,
          editable: false
        }),
      }
    },
    watch: {
      value: 'changeValue',
    },
    methods: {
      changeValue() {
        this.editor.setContent(this.value);
      }
    },
    beforeDestroy() {
      this.editor.destroy()
    }
  }
</script>

<style lang="less" scoped>

</style>
