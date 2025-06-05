<template>
  <div class="timer-container">
    <div class="mode-switch">
      <button 
        @click="switchMode"
        class="mode-btn"
      >
        {{ mode === 'stopwatch' ? '切换到倒计时' : '切换到正计时' }}
      </button>
    </div>

    <div class="time-display" :class="{ 'active': isRunning }">
      {{ formattedTime }}
    </div>

    <div class="controls">
      <van-button 
        @click="handleStart" 
        :color="isRunning ? '#FF4D4F' : '#7ED321'"
        size="large"
      >
        {{ isRunning ? '暂停' : '开始' }}
      </van-button>
      <van-button 
        @click="handleReset" 
        color="#4A90E2"
        size="large"
      >
        重置
      </van-button>
    </div>

    <div v-if="mode === 'countdown'" class="presets">
      <h3>快速设置</h3>
      <div class="preset-buttons">
        <van-button 
          v-for="minutes in presetTimes" 
          :key="minutes"
          @click="setCountdown(minutes)"
          plain
          type="primary"
        >
          {{ minutes }}分钟
        </van-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    mode: String,
    formattedTime: String,
    isRunning: Boolean,
    presetTimes: Array,
    handleStart: Function,
    handleReset: Function,
    switchMode: Function,
    setCountdown: Function
  }
};
</script>

<style scoped>
.timer-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
}

.time-display {
  font-size: 72px;
  font-family: 'Roboto Mono', monospace;
  margin: 30px 0;
  color: #333;
}

.time-display.active {
  color: #7ED321;
}

.controls {
  display: flex;
  gap: 15px;
  justify-content: center;
  margin-bottom: 30px;
}

.presets {
  margin-top: 20px;
}

.preset-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
  margin-top: 10px;
}

.mode-btn {
  background: none;
  border: none;
  color: #4A90E2;
  text-decoration: underline;
  cursor: pointer;
  font-size: 14px;
}
</style>
