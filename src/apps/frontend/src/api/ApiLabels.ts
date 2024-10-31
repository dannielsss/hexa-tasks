import { API_URL } from '../constants';
import { Label } from '../types/Label';

export const getLabels = async (): Promise<Label[]> => {
  const request = await fetch(`${API_URL}/labels`);
  const response = await request.json();
  const labels = response.data;

  return labels;
};
