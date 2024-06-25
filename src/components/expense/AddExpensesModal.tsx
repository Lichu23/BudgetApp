import { Dialog, Transition } from "@headlessui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Fragment } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { createExpense } from "../../api/ExpenseAPI";
import { ExpenseFormData } from "../../types";
import ExpenseForm from "./ExpenseForm";

export default function AddExpensesModal() {
  //usamos la url como state
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search); //en una cadena de texto va a  los parametros q tengan esta forma
  const modalAddExpenses = queryParams.get("newExpenses"); //para saber si existe en el codigo
  const show = modalAddExpenses ? true : false; //al eliminar el param de la url se cierra el modal

  //Obtener budgetId 

  const params = useParams()
  const budgetId = params.budgetId!
  
  const initialValues: ExpenseFormData = {
    expenseName: "",
    expenseValue: 0,
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: initialValues });

  const queryClient = useQueryClient()

  const { mutate } = useMutation({
    mutationFn: createExpense,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({queryKey: ["budgetDetails", budgetId]})
      toast.success(data)
      reset()
      navigate(location.pathname, { replace: true }) //ocultar modal
    },
  });

  const handleCreateExpense = (formData: ExpenseFormData) => {
    const data = {
      formData,
      budgetId
    }
    mutate(data)
  };

  return (
    <>
      <Transition appear show={show} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => navigate(location.pathname, { replace: true })}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/60" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all p-16">
                  <Dialog.Title as="h3" className="font-black text-4xl  my-5">
                    New Expense
                  </Dialog.Title>

                  <p className="text-xl font-bold">
                    Llena el formulario y crea {""}
                    <span className="text-fuchsia-600">un nuevo gasto</span>
                  </p>

                  <form
                    onSubmit={handleSubmit(handleCreateExpense)}
                    className="mt-10 space-y-3"
                    noValidate
                  >
                    <ExpenseForm register={register} errors={errors} />

                    <input
                      type="submit"
                      value="Save Expense"
                      className="bg-purple-400 w-full hover:bg-purple-200 p-4 rounded-md text-white cursor-pointer"
                    />
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
