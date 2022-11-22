import { formatDuration } from 'date-fns';

const useCalculateScheduledTime = () => {
  const rtf = new Intl.RelativeTimeFormat('en', {
    localeMatcher: 'best fit',
    numeric: 'always',
    style: 'long',
  });

  const getScheduledTime = ({ scheduled, status, started }, now) => {
    if (status === 'FAILED' || status === 'SUCCESS' || status === 'DELETED')
      return null;
    const scheduledTime = new Date(scheduled).getTime();
    const diff = scheduledTime - now;
    const seconds = diff / 1000;
    const minutes = seconds / 60;
    const hours = minutes / 60;
    if (status === 'ALLOCATED' && !started) {
      if (diff <= -3000000) return null;
      if (diff <= -60000) return rtf.format(Math.round(minutes), 'minutes');
      if (diff <= -1000) return rtf.format(Math.round(seconds), 'seconds');
      return rtf.format(Math.ceil(hours), 'hours');
    }
    if (scheduledTime <= now && started) return 'Running';
    if (scheduledTime <= now) return 'Ready';
    if (diff <= 60000) return rtf.format(Math.round(seconds), 'seconds');
    if (diff <= 3000000) return rtf.format(Math.round(minutes), 'minutes');
    return rtf.format(Math.ceil(hours), 'hours');
  };

  const getDuration = ({ started, finished }) => {
    if (!started) return null;
    if (started && !finished) {
      const durationInMS = new Date().getTime() - new Date(started).getTime();
      return formatDuration(
        {
          minutes: Number(Math.floor(durationInMS / 1000 / 60) % 60),
          seconds: Number(Math.ceil(durationInMS / 1000 / 60)),
        },
        { zero: false },
      );
    }

    const durationInMS =
      new Date(finished).getTime() - new Date(started).getTime();
    return formatDuration(
      {
        minutes: Number(Math.floor(durationInMS / 1000 / 60) % 60),
        seconds: Number(Math.ceil(durationInMS / 1000 / 60)),
      },
      { zero: false },
    );
  };

  return { getScheduledTime, getDuration };
};

export default useCalculateScheduledTime;
