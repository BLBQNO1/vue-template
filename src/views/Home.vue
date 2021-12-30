<template>
  <div class="home">
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <el-button @click="getBindAccount">按钮</el-button>
    <el-button type="danger" round>危险按钮</el-button>
  </div>
</template>

<script>
import HelloWorld from '@/components/HelloWorld.vue'
import { quickEntranceList } from '@/api/login'
export default {
  name: 'Home',
  components: {
    HelloWorld,
  },
  data() {
    return {}
  },
  created() {
    // this.getBindAccount()
  },
  methods: {
    async getBindAccount() {
      try {
        const res = await quickEntranceList()
      } catch (error) {
        console.log(error)
      }
    },
  },
}
</script>
<style lang='scss' scoped>
</style>