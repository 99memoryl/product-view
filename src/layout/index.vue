<template>
  <div class="head-bg">
    <div class="h-time">{{ time }}</div>
    <div class="h-title">综合影像生产平台</div>
    <div class="h-admin" @click="linkAdmin"><i class="iconfont">&#xe6b4;</i> 管理后台</div>
  </div>
  <div class="nav-bg">
    <div class="n-in">
      <div
        class="n-block"
        :class="{ active: route.path === '/information' }"
        @click="linkJump('/information')"
      >
        数据资源
      </div>
      <div
        class="n-block"
        :class="{ active: route.path === '/factor' }"
        @click="linkJump('/factor')"
      >
        算力资源
      </div>
    </div>
    <div class="n-in">
      <div
        class="n-block"
        :class="{ active: route.path === '/market' }"
        @click="linkJump('/market')"
      >
        人力资源
      </div>
      <div class="n-block" :class="{ active: route.path === '/ipark' }" @click="linkJump('/ipark')">
        生产作业
      </div>
    </div>
  </div>
  <router-view />
</template>
<script setup lang="ts">
// import dayjs from 'dayjs'
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { loadEnv } from '@/utils/env'
const { VITE_ADMIN_URL } = loadEnv()

const route = useRoute()
const router = useRouter()
const time = ref()
const timeFormat = () => {
  // const now = dayjs().day()
  const week = ['日', '一', '二', '三', '四', '五', '六']
  // time.value = `${dayjs().format('YYYY-MM-DD')} 星期${week[now]}`
}

const linkJump = (path: string) => {
  router.push(path)
}

const linkAdmin = () => {
  window.open(VITE_ADMIN_URL)
}

onMounted(() => {
  timeFormat()
})
</script>
<style scoped lang="scss">
.head-bg {
  background: url("../assets/layout/head-bg.gif") no-repeat center;
  width: 100%;
  height: 70px;
  // max-width: 1920px;
  // min-width: 1610px;
  margin: 0 auto;
  position: relative;

  .h-time {
    color: #fff;
    font-size: 14px;
    position: absolute;
    top: 8px;
    left: 10px;
  }

  .h-title {
    font-family: YouSheBiaoTiHei, sans-serif;
    font-size: 36px;
    color: #fff;
    letter-spacing: 3px;
    padding-top: 9px;
  }

  .h-admin {
    color: #fff;
    font-size: 14px;
    position: absolute;
    top: 8px;
    right: 10px;
    cursor: pointer;
  }
}

.nav-bg {
  display: flex;
  justify-content: space-between;
  width: 1610px;
  margin: -20px auto 0;
  position: relative;
  z-index: 1;

  .n-in {
    display: flex;

    .n-block {
      background: url("../assets/layout/nav-block.png") no-repeat;
      font-family: YouSheBiaoTiHei, sans-serif;
      width: 168px;
      height: 44px;
      font-size: 24px;
      color: #acc3dd;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      margin: 0 15px;
      transition: all ease 0.2s;

      &:hover {
        transform: scale(0.9);
      }

      &.active {
        color: #fff;
        background: url("../assets/layout/nav-block-active.gif") no-repeat;
      }
    }
  }
}
</style>
