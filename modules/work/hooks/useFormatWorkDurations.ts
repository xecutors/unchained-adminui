import { formatDuration } from 'date-fns';
import { useIntl } from 'react-intl';

const useFormatWorkDurations = () => {
  const { formatMessage } = useIntl();
  const rtf = new Intl.RelativeTimeFormat(navigator.language || 'de-ch', {
    localeMatcher: 'best fit',
    numeric: 'always',
    style: 'long',
  });

  const getScheduledTime = ({ scheduled, status, started }) => {
    const now = new Date().getTime();
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
    if (scheduledTime <= now && started)
      return formatMessage({ id: 'work_running', defaultMessage: 'Running' });
    if (scheduledTime <= now)
      return formatMessage({ id: 'work_ready', defaultMessage: 'Ready' });
    if (diff <= 60000) return rtf.format(Math.round(seconds), 'seconds');
    if (diff <= 3000000) return rtf.format(Math.round(minutes), 'minutes');
    return rtf.format(Math.ceil(hours), 'hours');
  };

  const getDuration = ({ started, finished }) => {
    const now = new Date().getTime();
    if (!started) return null;
    let durationInMS = null;
    if (started && !finished) {
      durationInMS = now - new Date(started).getTime();
    } else {
      durationInMS = new Date(finished).getTime() - new Date(started).getTime();
    }
    return formatDuration(
      {
        hours: Number(Math.floor(durationInMS / 1000 / 60 / 60) % 24),
        minutes: Number(Math.floor(durationInMS / 1000 / 60) % 60),
        seconds: Number(Math.ceil(durationInMS / 1000) % 60),
      },
      { zero: false },
    );
  };

  return { getScheduledTime, getDuration };
};

export default useFormatWorkDurations;
