import { Dispatch, SetStateAction } from 'react';

import SelectMenu from '../common/SelectMenu';

import { MenuElements } from '../../types/SelectMenu';
import { PRIORITIES } from '../../constants';

interface Props {
  selected: MenuElements;
  setSelected: Dispatch<SetStateAction<MenuElements>>;
}

function PrioritiesMenu({ selected, setSelected }: Props) {
  return (
    <SelectMenu
      menuElements={PRIORITIES}
      selected={selected}
      setSelected={setSelected}
    />
  );
}

export default PrioritiesMenu;
