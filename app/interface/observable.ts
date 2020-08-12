export interface Observable {
  value: string;
  viewValue: string;
}

export interface ObservableGroup {
  disabled?: boolean;
  name: string;
  observable: Observable[];
}