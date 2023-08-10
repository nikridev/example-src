import { ReactNode } from 'react';

import { DictionaryElement } from '@ppm/shared/api';

interface RowItem {
  id?: number;
  label: ReactNode | string;
  action: string;
}

export interface RowOption {
  rowId: string;
  action: string;
  data: any;
}

export interface RowActionsList {
  items: RowItem[];
  onClick: (rowOption: RowOption) => void;
}

type Dictionary = Pick<
  DictionaryElement,
  | 'id'
  | 'shortName'
  | 'code'
  | 'parentCode'
  | 'orderNumber'
  | 'dictionaryCode'
  | 'inclusionDate'
  | 'exclusionDate'
  | 'hierarchyGroup'
>;

export type DictionarySupplemented = Partial<Dictionary> & {
  isOpen?: boolean;
  level?: number;
  groupId?: number;
};

export interface TableHierarchyProps {
  data: DictionarySupplemented[];
  loading: boolean;
  rowAction: (dataRow: DictionarySupplemented) => RowActionsList;
  rowClick: (dataRow: DictionarySupplemented) => void;
}

export interface TableLinearProps {
  data: DictionarySupplemented[];
  loading: boolean;
  rowAction: (dataRow: DictionarySupplemented) => RowActionsList;
}
