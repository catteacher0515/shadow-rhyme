<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { ArrowLeft, Save, History, X, Trash2 } from 'lucide-vue-next';

const router = useRouter();

// --- State ---
type BodyPart = 'head' | 'body' | 'legs' | 'arms';
const activeTab = ref<BodyPart>('head');
const showHistory = ref(false);

interface PuppetState {
  head: string;
  body: string;
  legs: string;
  arms: string;
}

interface SavedWork {
  id: number;
  name: string;
  config: PuppetState;
  createdAt: string;
}

const currentPuppet = ref<PuppetState>({
  head: 'bg-stone-300',
  body: 'bg-red-700',
  legs: 'bg-red-800',
  arms: 'bg-red-600',
});

const savedWorks = ref<SavedWork[]>([]);

// --- Options ---
const colors = [
  { name: 'Red', class: 'bg-red-600' },
  { name: 'Amber', class: 'bg-amber-600' },
  { name: 'Emerald', class: 'bg-emerald-600' },
  { name: 'Blue', class: 'bg-blue-600' },
  { name: 'Stone', class: 'bg-stone-600' },
];

const headOptions = [
  { name: 'Standard', class: 'bg-stone-300' },
  { name: 'Dark', class: 'bg-stone-800' },
  { name: 'Light', class: 'bg-stone-100' },
];

// --- LocalStorage Logic ---
const STORAGE_KEY = 'saved_puppets';

const loadFromStorage = () => {
  const data = localStorage.getItem(STORAGE_KEY);
  if (data) {
    try {
      savedWorks.value = JSON.parse(data);
    } catch (e) {
      console.error('Failed to parse saved puppets', e);
      savedWorks.value = [];
    }
  }
};

const saveToStorage = (works: SavedWork[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(works));
};

// --- Actions ---
const handleBack = () => {
  router.push('/main-hall');
};

const handleSave = () => {
  const userInput = window.prompt('给你的皮影起个名字吧：', '我的皮影');
  
  // User cancelled
  if (userInput === null) {
    return;
  }

  // Handle empty name
  const name = userInput.trim() || '未命名作品';

  const now = new Date();
  const newWork: SavedWork = {
    id: now.getTime(),
    name: name,
    config: { ...currentPuppet.value }, // Deep copy
    createdAt: now.toLocaleString(),
  };

  savedWorks.value.unshift(newWork);
  saveToStorage(savedWorks.value);
  
  alert('皮影形象已保存！');
  showHistory.value = true;
};

const loadWork = (work: SavedWork) => {
  currentPuppet.value = { ...work.config };
  showHistory.value = false;
};

const deleteWork = (id: number) => {
  if (confirm('确定要删除这个存档吗？')) {
    savedWorks.value = savedWorks.value.filter(w => w.id !== id);
    saveToStorage(savedWorks.value);
  }
};

const selectColor = (option: any) => {
  if (activeTab.value === 'head') {
    currentPuppet.value.head = option.class;
  } else if (activeTab.value === 'body') {
    currentPuppet.value.body = option.class;
  } else if (activeTab.value === 'legs') {
    currentPuppet.value.legs = option.class;
  } else if (activeTab.value === 'arms') {
    currentPuppet.value.arms = option.class;
  }
};

// --- Computed Options based on Tab ---
const currentOptions = computed(() => {
  if (activeTab.value === 'head') return headOptions;
  return colors; // Reuse colors for body parts for now
});

// --- Lifecycle ---
onMounted(() => {
  loadFromStorage();
});

</script>

<template>
  <div class="h-screen flex flex-col bg-stone-100 text-stone-900 overflow-hidden">
    <!-- 1. Header -->
    <div class="flex-none h-14 bg-white flex items-center justify-between px-4 shadow-sm z-50 relative">
      <button @click="handleBack" class="p-2 active:bg-stone-100 rounded-full">
        <ArrowLeft class="w-6 h-6 text-stone-700" />
      </button>
      <h1 class="text-lg font-bold tracking-wide">皮影工坊</h1>
      <div class="flex items-center gap-1">
        <button @click="handleSave" class="p-2 active:bg-stone-100 rounded-full">
          <Save class="w-6 h-6 text-stone-700" />
        </button>
        <button @click="showHistory = true" class="p-2 active:bg-stone-100 rounded-full">
          <History class="w-6 h-6 text-stone-700" />
        </button>
      </div>
    </div>

    <!-- 2. Workspace (Stage) -->
    <!-- Relative container for skeleton assembly -->
    <div class="flex-1 relative bg-[#f5f5dc] overflow-hidden flex items-center justify-center">
      <!-- Puppet Container -->
      <div class="relative w-64 h-96">
        
        <!-- Debug Joint (Helper Component) -->
        <component :is="'div'" class="hidden">
           <!-- Define a reusable dot if we could, but inline is fine for simple debug -->
        </component>

        <!-- Layer 1 (z-10): Legs -->
        <!-- Left Leg -->
        <div class="absolute bottom-0 left-[35%] w-4 h-32 origin-top flex flex-col z-10" :class="currentPuppet.legs">
           <div class="w-1.5 h-1.5 bg-red-500 rounded-full absolute -top-0.5 left-1/2 -translate-x-1/2 z-50"></div> <!-- Hip Joint -->
           <!-- Boot -->
           <div class="w-8 h-4 bg-stone-900 absolute bottom-0 -left-2 rounded-sm"></div> 
        </div>
        <!-- Right Leg -->
        <div class="absolute bottom-0 right-[35%] w-4 h-32 origin-top flex flex-col z-10" :class="currentPuppet.legs">
           <div class="w-1.5 h-1.5 bg-red-500 rounded-full absolute -top-0.5 left-1/2 -translate-x-1/2 z-50"></div> <!-- Hip Joint -->
           <!-- Boot -->
           <div class="w-8 h-4 bg-stone-900 absolute bottom-0 -left-2 rounded-sm"></div>
        </div>


        <!-- Layer 2 (z-20): Body -->
        <div 
          class="absolute top-24 left-1/2 -translate-x-1/2 w-24 h-40 z-20 flex flex-col items-center"
        >
          <!-- Neck Joint Point -->
          <div class="w-1.5 h-1.5 bg-red-500 rounded-full absolute -top-1 left-1/2 -translate-x-1/2 z-50"></div>
          
          <!-- Torso Shape (Trapezoid-ish via borders or just block for now) -->
          <div class="w-full h-full rounded-t-xl shadow-sm" :class="currentPuppet.body"></div>
        </div>


        <!-- Layer 3 (z-30): Head -->
        <div 
          class="absolute top-8 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full shadow-md z-30 flex items-center justify-center border-2 border-stone-900/10"
          :class="currentPuppet.head"
        >
          <!-- Face placeholder -->
          <div class="w-1.5 h-1.5 bg-red-500 rounded-full z-50"></div> <!-- Neck Connect -->
        </div>


        <!-- Layer 4 (z-40): Arms -->
        <!-- Left Arm: left-[calc(50%-3.5rem)] -->
        <div class="absolute top-24 left-[calc(50%-3.5rem)] w-3 h-28 origin-top z-40 flex flex-col items-center -rotate-12" :class="currentPuppet.arms">
           <div class="w-1.5 h-1.5 bg-red-500 rounded-full absolute -top-0.5 left-1/2 -translate-x-1/2 z-50"></div> <!-- Shoulder -->
           <div class="w-1.5 h-1.5 bg-red-500 rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 z-50"></div> <!-- Elbow -->
           <!-- Hand -->
           <div class="w-4 h-4 rounded-full bg-stone-300 absolute -bottom-2"></div>
        </div>

        <!-- Right Arm: right-[calc(50%-3.5rem)] -->
        <div class="absolute top-24 right-[calc(50%-3.5rem)] w-3 h-28 origin-top z-40 flex flex-col items-center rotate-12" :class="currentPuppet.arms">
           <div class="w-1.5 h-1.5 bg-red-500 rounded-full absolute -top-0.5 left-1/2 -translate-x-1/2 z-50"></div> <!-- Shoulder -->
           <div class="w-1.5 h-1.5 bg-red-500 rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 z-50"></div> <!-- Elbow -->
           <!-- Hand -->
           <div class="w-4 h-4 rounded-full bg-stone-300 absolute -bottom-2"></div>
        </div>

      </div>
    </div>

    <!-- 3. Control Panel -->
    <div class="flex-none bg-white shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] z-50 relative">
      <!-- Tabs -->
      <div class="flex border-b border-stone-200">
        <button 
          v-for="tab in ['head', 'body', 'arms', 'legs'] as const"
          :key="tab"
          @click="activeTab = tab"
          class="flex-1 py-3 text-sm font-medium capitalize transition-colors"
          :class="activeTab === tab ? 'text-amber-600 border-b-2 border-amber-600' : 'text-stone-500'"
        >
          {{ tab }}
        </button>
      </div>
      
      <!-- Options Grid -->
      <div class="h-32 p-4 grid grid-cols-5 gap-3 overflow-y-auto">
        <button 
          v-for="opt in currentOptions" 
          :key="opt.name"
          @click="selectColor(opt)"
          class="w-12 h-12 rounded-full border-2 border-stone-200 flex items-center justify-center shadow-sm hover:scale-105 active:scale-95 transition-all"
          :class="opt.class"
        >
          <!-- Active Indicator -->
          <div 
             v-if="currentPuppet[activeTab] === opt.class" 
             class="w-4 h-4 bg-white rounded-full shadow-sm"
          ></div>
        </button>
      </div>
    </div>

    <!-- 4. History Drawer (Overlay) -->
    <div 
      v-if="showHistory" 
      class="fixed inset-0 z-[100] flex justify-end"
    >
      <!-- Backdrop -->
      <div class="absolute inset-0 bg-black/50 transition-opacity" @click="showHistory = false"></div>
      
      <!-- Side Panel -->
      <div class="relative w-80 h-full bg-white shadow-xl flex flex-col transform transition-transform duration-300 ease-in-out">
        <!-- Header -->
        <div class="flex items-center justify-between p-4 border-b border-stone-200">
          <h2 class="text-lg font-bold text-stone-800">我的皮影箱</h2>
          <button @click="showHistory = false" class="p-1 rounded-full hover:bg-stone-100">
            <X class="w-6 h-6 text-stone-500" />
          </button>
        </div>

        <!-- List -->
        <div class="flex-1 overflow-y-auto p-4 space-y-3">
          <div 
            v-if="savedWorks.length === 0" 
            class="text-center text-stone-400 py-10"
          >
            暂无存档，快去创作吧！
          </div>

          <div 
            v-for="work in savedWorks" 
            :key="work.id" 
            class="bg-stone-50 border border-stone-200 rounded-lg p-3 hover:border-amber-400 hover:shadow-sm transition-all cursor-pointer group"
            @click="loadWork(work)"
          >
            <div class="flex justify-between items-start mb-2">
              <div>
                <h3 class="font-medium text-stone-800 text-sm">{{ work.name }}</h3>
                <span class="text-xs text-stone-400">{{ work.createdAt }}</span>
              </div>
              <button 
                @click.stop="deleteWork(work.id)"
                class="opacity-0 group-hover:opacity-100 p-1.5 text-red-400 hover:bg-red-50 rounded transition-opacity"
              >
                <Trash2 class="w-4 h-4" />
              </button>
            </div>
            
            <!-- Mini Preview -->
            <div class="flex gap-2 mt-2">
              <div class="w-4 h-4 rounded-full border border-stone-200" :class="work.config.head" title="Head"></div>
              <div class="w-4 h-4 rounded-full border border-stone-200" :class="work.config.body" title="Body"></div>
              <div class="w-4 h-4 rounded-full border border-stone-200" :class="work.config.arms" title="Arms"></div>
              <div class="w-4 h-4 rounded-full border border-stone-200" :class="work.config.legs" title="Legs"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>
