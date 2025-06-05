import Mock from 'mockjs';

Mock.mock('/api/presets', 'get', {
  'presets|4': [
    {
      'minutes|+5': 5
    }
  ]
});
