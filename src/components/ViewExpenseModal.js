import { Button, Modal, Stack } from "react-bootstrap";
import { useBudget, UNCATEGORIZED_BUDGET_ID } from "../contexts/BudgetContext";
import ExpenseCard from "./ExpenseCard";

const ViewExpenseModal = ({ show, budgetId, handleClose }) => {
  const { getExpenses, budgets, deleteBudget } = useBudget();

  const renderExpenses = getExpenses(budgetId).map((e, i) => (
    <ExpenseCard key={i} {...e} />
  ));

  const budget =
    budgetId === UNCATEGORIZED_BUDGET_ID
      ? { name: "Uncategorized", id: UNCATEGORIZED_BUDGET_ID }
      : budgets.find((b) => b.id === budgetId);

  const onDeleteBudget = () => {
    deleteBudget(budgetId);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          <Stack direction="horizontal" gap="2" className="mt-4">
            <div>Expenses - {budget?.name}</div>
            {budgetId !== UNCATEGORIZED_BUDGET_ID && (
              <Button onClick={onDeleteBudget} variant="outline-danger">
                Delete
              </Button>
            )}
          </Stack>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Stack direction="vertical" gap="3">
          {renderExpenses}
        </Stack>
      </Modal.Body>
    </Modal>
  );
};

export default ViewExpenseModal;
