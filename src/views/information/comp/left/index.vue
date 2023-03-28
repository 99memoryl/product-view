<template>
    <div class="left-contain">
        <div class="choose">
            <div class="map" v-for="item in chooseData" :key="item.txt">
                <div class="txt">{{ item.txt }}</div>
                <div class="my-radio">
                    <el-radio v-model="item.radio1" label="1" size="medium">{{ item.radio1 }}</el-radio>
                    <el-radio v-model="item.radio2" label="2" size="medium">{{item.radio1}}</el-radio>
                </div>
            </div>
            <div class="search-data"></div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// type ChooseData =  {
//     txt:string,
//     value:string,
//     value2:string
// }
const chooseData = ref([
    {
    txt:'是否显示贴图：',
    radio1:'否',
    radio2:'是'
    },
    {
    txt:'搜索数据：',
    radio1:'原始数据',
    radio2:'成功数据'
    },
    
])
console.log(chooseData.value);

</script>

<style scoped lang="scss">
.left-contain{
    color: white;
    font-size: 100px;
    width: 20%;
    height: 100%;
    border: 1px solid red;
    .choose{
        width: 100%; 
        height: 120px;
        color: white;
        border: 1px solid rgb(167, 16, 49);
       .map{
            height: 100%;
           display: flex;
           font-size: 18px;
           justify-content: flex-start;
           align-items: center;
           .txt{
               width: 150px;
               height: 30px;
               background-image: linear-gradient(to right, rgb(48, 94, 165), rgba(8, 21, 55,1));
               color:white;
               text-align: center;
               line-height: 30px;
               margin-right: 10px;
           }
           .my-radio{

           }
       }
    }
}
</style>