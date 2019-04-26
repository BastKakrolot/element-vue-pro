<template>
  <div class="editor">
    <editor-menu-bubble class="menububble" :editor="editor" @hide="hideLinkMenu">
      <div
        slot-scope="{ commands, isActive, getMarkAttrs, menu }"
        class="menububble"
        :class="{ 'is-active': menu.isActive }"
        :style="`left: ${menu.left}px; bottom: ${menu.bottom}px;`"
      >
        <form class="menububble__form" v-if="linkMenuIsActive" @submit.prevent="setLinkUrl(commands.link, linkUrl)">
          <el-input class="menububble__input" type="text" v-model="linkUrl" placeholder="https://" ref="linkInput"
                    @keydown.esc="hideLinkMenu"/>
          <el-tooltip :open-delay="200" :enterable="false" placement="top" content="删除链接">
            <button class="menububble__button" @click="setLinkUrl(commands.link, null)" type="button">
              <a-icon type="close"/>
              <span>删除链接</span>
            </button>
          </el-tooltip>
        </form>
        <template v-else>
          <el-tooltip :open-delay="200" :enterable="false" placement="top" :content="isActive.link() ? '更新链接' : '添加链接'">
            <button
              class="menububble__button"
              @click="showLinkMenu(getMarkAttrs('link'))"
              :class="{ 'is-active': isActive.link() }"
            >
              <a-icon :type="isActive.link() ? 'wrench' : 'link'"/>
              <span>{{isActive.link() ? '修改链接' : '添加链接'}}</span>
            </button>
          </el-tooltip>
        </template>
        <div class="editor__line"></div>
        <el-tooltip :open-delay="200" :enterable="false" placement="top" content="插入图片">
          <button
            class="menubar__button"
            @click="showImagePrompt(commands.image)"
          >
            <a-icon type="image"/>
            <span>插入图片</span>
          </button>
        </el-tooltip>
        <div class="editor__line"></div>
        <el-tooltip :open-delay="200" :enterable="false" placement="top" content="粗体">
          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.bold() }"
            @click="commands.bold"
          >
            <a-icon type="bold"/>
            <span>粗体</span>
          </button>
        </el-tooltip>
        <el-tooltip :open-delay="200" :enterable="false" placement="top" content="斜体">
          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.italic() }"
            @click="commands.italic"
          >
            <a-icon type="italic"/>
            <span>斜体</span>
          </button>
        </el-tooltip>
        <el-tooltip :open-delay="200" :enterable="false" placement="top" content="添加删除线">
          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.strike() }"
            @click="commands.strike"
          >
            <a-icon type="strikethrough"/>
            <span>删除线</span>
          </button>
        </el-tooltip>
        <el-tooltip :open-delay="200" :enterable="false" placement="top" content="添加下划线">
          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.underline() }"
            @click="commands.underline"
          >
            <a-icon type="underline"/>
            <span>下划线</span>
          </button>
        </el-tooltip>
        <el-tooltip :open-delay="200" :enterable="false" placement="top" content="段落">
          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.paragraph() }"
            @click="commands.paragraph"
          >
            <a-icon type="mr"/>
            <span>段落</span>
          </button>
        </el-tooltip>
        <el-dropdown :hide-on-click="false" @command="handleCommand($event, commands)">
          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.heading({ level: 1 }) || isActive.heading({ level: 2 }) || isActive.heading({ level: 3 }) }"
          >
            <a-icon type="font-size"/>
            <span>标题</span>
            <a-icon type="caret-down"/>
          </button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item
              class="menubar__button"
              :class="{ 'is-active': isActive.heading({ level: 1 }) }"
              :command="1"
            >
              <span>H1&nbsp;一级标题</span>
            </el-dropdown-item>
            <el-dropdown-item
              class="menubar__button"
              :class="{ 'is-active': isActive.heading({ level: 2 }) }"
              :command="2"
            >
              <span>H2&nbsp;二级标题</span>
            </el-dropdown-item>
            <el-dropdown-item
              class="menubar__button"
              :class="{ 'is-active': isActive.heading({ level: 3 }) }"
              :command="3"
            >
              <span>H3&nbsp;三级标题</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-tooltip :open-delay="200" :enterable="false" placement="top" content="无序列表">
          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.bullet_list() }"
            @click="commands.bullet_list"
          >
            <a-icon type="unorderedlist"/>
            <span>无序列表</span>
          </button>
        </el-tooltip>
        <el-tooltip :open-delay="200" :enterable="false" placement="top" content="有序列表">
          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.ordered_list() }"
            @click="commands.ordered_list"
          >
            <a-icon type="orderedlist"/>
            <span>有序列表</span>
          </button>
        </el-tooltip>
        <el-tooltip :open-delay="200" :enterable="false" placement="top" content="引用">
          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.blockquote() }"
            @click="commands.blockquote"
          >
            <a-icon type="pic-center"/>
            <span>引用</span>
          </button>
        </el-tooltip>
        <el-tooltip :open-delay="200" :enterable="false" placement="top" content="代码">
          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.code_block() }"
            @click="commands.code_block"
          >
            <a-icon type="code"/>
            <span>代码</span>
          </button>
        </el-tooltip>
        <el-tooltip :open-delay="200" :enterable="false" placement="top" content="分割线">
          <button
            class="menubar__button"
            @click="commands.horizontal_rule"
          >
            <a-icon type="line"/>
            <span>分割线</span>
          </button>
        </el-tooltip>

        <el-tooltip :open-delay="200" :enterable="false" placement="top" content="添加表格">
          <button
            class="menubar__button"
            @click="commands.createTable({rowsCount: 3, colsCount: 4, withHeaderRow: false })"
          >
            <a-icon type="table"/>
            <span>表格</span>
          </button>
        </el-tooltip>
        <div
          v-if="isActive.table()"
          class="editor__line"
        >
        </div>
        <el-tooltip :open-delay="200" :enterable="false" placement="top" content="删除表格">
          <button
            v-if="isActive.table()"
            class="menubar__button"
            @click="commands.deleteTable"
          >
            <a-icon type="close"/>
            <span>删除表</span>
          </button>
        </el-tooltip>
        <el-tooltip :open-delay="200" :enterable="false" placement="top" content="在之前插入一列">
          <button
            v-if="isActive.table()"
            class="menubar__button"
            @click="commands.addColumnBefore"
          >
            <a-icon type="insertrowleft"/>
            <span>前插列</span>
          </button>
        </el-tooltip>
        <el-tooltip :open-delay="200" :enterable="false" placement="top" content="在之后插入一列">
          <button
            v-if="isActive.table()"
            class="menubar__button"
            @click="commands.addColumnAfter"
          >
            <a-icon type="insertrowright"/>
            <span>后插列</span>
          </button>
        </el-tooltip>
        <el-tooltip :open-delay="200" :enterable="false" placement="top" content="删除当前列">
          <button
            v-if="isActive.table()"
            class="menubar__button"
            @click="commands.deleteColumn"
          >
            <a-icon type="deletecolumn"/>
            <span>删除列</span>
          </button>
        </el-tooltip>
        <el-tooltip :open-delay="200" :enterable="false" placement="top" content="在之前插入一行">
          <button
            v-if="isActive.table()"
            class="menubar__button"
            @click="commands.addRowBefore"
          >
            <a-icon type="insertrowabove"/>
            <span>前插行</span>
          </button>
        </el-tooltip>
        <el-tooltip :open-delay="200" :enterable="false" placement="top" content="在之后插入一行">
          <button
            v-if="isActive.table()"
            class="menubar__button"
            @click="commands.addRowAfter"
          >
            <a-icon type="insertrowbelow"/>
            <span>后插行</span>
          </button>
        </el-tooltip>
        <el-tooltip :open-delay="200" :enterable="false" placement="top" content="删除当前行">
          <button
            v-if="isActive.table()"
            class="menubar__button"
            @click="commands.deleteRow"
          >
            <a-icon type="deleterow"/>
            <span>删除行</span>
          </button>
        </el-tooltip>
        <el-tooltip :open-delay="200" :enterable="false" placement="top" content="合并单元格">
          <button
            v-if="isActive.table()"
            class="menubar__button"
            @click="commands.toggleCellMerge"
          >
            <a-icon type="merge-cells"/>
            <span>合并</span>
          </button>
        </el-tooltip>
        <div class="editor__line"></div>
        <el-tooltip :open-delay="200" :enterable="false" placement="top" content="后退">
          <button
            class="menubar__button"
            @click="commands.undo"
          >
            <a-icon type="undo"/>
            <span>后退</span>
          </button>
        </el-tooltip>
        <el-tooltip :open-delay="200" :enterable="false" placement="top" content="前进">
          <button
            class="menubar__button"
            @click="commands.redo"
          >
            <a-icon type="redo"/>
            <span>前进</span>
          </button>
        </el-tooltip>
      </div>
    </editor-menu-bubble>
    <editor-content class="editor__content" :editor="editor"/>
  </div>
</template>

<script>
  import javascript from 'highlight.js/lib/languages/javascript'
  import css from 'highlight.js/lib/languages/css'
  import {Editor, EditorContent, EditorMenuBubble} from 'tiptap';
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
    name: "Veditor",
    components: {
      EditorContent,
      EditorMenuBubble
    },
    props:{
      initContent: {
        defalut: null
      },
      placeholder: {
        defalut: null
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
          onUpdate: (state) => {
            this.$emit('change', state);
          },
          content: this.initContent,
        }),
        linkUrl: null,
        linkMenuIsActive: false,
      }
    },
    beforeDestroy() {
      this.editor.destroy()
    },
    methods: {
      showLinkMenu(attrs) {
        this.linkUrl = attrs.href
        this.linkMenuIsActive = true
        this.$nextTick(() => {
          this.$refs.linkInput.focus()
        })
      },
      hideLinkMenu() {
        this.linkUrl = null
        this.linkMenuIsActive = false
      },
      setLinkUrl(command, url) {
        command({href: url})
        this.hideLinkMenu()
        this.editor.focus()
      },
      showImagePrompt(command) {
        const src = prompt('Enter the url of your image here')
        if (src !== null) {
          command({src})
        }
      },
      handleCommand(item, command) {
        console.log(item);
        console.log(command);
        command.heading({ level: item });
      }
    },
  }
</script>
