<template>
  <div id="app">
    <div class="app1"></div>
    <div class="app2" ref="parel">
      <HelloWorld ref="childel"></HelloWorld>
    </div>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld'
import {Drag} from './assets/drag.js'

export default {
  name: 'App',
  mounted () {
    console.log('this.$refs.parel---', this.$refs.parel.offsetWidth)
    console.log('this.$refs.parel---', this.$refs.childel.$el.offsetWidth)
    console.log('this.$refs.parel---', this.$refs.parel.offsetHeight)
    console.log('this.$refs.parel---', this.$refs.childel.$el.offsetHeight)
    new Drag(this.$refs.parel, this.$refs.childel.$el)
  },
  components: {
    HelloWorld
  }
}
</script>

<style lang="stylus">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
  display: flex;
  flex-direction: column;
}
.app1{
  flex 0 0 300px
}
.app2{
  flex 1
  border: 1px solid green;
  box-sizing border-box
  position: relative;
  display: flex;
  align-items:center;
  justify-content: space-around

}
</style>
