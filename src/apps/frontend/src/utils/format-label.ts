import { Label } from '../types/Label';

/**
 * Parses a string containing labels in the format "label-color,label-color,label-color".
 *
 * @param label The label to format
 * @returns An object representing the parsed labels and their corresponding colors.
 */
export const formatLabel = (label?: string): Label | null => {
  if (!label) return null;
  const formattedLabel = label.split(',')[0].split('-');

  return {
    id: '',
    name: formattedLabel[0],
    color: formattedLabel[1],
  };
};
