import { Navigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getBudgetById } from "../../api/BudgetApi";
import EditBudgetForm from "../../components/budgets/EditBudgetForm";

export default function EditBudgetView() {
  const params = useParams();
  const budgetId = params.budgetId!;
  const { data, isLoading, isError } = useQuery({
    queryKey: ["editBudget", budgetId],
    queryFn: () => getBudgetById(budgetId),
    retry: false,
  });
  if (isLoading) return "Cargando...";
  if (isError) return <Navigate to="/404" />;
  if (data) return <EditBudgetForm data={data} budgetId={budgetId} />;
}
