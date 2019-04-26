<template>
  <div class="card-group">
    <el-row :gutter="10">
      <el-col class="card-item" v-for="(item, index) in iconArray" :key="index" :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
        <el-card class="item-content" :class="{'icon-active': item === isActiveIcon}" shadow="hover">
          <el-tooltip effect="dark" :content='`<a-icon type="${item}"></a-icon>`' placement="top">
            <div
              class="item-icon"
              @click="isActiveIcon = item;"
              v-clipboard:copy='`<a-icon type="${item}"></a-icon>`'
              v-clipboard:success="onCopy"
              v-clipboard:error="onError"
            >
              <a-icon :type="item"></a-icon>
            </div>
          </el-tooltip>
          <div class="item-class">{{item}}</div>
        </el-card>
      </el-col>
      <el-col v-if="!isAll" :span="24">
        <div class="show-more" @click="showMore">
          更 多
          <a-icon type="sync"></a-icon>
        </div>
      </el-col>
      <el-col v-if="isClose" :span="24">
        <div class="show-close" @click="closeBox">
          收 起
          <a-icon type="sync"></a-icon>
        </div>
      </el-col>
      <el-col v-if="!isAll" :span="24">
        <div class="show-all" @click="showAll">
          全 部
          <a-icon type="sync"></a-icon>
        </div>
      </el-col>
    </el-row>
    <div class="page-close" @click="closeBox" v-if="isClose">
      <el-tooltip effect="dark" content="收起" placement="left">
        <i class="el-icon-minus"></i>
      </el-tooltip>
    </div>
    <div class="page-more" @click="showMore"  v-if="!isAll">
      <el-tooltip effect="dark" content="更多" placement="left">
        <i class="el-icon-plus"></i>
      </el-tooltip>
    </div>
    <div class="page-all" @click="showAll" v-if="!isAll">
      <el-tooltip effect="dark" content="全部" placement="left">
        <i class="el-icon-refresh"></i>
      </el-tooltip>
    </div>
  </div>
</template>

<script>
  export default {
    name: "CardGroup",
    components: {},
    data() {
      const iconArrayAll = ['check-circle', 'CI', 'Dollar', 'compass', 'close-circle', 'frown', 'info-circle', 'left-circle', 'down-circle', 'EURO', 'copyright', 'minus-circle', 'meh', 'plus-circle', 'play-circle', 'question-circle', 'Pound', 'right-circle', 'smile', 'trademark', 'time-circle', 'timeout', 'earth', 'YUAN', 'up-circle', 'warning-circle', 'sync', 'transaction', 'undo', 'redo', 'reload', 'reloadtime', 'message', 'dashboard', 'issuesclose', 'poweroff', 'logout', 'piechart', 'setting', 'eye', 'location', 'edit-square', 'export', 'save', 'Import', 'appstore', 'close-square', 'down-square', 'layout', 'left-square', 'play-square', 'control', 'codelibrary', 'detail', 'minus-square', 'plus-square', 'right-square', 'project', 'wallet', 'up-square', 'calculator', 'interation', 'check-square', 'border', 'border-outer', 'border-top', 'border-bottom', 'border-left', 'border-right', 'border-inner', 'border-verticle', 'border-horizontal', 'radius-bottomleft', 'radius-bottomright', 'radius-upleft', 'radius-upright', 'radius-setting', 'adduser', 'deleteteam', 'deleteuser', 'addteam', 'user', 'team', 'areachart', 'linechart', 'barchart', 'pointmap', 'container', 'database', 'sever', 'mobile', 'tablet', 'redenvelope', 'book', 'filedone', 'reconciliation', 'file-exception', 'filesync', 'filesearch', 'solution', 'fileprotect', 'file-add', 'file-excel', 'file-exclamation', 'file-pdf', 'file-image', 'file-markdown', 'file-unknown', 'file-ppt', 'file-word', 'file', 'file-zip', 'file-text', 'file-copy', 'snippets', 'audit', 'diff', 'Batchfolding', 'securityscan', 'propertysafety', 'safetycertificate', 'insurance', 'alert', 'delete', 'hourglass', 'bulb', 'experiment', 'bell', 'trophy', 'rest', 'USB', 'skin', 'home', 'bank', 'filter', 'funnelplot', 'like', 'unlike', 'unlock', 'lock', 'customerservice', 'flag', 'moneycollect', 'medicinebox', 'shop', 'rocket', 'shopping', 'folder', 'folder-open', 'folder-add', 'deploymentunit', 'accountbook', 'contacts', 'carryout', 'calendar-check', 'calendar', 'scan', 'select', 'boxplot', 'build', 'sliders', 'laptop', 'barcode', 'camera', 'cluster', 'gateway', 'car', 'printer', 'read', 'cloud-server', 'cloud-upload', 'cloud', 'cloud-download', 'cloud-sync', 'video', 'notification', 'sound', 'radarchart', 'qrcode', 'fund', 'image', 'mail', 'table', 'idcard', 'creditcard', 'heart', 'block', 'error', 'star', 'gold', 'heatmap', 'wifi', 'attachment', 'edit', 'key', 'api', 'disconnect', 'highlight', 'monitor', 'link', 'man', 'percentage', 'pushpin', 'phone', 'shake', 'tag', 'wrench', 'tags', 'scissor', 'mr', 'share', 'branches', 'fork', 'shrink', 'arrawsalt', 'verticalright', 'verticalleft', 'right', 'left', 'up', 'down', 'fullscreen', 'fullscreen-exit', 'doubleleft', 'doubleright', 'arrowright', 'arrowup', 'arrowleft', 'arrowdown', 'upload', 'colum-height', 'vertical-align-botto', 'vertical-align-middl', 'totop', 'vertical-align-top', 'download', 'sort-descending', 'sort-ascending', 'fall', 'swap', 'stock', 'rise', 'indent', 'outdent', 'menu', 'unorderedlist', 'orderedlist', 'align-right', 'align-center', 'align-left', 'pic-center', 'pic-right', 'pic-left', 'bold', 'font-colors', 'exclaimination', 'font-size', 'infomation', 'line-height', 'strikethrough', 'underline', 'number', 'italic', 'code', 'column-width', 'check', 'ellipsis', 'dash', 'close', 'enter', 'line', 'minus', 'question', 'rollback', 'small-dash', 'pause', 'bg-colors', 'crown', 'drag', 'desktop', 'gift', 'stop', 'fire', 'thunderbolt', 'check-circle-fill', 'left-circle-fill', 'down-circle-fill', 'minus-circle-fill', 'close-circle-fill', 'info-circle-fill', 'up-circle-fill', 'right-circle-fill', 'plus-circle-fill', 'question-circle-fill', 'EURO-circle-fill', 'frown-fill', 'copyright-circle-fil', 'CI-circle-fill', 'compass-fill', 'Dollar-circle-fill', 'poweroff-circle-fill', 'meh-fill', 'play-circle-fill', 'Pound-circle-fill', 'smile-fill', 'stop-fill', 'warning-circle-fill', 'time-circle-fill', 'trademark-circle-fil', 'YUAN-circle-fill', 'heart-fill', 'piechart-circle-fil', 'dashboard-fill', 'message-fill', 'check-square-fill', 'down-square-fill', 'minus-square-fill', 'close-square-fill', 'codelibrary-fill', 'left-square-fill', 'play-square-fill', 'up-square-fill', 'right-square-fill', 'plus-square-fill', 'accountbook-fill', 'carryout-fill', 'calendar-fill', 'calculator-fill', 'interation-fill', 'project-fill', 'detail-fill', 'save-fill', 'wallet-fill', 'control-fill', 'layout-fill', 'appstore-fill', 'mobile-fill', 'tablet-fill', 'book-fill', 'redenvelope-fill', 'safetycertificate-f', 'propertysafety-fill', 'insurance-fill', 'securityscan-fill', 'file-exclamation-fil', 'file-add-fill', 'file-fill', 'file-excel-fill', 'file-markdown-fill', 'file-text-fill', 'file-ppt-fill', 'file-unknown-fill', 'file-word-fill', 'file-zip-fill', 'file-pdf-fill', 'file-image-fill', 'diff-fill', 'file-copy-fill', 'snippets-fill', 'batchfolding-fill', 'reconciliation-fill', 'folder-add-fill', 'folder-fill', 'folder-open-fill', 'database-fill', 'container-fill', 'sever-fill', 'calendar-check-fill', 'image-fill', 'idcard-fill', 'creditcard-fill', 'fund-fill', 'read-fill', 'contacts-fill', 'delete-fill', 'notification-fill', 'flag-fill', 'moneycollect-fill', 'medicinebox-fill', 'rest-fill', 'shopping-fill', 'skin-fill', 'video-fill', 'sound-fill', 'bulb-fill', 'bell-fill', 'filter-fill', 'fire-fill', 'funnelplot-fill', 'gift-fill', 'hourglass-fill', 'home-fill', 'trophy-fill', 'location-fill', 'cloud-fill', 'customerservice-fill', 'experiment-fill', 'eye-fill', 'like-fill', 'lock-fill', 'unlike-fill', 'star-fill', 'unlock-fill', 'alert-fill', 'api-fill', 'highlight-fill', 'phone-fill', 'edit-fill', 'pushpin-fill', 'rocket-fill', 'thunderbolt-fill', 'tag-fill', 'wrench-fill', 'tags-fill', 'bank-fill', 'camera-fill', 'error-fill', 'crown-fill', 'mail-fill', 'car-fill', 'printer-fill', 'shop-fill', 'setting-fill', 'USB-fill', 'golden-fill', 'build-fill', 'boxplot-fill', 'sliders-fill', 'alibaba', 'alibabacloud', 'antdesign', 'ant-cloud', 'behance', 'googleplus', 'medium', 'google', 'IE', 'amazon', 'slack', 'alipay', 'taobao', 'zhihu', 'HTML5', 'linkedin', 'yahoo', 'facebook', 'skype', 'CodeSandbox', 'chrome', 'codepen', 'aliwangwang', 'apple', 'android', 'sketch', 'Gitlab', 'dribbble', 'instagram', 'reddit', 'windows', 'yuque', 'Youtube', 'Gitlab-fill', 'dropbox', 'dingtalk', 'android-fill', 'apple-fill', 'HTML5-fill', 'windows-fill', 'QQ', 'twitter', 'skype-fill', 'weibo', 'yuque-fill', 'Youtube-fill', 'yahoo-fill', 'wechat-fill', 'chrome-fill', 'alipay-circle-fill', 'aliwangwang-fill', 'behance-circle-fill', 'amazon-circle-fill', 'codepen-circle-fill', 'CodeSandbox-circle-f', 'dropbox-circle-fill', 'github-fill', 'dribbble-circle-fill', 'googleplus-circle-f', 'medium-circle-fill', 'QQ-circle-fill', 'IE-circle-fill', 'google-circle-fill', 'dingtalk-circle-fill', 'sketch-circle-fill', 'slack-circle-fill', 'twitter-circle-fill', 'taobao-circle-fill', 'weibo-circle-fill', 'zhihu-circle-fill', 'reddit-circle-fill', 'alipay-square-fill', 'dingtalk-square-fill', 'CodeSandbox-square-f', 'behance-square-fill', 'amazon-square-fill', 'codepen-square-fill', 'dribbble-square-fill', 'dropbox-square-fill', 'facebook-fill', 'googleplus-square-f', 'google-square-fill', 'instagram-fill', 'IE-square-fill', 'medium-square-fill', 'linkedin-fill', 'QQ-square-fill', 'reddit-square-fill', 'twitter-square-fill', 'sketch-square-fill', 'slack-square-fill', 'taobao-square-fill', 'weibo-square-fill', 'zhihu-square-fill', 'zoomout', 'apartment', 'audio', 'audio-fill', 'robot', 'zoomin', 'robot-fill', 'bug-fill', 'bug', 'audiostatic', 'comment', 'signal-fill', 'verified', 'shortcut-fill', 'videocameraadd', 'switchuser', 'whatsapp', 'appstoreadd', 'caret-down', 'backward', 'caret-up', 'caret-right', 'caret-left', 'fast-backward', 'forward', 'fast-forward', 'search', 'retweet', 'login', 'step-backward', 'step-forward', 'swap-right', 'swap-left', 'woman', 'plus', 'eyeclose-fill', 'eye-close', 'clear', 'collapse', 'expand', 'deletecolumn', 'merge-cells', 'subnode', 'rotate-left', 'rotate-right', 'insertrowbelow', 'insertrowabove', 'table', 'solit-cells', 'formatpainter', 'insertrowright', 'formatpainter-fill', 'insertrowleft', 'translate', 'deleterow', 'sisternode'];
      const iconArray = iconArrayAll.slice(0, 48);
      return {
        iconArray,
        iconArrayAll,
        isActiveIcon: null,
        isAll: false,
        isClose: false,
      }
    },
    methods: {
      onCopy: function (e) {
        this.$message.success({message:`复制成功:${e.text}`, center: true});
      },
      onError: function () {
        this.$message.error({message:`复制失败！`, center: true});
      },
      showMore: function () {
        let sumNow = this.iconArray.length;
        const sumAll = this.iconArrayAll.length;
        if (sumNow + 48 > 48) {
          this.isClose = true;
        }
        if (sumNow + 48 >= sumAll) {
          sumNow = sumAll;
          this.isAll = true;
        } else {
          sumNow = sumNow + 48;
        }
        this.iconArray = this.iconArrayAll.slice(0, sumNow);
      },
      showAll: function () {
        this.iconArray = this.iconArrayAll;
        this.isAll = true;
        this.isClose = true;
      },
      closeBox: function () {
        this.iconArray = this.iconArrayAll.slice(0, 48);
        this.isAll = false;
        this.isClose = false;
      }
    }
  }
</script>

<style lang="less" scoped>
  .card-group {
    .show-more, .show-all, .show-close{
      text-align: center;
      cursor: pointer;
      font-size: 15px;
      height: 50px;
      line-height: 50px;
      transition: all .5s;
      margin-bottom: 20px;
      background-color: #fff;
      box-shadow: 0 0 6px rgba(0, 0, 0, .3);;
      &:hover {
        background-color: rgba(24, 144, 255, .3);
        color: #fff;
        font-weight: bold;
      }
    }
    .show-more{
      margin-top: 100px;
    }
    .page-more, .page-close, .page-all{
      background-color: #409eff;
      position: fixed;
      right: 50px;
      width: 40px;
      height: 40px;
      border-radius: 20px;
      cursor: pointer;
      transition: .3s;
      box-shadow: 0 3px 6px rgba(0, 0, 0, .5);
      opacity: .5;
      z-index: 100;
      i{
        color: #fff;
        display: block;
        line-height: 40px;
        text-align: center;
        font-size: 18px;
      }
      p{
        display: none;
        text-align: center;
        color: #fff;
      }
      &:hover{
        opacity: 1;
      }
    }
    .page-more {
      bottom: 150px;
    }
    .page-close {
      bottom: 210px;
    }
    .page-all {
      bottom: 90px;
    }
    .card-item {
      margin: 10px 0;
      .icon-active{
        box-shadow: 0 0px 12px 0 rgba(24, 144, 255, .8) !important;
      }
      .item-content{
        cursor: pointer;
        &:hover {
          box-shadow: 0 0px 12px 0 rgba(24, 144, 255, .8) !important;
          .item-icon{
            i{
              font-size: 60px;
              color: #1890ff;
            }
          }
          .item-class {
            color: #1890ff;
          }
        }
        .item-icon {
          text-align: center;
          height: 70px;
          padding-bottom: 20px;
          border-bottom: 1px solid #cccccc;

          i{
            font-size: 40px;
            line-height: 70px;
            transition: .2s all;
          }
        }
        .item-class {
          padding-top: 20px;
          font-size: 16px;
          text-align: center;
        }
      }
    }
  }
</style>
