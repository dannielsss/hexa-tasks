import Label from '../types/Label';

export const getLabels = async (): Promise<Label[]> => {
  const request = await fetch('http://localhost:5000/api/labels');
  const response = await request.json();
  const labels = response.data;

  return labels;
};
