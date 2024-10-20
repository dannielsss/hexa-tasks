import Label from '../types/Label';

export const formatLabel = (label?: string): Label | null => {
  if (!label) return null;
  const formattedLabel = label.split(',')[0].split('-');

  return {
    id: '',
    name: '#' + formattedLabel[0],
    color: formattedLabel[1],
  };
};
