<template>
         <div class="search-data">
            <el-select v-model="value" filterable placeholder="Select">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
            <!-- <el-icon><Search /></el-icon> -->
        </div>

</template>

<script setup lang="ts">
import { ref } from 'vue';

    const options = [
  {
    value: 'Option1',
    label: 'Option1',
  },
  {
    value: 'Option2',
    label: 'Option2',
  },
  {
    value: 'Option3',
    label: 'Option3',
  },
  {
    value: 'Option4',
    label: 'Option4',
  },
  {
    value: 'Option5',
    label: 'Option5',
  },
]
// 搜索
const value = ref()
</script>

<style scoped>

</style>