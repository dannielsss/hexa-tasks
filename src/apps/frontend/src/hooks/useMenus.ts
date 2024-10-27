import { useContext, useState } from 'react';
import { MenuElements } from '../types/SelectMenu';
import { Label } from '../types/Label';

import { PRIORITIES } from '../constants';
import AppContext from '../contexts/AppProvider/AppContext';

export const useMenus = () => {
  const { labels } = useContext(AppContext);

  const [selectedDay, setSelectedDay] = useState<Date>();
  const [prioritySelected, setPrioritySelected] = useState<MenuElements>(
    PRIORITIES[0]
  );
  const [labelSelected, setLabelSelected] = useState<Label>(
    labels[0] ? labels[0] : { id: '0', color: 'gray', name: 'No label' }
  );

  return {
    state: {
      selectedDay,
      prioritySelected,
      labelSelected,
    },
    setters: {
      setSelectedDay,
      setPrioritySelected,
      setLabelSelected,
    },
  };
};
