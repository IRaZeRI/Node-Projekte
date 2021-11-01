Vue.component("hexo-map", {
    template: `
      <div class="hexo-map">
        <div class="hexo" v-for="cell in cells" :key="cell"></div>
      </div>
    `,
    props: {
      cells: {
        type: Number,
        default: 100
      }
    }
  });
  
  const vm = new Vue({
    el: "main",
    data() {
      return {
        cells: 100
      };
    },
    mounted() {
      this.makeRows();
      window.addEventListener("resize", () => this.makeRows());
  
      document.addEventListener("mousemove", (event) => {
        this.$el.style.setProperty("--mouse-x", event.clientX);
        this.$el.style.setProperty("--mouse-y", event.clientY);
      });
    },
    methods: {
      makeRows() {
        const hexo = window.document.body.clientWidth / 10;
        const rows = Math.ceil(window.document.body.clientHeight / hexo) + 2;
        this.cells = rows * 10;
      }
    }
  });
  