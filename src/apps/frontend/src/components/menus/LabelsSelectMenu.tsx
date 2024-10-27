import { Dispatch, SetStateAction, useContext } from 'react';
import { Label } from '../../types/Label';
import SelectMenu from '../common/SelectMenu';
import { MenuElements } from '../../types/SelectMenu';
import AppContext from '../../contexts/AppProvider/AppContext';

interface Props {
  selected: Label;
  setSelected: Dispatch<SetStateAction<Label>>;
}

function LabelsSelectMenu({ selected, setSelected }: Props) {
  const { labels } = useContext(AppContext);

  return labels.length > 0 ? (
    <SelectMenu
      menuElements={labels}
      selected={selected}
      setSelected={setSelected as Dispatch<SetStateAction<MenuElements>>}
    />
  ) : null;
}

export default LabelsSelectMenu;
