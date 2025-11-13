import { Drill } from './Drill';

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
  filterBookmarked: boolean;
  setFilterBookmarked: (b: boolean) => void;
  drills: Drill[];
  setDrills: React.Dispatch<React.SetStateAction<Drill[]>>;
  toggleBookmark: (
    drill: Drill,
    localSetDrill?: React.Dispatch<React.SetStateAction<Drill | null>>
  ) => Promise<void>;
};
