import { formatDuration } from 'date-fns';

const useCalculateScheduledTime = () => {
  const rtf = new Intl.RelativeTimeFormat(navigator.language, {
    localeMatcher: 'best fit',
    numeric: 'always',
    style: 'long',
  });

  const getScheduledTime = ({ scheduled, status }, now) => {
    if (status === 'FAILED' || status === 'SUCCESS' || status === 'DELETED')
      return null;
    const scheduledTime = new Date(scheduled).getTime();
    const diff = scheduledTime - now;
    const seconds = diff / 1000;
    const minutes = seconds / 60;
    const hours = minutes / 60;
    if (status === 'ALLOCATED') {
      if (diff <= -3000000) return null;
      if (diff <= -60000)
        return rtf.format(Math.round(minutes * -1), 'minutes');
      if (diff <= -1000) return rtf.format(Math.round(seconds * -1), 'seconds');
      return rtf.format(Math.ceil(hours * -1), 'hours');
    }
    if (scheduledTime <= now) return 'Ready';
    if (diff <= 60000) return rtf.format(Math.round(seconds), 'seconds');
    if (diff <= 3000000) return rtf.format(Math.round(minutes), 'minutes');
    return rtf.format(Math.ceil(hours), 'hours');
  };

  const getDuration = ({ started, finished }) => {
    if (!started) return null;
    if (started && !finished) {
      const durationInMS = new Date(started).getTime() - new Date().getTime();
      return formatDuration({
        minutes: Number(Math.floor(durationInMS / 1000 / 60) % 60),
      });
    }

    const durationInMS =
      (new Date(started).getTime() - new Date(finished).getTime()) * -1;
    return formatDuration(
      {
        minutes: Number(Math.floor(durationInMS / 1000 / 60) % 60),
      },
      { zero: true },
    );
  };

  return { getScheduledTime, getDuration };
};

export default useCalculateScheduledTime;
