import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import AuthLayout from "./layouts/AuthLayout";
import DashboardView from "./views/DashboardView";
import ConfirmAccountView from "./views/auth/ConfirmAccountView";
import ForgotPasswordView from "./views/auth/ForgotPasswordView";
import LoginView from "./views/auth/LoginView";
import NewPasswordView from "./views/auth/NewPasswordView";
import RegisterView from "./views/auth/RegisterView";
import RequestTokenView from "./views/auth/RequestTokenView";
import CreateBudgetView from "./views/budgets/CreateBudgetView";
import EditBudgetView from "./views/budgets/EditBudgetView";
import BudgetDetails from "./views/budgets/BudgetDetails";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<DashboardView />} index />
          <Route path="/budgets/create" element={<CreateBudgetView />} />
          <Route
            path="/budgets/:budgetId"
            element={<BudgetDetails />}
          />
          <Route
            path="/budgets/:budgetId/edit"
            element={<EditBudgetView />}
          />
        </Route>

        <Route element={<AuthLayout />}>
          <Route path="/auth/login" element={<LoginView />} />
          <Route path="/auth/register" element={<RegisterView />} />
          <Route
            path="/auth/confirm-account"
            element={<ConfirmAccountView />}
          />
          <Route path="/auth/request-code" element={<RequestTokenView />} />
          <Route
            path="/auth/forgot-password"
            element={<ForgotPasswordView />}
          />
          <Route path="/auth/new-password" element={<NewPasswordView />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
