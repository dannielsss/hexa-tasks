import { useEffect, useState } from 'react';
import { Label } from '../types/Label';
import { getLabels } from '../api/ApiLabels';

export const useLabels = (isWhenOpenApp?: boolean) => {
  const [labels, setLabels] = useState<Label[]>([]);

  const onGetLabels = async () => {
    const labelsData = await getLabels();
    setLabels(labelsData);
  };

  useEffect(() => {
    if (isWhenOpenApp) onGetLabels();
  }, []);

  return { labels, onGetLabels };
};
