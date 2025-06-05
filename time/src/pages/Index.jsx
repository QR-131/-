import { useState } from 'react';
import { useStore } from '../stores/timer';
import { Button } from '../components/ui/button';
import { toast } from 'sonner';
import { useInterval } from 'react-use';
import { Input } from '../components/ui/input';
import { TimerHistory } from '../components/TimerHistory';

export default function TimerPage() {
  const [mode, setMode] = useState('stopwatch');
  const [customMinutes, setCustomMinutes] = useState('');
  const presetTimes = [5, 10, 15, 30];
  
  const { 
    seconds, 
    isRunning, 
    startTimer, 
    stopTimer, 
    resetTimer, 
    setSeconds,
    history
  } = useStore();

  useInterval(
    () => {
      if (mode === 'countdown' && seconds <= 0) {
        stopTimer();
        toast('倒计时结束！');
        return;
      }
      setSeconds(seconds + (mode === 'countdown' ? -1 : 1));
    },
    isRunning ? 1000 : null
  );

  const pad = (num) => num.toString().padStart(2, '0');
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  const formattedTime = `${pad(hours)}:${pad(minutes)}:${pad(secs)}`;

  const handleStart = () => {
    if (mode === 'countdown' && seconds <= 0) {
      toast('请设置倒计时时间');
      return;
    }
    if (isRunning) {
      stopTimer();
    } else {
      startTimer();
    }
  };

  const handleReset = () => {
    resetTimer();
    if (mode === 'countdown') {
      setSeconds(0);
    }
  };

  const setCountdown = (minutes) => {
    setMode('countdown');
    setSeconds(minutes * 60);
  };

  const handleCustomTime = () => {
    const minutes = parseInt(customMinutes);
    if (isNaN(minutes) || minutes <= 0) {
      toast.error('请输入有效的分钟数');
      return;
    }
    setCountdown(minutes);
    setCustomMinutes('');
  };

  const switchMode = () => {
    setMode(mode === 'stopwatch' ? 'countdown' : 'stopwatch');
    resetTimer();
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-md mx-auto p-5 text-center rounded-lg shadow-lg my-8 border-2 border-cyan-100 bg-gradient-to-b from-cyan-50 to-white">
        <div className="mode-switch">
          <button 
            onClick={switchMode}
            className="text-cyan-600 underline text-sm cursor-pointer border-none bg-transparent"
          >
            {mode === 'stopwatch' ? '切换到倒计时' : '切换到正计时'}
          </button>
        </div>

        <div className={`text-6xl font-mono my-8 ${isRunning ? 'text-cyan-500' : 'text-cyan-700'}`}>
          {formattedTime}
        </div>

        <div className="flex gap-4 justify-center mb-8">
          <Button
            onClick={handleStart}
            variant={isRunning ? 'destructive' : 'default'}
            size="lg"
            className="bg-cyan-600 hover:bg-cyan-700 text-white"
          >
            {isRunning ? '暂停' : '开始'}
          </Button>
          <Button
            onClick={handleReset}
            variant="secondary"
            size="lg"
            className="bg-cyan-500 hover:bg-cyan-600 text-white"
          >
            重置
          </Button>
        </div>

        {mode === 'countdown' && (
          <div className="mt-5 space-y-4">
            <h3 className="text-lg font-medium mb-3 text-cyan-700">快速设置</h3>
            <div className="flex flex-wrap gap-2 justify-center">
              {presetTimes.map((minutes) => (
                <Button
                  key={minutes}
                  onClick={() => setCountdown(minutes)}
                  variant="outline"
                  className="border-cyan-500 text-cyan-600 hover:bg-cyan-50"
                >
                  {minutes}分钟
                </Button>
              ))}
            </div>

            <div className="custom-time mt-6">
              <h3 className="text-lg font-medium mb-3 text-cyan-700">自定义时间</h3>
              <div className="flex gap-2 justify-center items-center">
                <Input
                  type="number"
                  value={customMinutes}
                  onChange={(e) => setCustomMinutes(e.target.value)}
                  placeholder="输入分钟数"
                  className="w-32 border-cyan-300 focus:border-cyan-500"
                />
                <Button
                  onClick={handleCustomTime}
                  variant="default"
                  className="bg-cyan-600 hover:bg-cyan-700 text-white"
                >
                  设置
                </Button>
              </div>
            </div>
          </div>
        )}

        <TimerHistory history={history} />
      </div>
    </div>
  );
}
