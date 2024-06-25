//renderizar EditModal en caso de q se encuentre esa info
import { useQuery } from "@tanstack/react-query";
import { Navigate, useLocation, useParams } from "react-router-dom";
import { getExpenseById } from "../../api/ExpenseAPI";
import EditExpenseModal from "./EditExpenseModal";

export default function EditExpenseData() {
  const params = useParams();
  const budgetId = params.budgetId!;

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const editExpenseId = queryParams.get("editExpense")!;

  const { data, isError } = useQuery({
    queryKey: ["expense", editExpenseId],
    queryFn: () => getExpenseById({ budgetId, editExpenseId }),
    enabled: !!editExpenseId, //lo transforma a boolean, si no hay id enabled es false y la consulta no se hace, si hay algo en la url la consulta se hace
  });

  if(isError) return <Navigate to={"/404"} />
  
  if(data) return <EditExpenseModal data={data} editExpenseId={editExpenseId} />
}
