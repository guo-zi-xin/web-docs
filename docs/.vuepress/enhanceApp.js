// 做一些应用级别配置
export default ({ router }) => {
  router.beforeEach((to, form, next) => {
    if (typeof _hmt !== 'undefined') {
      if (to.path) {
        _hmt.push(["_trackPageview", to.fullPath]);
      }
    }
    next();
  });
  // router.onReady(() => {
  //   const { hash } = document.location;
  //   setTimeout(() => {
  //     if (hash.length > 1) {
  //       const id = decodeURIComponent(hash);
  //       const el = document.querySelector(`.reco-side-${decodeURIComponent(id).substring(1)}`);
  //       el.click();
  //     }
  //   }, 1000);
  // });
};