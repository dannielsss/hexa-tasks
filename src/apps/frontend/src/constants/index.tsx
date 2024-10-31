import { MenuElements } from '../types/SelectMenu';

export const API_URL =
  import.meta.env.MODE === 'development' ? 'http://localhost:5000/api' : '/api';

export const PRIORITIES: MenuElements[] = [
  {
    name: 'Low',
    color: 'green',
  },
  {
    name: 'Medium',
    color: 'orange',
  },
  {
    name: 'High',
    color: 'red',
  },
];
