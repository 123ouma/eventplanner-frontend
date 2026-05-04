export interface Event {
    
  id: number;
  title: string;
  description: string;
  start_date: string;
  end_date: string;
  place: string;
  price: number;
  category_id: number;
  capacity: number;
  image: string;
  created_by: number;
  is_free: boolean;
}

