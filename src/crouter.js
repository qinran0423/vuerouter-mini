import Vue from 'vue';

class Croute {
  constructor(Vue, options) {
    this.$options = options;
    this.routeMap = {};
    this.app = new Vue({
      data: {
        current: '#/'
      }
    })

    this.init();
    this.createRouteMap(this.$options);
    this.initComponent(Vue);
  }

  init() {
    window.addEventListener('load', this.onHashChange.bind(this), false);
    window.addEventListener('hashchange', this.onHashChange.bind(this), false);
  }


  createRouteMap(options) {
    options.routes.forEach(item => {
      this.routeMap[item.path] = item.component;
    })
  }

  initComponent(Vue) {
    Vue.component('crouter-link', {
      props: {
        to: String
      },
      render(h) {
        return h(
          "a",
          {
            attrs: { href: this.to },
          },
          this.$slots.default
        );
      },
    })

    const _this = this;
    Vue.component('crouter-view', {
      render(h) {
        var component = _this.routeMap[_this.app.current];
        return h(component);
      },
    })
  }
  // 获取当前 hash 串
  getHash() {
    return window.location.hash.slice(1) || "/";
  }

  onHashChange() {
    this.app.current = this.getHash();
  }
}


// import Home from '@/components/Home.vue';
// import HelloWorld from '@/components/HelloWorld.vue';

// export default new Croute(Vue, {
//   routes: [{ path: "/home", component: Home }, { path: "/helloworld", component: HelloWorld }]
// });