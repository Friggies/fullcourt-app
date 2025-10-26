export type DrillsUIContextType = {
  searchVisible: boolean;
  setSearchVisible: (v: boolean) => void;
  searchText: string;
  setSearchText: (t: string) => void;
  filterCategories: string[];
  setFilterCategories: (cats: string[]) => void;
  filterPlayers: number | '';
  setFilterPlayers: (n: number | '') => void;
  filterType: string;
  setFilterType: (t: string) => void;
};
