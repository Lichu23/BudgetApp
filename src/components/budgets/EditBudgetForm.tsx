
import { updateBudget } from "../../api/BudgetApi";
import { Budget, BudgetFormData} from "../../types"; 
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import BudgetForm from "./BudgetForm";

type EditBudgetViewProps = {
  data: BudgetFormData;
  budgetId: Budget["_id"];
};

export default function EditBudgetForm({
  data,
  budgetId,
}: EditBudgetViewProps) {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      budgetName: data.budgetName,
      budget: data.budget,
    },
  });

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: updateBudget,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["budgets"] });
      queryClient.invalidateQueries({ queryKey: ["editBudget", budgetId] });

      toast.success(data);
      navigate("/");
    },
  });

  const handleForm = (formData: BudgetFormData) => {
    const data = {
      formData,
      budgetId,
    };
    mutate(data);
  };

  return (
    <div>
      <h1 className="text-center font-bold uppercase">Editar Budget</h1>

      <nav className="flex justify-center items-center mt-5">
        <Link
          className="bg-purple-400 hover:bg-purple-200 p-4 rounded-md text-white cursor-pointer"
          to="/"
        >
          Volver a mis Budgets
        </Link>
      </nav>
      <div className="flex justify-center items-center p-3 gap-5">
        <form
          noValidate
          className="flex flex-col mt-10"
          onSubmit={handleSubmit(handleForm)}
        >
          <BudgetForm register={register} errors={errors} />

          <input
            type="submit"
            value="Guardar Cambios"
            className="bg-purple-400 hover:bg-purple-200 p-4 rounded-md text-white cursor-pointer"
          />
        </form>
      </div>
    </div>
  );
}
