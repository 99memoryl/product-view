<template>
    <div class="map">
        <div class="txt">{{ props.chooseData.txt }}</div>
        <div class="my-radio">
            <el-radio-group v-model="props.radio" @change=onChange>
              <el-radio  v-for= "item in props.chooseData.data" :key="item.value" :label="item.label">{{ item.label}}</el-radio>
            </el-radio-group>
        </div>
    </div>
            <div class="search-data"></div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { Ref } from "vue"
const props = defineProps({
    chooseData:Object,
    radio:String
})
const emits = defineEmits<{
    (e:'getChange',value:string):void
}>()
const onChange = (val:any) => {
    emits('getChange',val)
}
</script>

<style scoped lang="scss">
.map{
   height: 100%;
   display: flex;
   font-size: 17px;
   justify-content: flex-start;
   align-items: center;
   .txt{
       width: 119px;
       height: 30px;
       background-image: linear-gradient(to right, rgb(48, 94, 165), rgba(8, 21, 55,1));
       color:white;
       line-height: 30px;
       margin-right: 10px;
   }
   .my-radio{

   }
       }
</style>