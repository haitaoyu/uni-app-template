<script>
export default {
  onShow: () => {
    const updateManager = uni.getUpdateManager()
    updateManager.onUpdateReady((res) => {
      uni.showModal({
        title: '更新提示',
        content: '新版本已经准备好，是否重启应用？',
        success(res) {
          if (res.confirm) {
            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
            updateManager.applyUpdate()
          }
        }
      })
    })
  }
}
</script>

<style lang="scss">
// 引入 uview ui 的样式文件
@import 'uview-plus/index.scss';

// 引入全局样式文件
@import '../style.css';
</style>
