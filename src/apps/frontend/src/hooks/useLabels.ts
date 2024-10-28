import { useState } from 'react';
import { Label } from '../types/Label';
import { getLabels } from '../api/ApiLabels';

export const useLabels = () => {
  const [labels, setLabels] = useState<Label[]>([]);

  const onGetLabels = async () => {
    try {
      const labelsData = await getLabels();
      setLabels(labelsData);
    } catch (error) {
      console.log(error);
    }
  };

  return { labels, onGetLabels };
};
