<template>
    <div class="left-contain">
        <div class="choose">
            <radio :chooseData=showOption :radio="radio" @getChange = change></radio>
            <radio :chooseData=mapOption :radio="radioMap" @getChange = changeMapData></radio>
        </div>
       
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { Ref } from "vue"
import Radio from './radio.vue'
const radio = ref('否')
const showOption = ref({
    txt:'是否显示贴图：',
    data:[
        {
        label: "否",
        value: "0",
        },
        {
        label: "是",
        value: "1",
        },
        ]
    })
const change = (val:string) => {
    radio.value = val
}
const radioMap = ref('成功数据')
const mapOption = ref({
    txt:'搜索数据：',
    data:[
        {
        label: "原始数据",
        value: "0",
        },
        {
        label: "成功数据",
        value: "1",
        },
        ]
})
const changeMapData = (val:string) => {
    radioMap.value = val
}

</script>

<style scoped lang="scss">
.left-contain{
    color: white;
    font-size: 100px;
    width: 330px;
    height: 100%;
    border: 1px solid red;
    .choose{
        width: 100%; 
        height: 60px;
        color: white;
        border: 1px solid rgb(167, 16, 49);
    }
}
</style>