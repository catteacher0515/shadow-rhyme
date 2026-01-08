<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

interface NavItem {
  name: string;
  label: string;
  color: string;
  isMain?: boolean;
}

const navItems = ref<NavItem[]>([
  { name: '皮影工坊', label: '工坊', color: 'bg-amber-600' },
  { name: '指尖剧场', label: '入戏', color: 'bg-red-700', isMain: true },
  { name: '非遗科普', label: '科普', color: 'bg-emerald-600' },
  { name: '对战模式', label: '对战', color: 'bg-blue-600' }, // Test item
]);

const handleNavClick = (name: string) => {
  console.log(`Navigated to: ${name}`);
};
</script>

<template>
  <div class="h-screen w-full flex flex-col bg-stone-900 text-stone-100 overflow-hidden">
    <!-- 1. Top: User Profile -->
    <div class="flex-none p-4 bg-stone-800 flex items-center gap-4 shadow-md z-10">
      <div class="w-12 h-12 rounded-full bg-stone-600 flex items-center justify-center shrink-0">
        <span class="text-xs text-stone-400">Avatar</span>
      </div>
      <div class="flex flex-col">
        <span class="font-bold text-lg">皮影戏迷</span>
        <span class="text-xs text-stone-400">Lv.1 初出茅庐</span>
      </div>
    </div>

    <!-- 2. Middle: Stage Area -->
    <div class="flex-1 flex flex-col items-center justify-center p-4 relative">
      <div class="w-full max-w-md aspect-[3/4] border-2 border-dashed border-stone-700 rounded-lg flex items-center justify-center bg-stone-800/50">
        <span class="text-xl font-serif tracking-widest text-stone-500">戏台区域</span>
      </div>
    </div>

    <!-- 3. Bottom: Navigation -->
    <!-- Dynamic Grid Layout -->
    <div 
      class="flex-none h-[100px] bg-stone-800 grid relative z-20 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.3)]"
      :style="{ gridTemplateColumns: `repeat(${navItems.length}, minmax(0, 1fr))` }"
    >
      <template v-for="item in navItems" :key="item.name">
        
        <!-- Main Button (Floating) -->
        <div v-if="item.isMain" class="relative flex justify-center h-full">
          <button 
            class="absolute -top-6 w-20 h-20 rounded-full flex flex-col items-center justify-center shadow-xl border-4 border-stone-800 active:scale-95 transition-transform"
            :class="item.color"
            @click="handleNavClick(item.name)"
          >
            <span class="text-2xl font-bold mb-1">🎭</span>
            <span class="text-xs font-bold text-white">{{ item.label }}</span>
          </button>
        </div>

        <!-- Normal Button -->
        <button 
          v-else
          class="flex flex-col items-center justify-center gap-2 active:opacity-80 transition-opacity"
          @click="handleNavClick(item.name)"
        >
          <div 
            class="w-12 h-10 rounded flex items-center justify-center shadow-sm"
            :class="item.color"
          >
            <span class="text-[10px] font-bold">{{ item.label }}</span>
          </div>
          <span class="text-sm font-medium text-stone-300">{{ item.name }}</span>
        </button>

      </template>
    </div>
  </div>
</template>
