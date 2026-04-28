export interface Food {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  area: string;
  instructions: string;
  tags: string;
  quantity?: number;
  category: string;
}
