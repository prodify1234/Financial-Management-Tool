interface Category { 
  id?: string;
  head: string;
  main_classification: string;
  sub_classification: string;
  display_name: string;
  type: string;
  frequency: string;
  budget_allocation_percentage: number;
  source: string;
}

export default Category