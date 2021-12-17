---


---

<h2 id="根据路由动态生成pagelist">根据路由动态生成pageList</h2>
<pre><code>&lt;template&gt;
    &lt;div id="app"&gt;
        &lt;div id="nav" &gt;
        &lt;span class="navBar" v-for="item in routesItem" :key="item.path"&gt;
         
            &lt;span v-if="item.child"&gt;
              &lt;span  v-for="item in item.child"  :key="item.path"&gt;&lt;/span&gt;
              &lt;router-link  :to="item.path" &gt;{{item.name}}&lt;/router-link&gt; | 
            &lt;/span&gt;
            &lt;span else&gt;
              &lt;router-link  :to="item.path" &gt;{{item.meta.title}}&lt;/router-link&gt; | 
            &lt;/span&gt;  
        &lt;/span&gt;   
           &lt;/div&gt;
    &lt;router-view /&gt;
      &lt;/div&gt;
&lt;/template&gt;
&lt;script&gt;

  export default {
    data() {
      return {
        msg: "",
        routesItem: []
      }
    },
    mounted() {
      this.$nextTick(()=&gt;{
        this.getRouter()
      })
    },
    methods: {
      getRouter() {
        this.routesItem = this.$router.options.routes
      }
    },
  }
&lt;/script&gt;
&lt;style lang="less"&gt;
  #app
  {
  font-family:
  Avenir,
  Helvetica,
  Arial,
  sans-serif;
  -webkit-font-smoothing:
  antialiased;
  -moz-osx-font-smoothing:
  grayscale;
  text-align:
  center;
  color:
  #2c3e50;
  }
  #nav
  {
  padding:
  30px;
  a
  {
  font-weight:
  bold;
  color:
  #2c3e50;
  &amp;.router-link-exact-active
  {
  color:
  #42b983;
  }
  }
  }
&lt;/style&gt;
</code></pre>

