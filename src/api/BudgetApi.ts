import api from "../lib/axios";
import { Budget, BudgetFormData, dashboardBudgetSchema } from "../types";
import { isAxiosError } from "axios";

export async function createBudget(formData: BudgetFormData) {
  try {
    const { data } = await api.post("/budgets", formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response)
      throw new Error(error.response.data.error);
  }
}

export async function getAllBudgets() {
  try { 
    const { data } = await api("/budgets");
    const response = dashboardBudgetSchema.safeParse(data);
    if (response.success) {
      return response.data;
    }
  } catch (error) {
    if (isAxiosError(error) && error.response)
      throw new Error(error.response.data.error);
  }
}


export async function getBudgetById(id: Budget["_id"]) {
  try {
    const { data } = await api(`/budgets/${id}`);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response)
      throw new Error(error.response.data.error);
  }
}

type BudgetAPIType = {
  formData: BudgetFormData;
  budgetId: Budget["_id"];
};
export async function updateBudget({ formData, budgetId }: BudgetAPIType) {
  try {
    const { data } = await api.put(`/budgets/${budgetId}`, formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response)
      throw new Error(error.response.data.error);
  }
}

export async function deleteBudget(id: Budget["_id"]) {
  try {
    const { data } = await api.delete(`/budgets/${id}`);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response)
      throw new Error(error.response.data.error);
  }
}
