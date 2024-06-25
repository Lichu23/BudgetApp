import { useQuery } from "@tanstack/react-query";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { getBudgetById } from "../../api/BudgetApi";
import AddExpensesModal from "../../components/expense/AddExpensesModal";
import EditExpenseData from "../../components/expense/EditExpenseData";
import ExpenseList from "../../components/expense/ExpenseList";

export default function BudgetDetails() {
  const navigate = useNavigate();
  const params = useParams();
  const budgetId = params.budgetId!;
  const { data, isLoading, isError } = useQuery({
    queryKey: ["budgetDetails", budgetId],
    queryFn: () => getBudgetById(budgetId),
    retry: false,
  });
  if (isLoading) return "Cargando...";
  if (isError) return <Navigate to="/404" />;
  if (data)
    return (
      <>
        <h1 className="text-xl uppercase font-bold">{data.budgetName}</h1>

        <nav className="my-5 flex gap-3">
          <button
            className="bg-purple-600 text-white hover:bg-purple-400 p-2 rounded-md"
            onClick={() => navigate(location.pathname + "?newExpenses=true")} //agregar a la url
          >
            Add Expenses
          </button>
        </nav>

        <ExpenseList expenses={data.expenses} />
        <AddExpensesModal />
        <EditExpenseData />
      </>
    );
}
