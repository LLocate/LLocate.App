
export enum MediaType {
    All = 'All',
    Mobile = 'Mobile',
    Web = 'Web'
  }
  export interface Menu {
    id: number;
    name: string;
    description: string;
    role: string[];
    child: Menu[];
    icon: string;
    path: string;
    isSelected: boolean;
    displayOn: MediaType;
  }