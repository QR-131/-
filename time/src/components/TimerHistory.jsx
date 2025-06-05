import { Clock } from 'lucide-react';

export function TimerHistory({ history }) {
  if (!history || history.length === 0) {
    return (
      <div className="text-center text-gray-500 py-4">
        暂无计时记录
      </div>
    );
  }

  return (
    <div className="mt-6">
      <h3 className="text-lg font-medium mb-3 text-cyan-700 flex items-center gap-2">
        <Clock className="w-5 h-5" />
        计时历史
      </h3>
      <div className="bg-gray-50 rounded-lg p-4 max-h-64 overflow-y-auto">
        <ul className="divide-y divide-gray-200">
          {history.map((record, index) => (
            <li key={index} className="py-3">
              <div className="flex justify-between items-center">
                <div>
                  <span className="text-sm font-medium text-gray-900">
                    {record.mode === 'stopwatch' ? '正计时' : '倒计时'}
                  </span>
                  <p className="text-xs text-gray-500">{record.date}</p>
                </div>
                <div className="text-cyan-600 font-mono">
                  {formatTime(record.duration)}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function formatTime(seconds) {
  const pad = (num) => num.toString().padStart(2, '0');
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  return `${pad(hours)}:${pad(minutes)}:${pad(secs)}`;
}
