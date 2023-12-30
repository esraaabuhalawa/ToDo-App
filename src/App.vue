<template>
  <div id="app">
   <add-to-list></add-to-list>
  </div>
</template>

<script>
import AddToList from './components/AddToList.vue';

export default {
  components: { 'add-to-list':AddToList },
  name: 'App',
  
}
</script>

<style lang="scss">

</style>
