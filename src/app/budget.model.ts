/* eslint-disable @typescript-eslint/quotes */
import { IncomeExpense } from "./incomeExpense.model";

export interface Budget {
  id: string;
  title: string;
  money: number;
  incomeExpense?: IncomeExpense[];
  color: string;
}
