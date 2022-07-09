export type PurchaseQuantityItemProps = {
  beforeCount: string;
  afterCount: string;
  beforeDays: number;
  afterDays: number;
  name?: string;

  futureDaySale?: string;
};

export interface PurchaseQuantityFromProps {
  beforeCountDefault?: string;
  afterCountDefault?: string;
  beforeDaysDefault?: number;
  afterDaysDefault?: number;
  futureDays?: number;
  futureLimit?: number;

  items: PurchaseQuantityItemProps[];
}

export interface PurchaseQuantityTableProps {
  name: string;
  futureDaySale: string;
  futureTotal: number;
}
