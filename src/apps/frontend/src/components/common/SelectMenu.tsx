import { Dispatch, SetStateAction } from 'react';
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from '@headlessui/react';

import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/16/solid';
import { BsCircleFill } from 'react-icons/bs';

import { MenuElements } from '../../types/SelectMenu';
import Label from '../../types/Label';

interface Props {
  menuElements: MenuElements[] | Label[];
  selected: MenuElements;
  setSelected: Dispatch<SetStateAction<MenuElements | Label>>;
}

function SelectMenu({ menuElements, selected, setSelected }: Props) {
  return (
    <Listbox value={selected} onChange={setSelected}>
      <div className="relative w-36 h-full">
        <ListboxButton className="relative w-full h-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm sm:text-sm sm:leading-6">
          <span className="flex items-center">
            <BsCircleFill color={selected.color} />
            <span className="ml-3 block truncate">{selected.name}</span>
          </span>
          <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
            <ChevronUpDownIcon
              aria-hidden="true"
              className="h-5 w-5 text-gray-400"
            />
          </span>
        </ListboxButton>

        <ListboxOptions
          transition
          className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none data-[closed]:data-[leave]:opacity-0 data-[leave]:transition data-[leave]:duration-100 data-[leave]:ease-in sm:text-sm"
        >
          {menuElements.map((element) => (
            <ListboxOption
              value={element}
              className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 data-[focus]:bg-indigo-600 data-[focus]:text-white"
            >
              <div className="flex items-center">
                <BsCircleFill color={element.color} />
                <span className="ml-3 block truncate font-normal group-data-[selected]:font-semibold">
                  {element.name}
                </span>
              </div>

              <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600 group-data-[focus]:text-white [.group:not([data-selected])_&]:hidden">
                <CheckIcon aria-hidden="true" className="h-5 w-5" />
              </span>
            </ListboxOption>
          ))}
        </ListboxOptions>
      </div>
    </Listbox>
  );
}

export default SelectMenu;
