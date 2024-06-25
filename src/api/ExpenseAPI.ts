import api from "../lib/axios";
import { isAxiosError } from "axios";
import { Budget, Expense, ExpenseFormData } from "../types";

type ExpenseAPI = {
  formData: ExpenseFormData;
  budgetId: Budget["_id"];
  editExpenseId: Expense["_id"]
};

export async function createExpense({
  formData,
  budgetId,
}: Pick<ExpenseAPI, "formData" | "budgetId">) {
  try {
    const url = `/budgets/${budgetId}/expense`;
    const { data } = await api.post<string>(url, formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

export async function getAllExpenses({
    budgetId,
  }: Pick<ExpenseAPI, "formData" | "budgetId">) {
    try {
      const url = `/budgets/${budgetId}/expense`;
      const { data } = await api<string>(url);
      return data;
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        throw new Error(error.response.data.error);
      }
    }
  }

  export async function getExpenseById({
    budgetId, editExpenseId
  }: Pick<ExpenseAPI,  "budgetId" | "editExpenseId">) {
    try {
      const url = `/budgets/${budgetId}/expense/${editExpenseId}`;
      const { data } = await api(url);
      return data;
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        throw new Error(error.response.data.error);
      }
    }
  }
  
  export async function updateExpense({
    budgetId, editExpenseId, formData
  }: Pick<ExpenseAPI,  "budgetId" | "editExpenseId" | "formData">) {
    try {
      const url = `/budgets/${budgetId}/expense/${editExpenseId}`;
      const { data } = await api.put<string>(url, formData);
      return data;
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        throw new Error(error.response.data.error);
      }
    }
  }
  
  export async function deleteExpense({
    budgetId, editExpenseId
  }: Pick<ExpenseAPI,  "budgetId" | "editExpenseId">) {
    try {
      const url = `/budgets/${budgetId}/expense/${editExpenseId}`;
      const { data } = await api.delete<string>(url);
      return data;
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        throw new Error(error.response.data.error);
      }
    }
  }