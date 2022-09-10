<script setup>
import { onMounted } from "vue";
import { useRouter } from 'vue-router'

onMounted(() => useRouter().push('/contacts'))

</script>

<template>
  <router-view></router-view>
</template>

