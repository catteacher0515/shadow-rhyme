<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const loading = ref(true)
const progress = ref(0)

onMounted(() => {
  const duration = 3000 // 3 seconds
  const interval = 30 // update every 30ms
  const step = 100 / (duration / interval)

  const timer = setInterval(() => {
    progress.value += step
    if (progress.value >= 100) {
      progress.value = 100
      loading.value = false
      clearInterval(timer)
    }
  }, interval)
})

const enterGame = () => {
  router.push('/main-hall')
}
</script>

<template>
  <div class="splash-container w-full h-screen flex flex-col items-center justify-center bg-zinc-900 text-white relative overflow-hidden">
    <!-- Background Safe Area -->
    <div class="absolute inset-0 bg-zinc-900 z-0"></div>

    <!-- Content -->
    <div class="z-10 flex flex-col items-center w-full max-w-md px-8 space-y-12">
      <!-- Logo Placeholder (3:2) -->
      <div class="w-48 aspect-[3/2] bg-zinc-700 flex items-center justify-center rounded-lg shadow-lg animate-pulse">
        <span class="text-zinc-400 font-bold tracking-widest">LOGO</span>
      </div>

      <!-- Loading Bar -->
      <div v-if="loading" class="w-full space-y-2">
        <div class="h-2 bg-zinc-800 rounded-full overflow-hidden">
          <div 
            class="h-full bg-emerald-500 transition-all duration-75 ease-linear"
            :style="{ width: `${progress}%` }"
          ></div>
        </div>
        <p class="text-center text-xs text-zinc-500 tracking-wider">LOADING... {{ Math.floor(progress) }}%</p>
      </div>

      <!-- Enter Button (3:1) -->
      <button 
        v-else
        @click="enterGame"
        class="w-48 aspect-[3/1] bg-emerald-600 hover:bg-emerald-500 transition-colors flex items-center justify-center rounded shadow-xl cursor-pointer group"
      >
        <span class="text-lg font-medium tracking-[0.2em] group-hover:scale-105 transition-transform">入戏</span>
      </button>
    </div>
    
    <!-- Footer/Copyright -->
    <div class="absolute bottom-8 text-zinc-600 text-xs">
      © 2026 SHADOW RHYME
    </div>
  </div>
</template>

<style scoped>
/* Ensure full height on mobile browsers */
.splash-container {
  min-height: 100dvh;
}
</style>
