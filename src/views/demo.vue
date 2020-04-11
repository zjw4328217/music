<template>
  <div>
    <!-- <ul v-if='showone' >
     <li>1</li>
     <li>2</li>
     <li>3</li>
     <li>4</li>
     <li>5</li>
   </ul>
   <ol v-else>
     <li>11</li>
     <li>22</li>
     <li>33</li>
     <li>44</li>
     <li>55</li>
    </ol>-->
    <el-row :gutter="1">
      <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1">
        <div class="grid-content bg-purple"></div>
      </el-col>
      <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11">
        <div class="grid-content bg-purple-light"></div>
      </el-col>
      <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11">
        <div class="grid-content bg-purple"></div>
      </el-col>
      <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1">
        <div class="grid-content bg-purple-light"></div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeName: "a",
      data: ["/a", "/b", "/c"],
      showone: false
    };
  },
  methods: {
    get(data) {}
  },
  mounted() {
    console.log(document.documentElement.offsetWidth);
    if (document.documentElement.offsetWidth > 820) {
      this.showone = true;
    }
    // if(document.documentElement.offsetWidth=)
  }
};
</script>
<style lang="scss" scoped>
ul {
  width: 100%;
  li {
    float: left;
    width: 40px;
    border: 2px solid #666;
    margin: 5px;
  }
}
ol {
  width: 100%;
  li {
    float: left;
    width: 2rem;
    border: 0.1rem solid #666;
    margin: 0.2rem;
  }
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
</style>