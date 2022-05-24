import { useRef } from "react";
import { Button, Modal, Stack } from "react-bootstrap";
import { useBudget, UNCATEGORIXED_BUDGET_ID } from "../contexts/BudgetContext";

const ViewExpenseModal = ({ budgetId, handleClose }) => {
  const { getExpenses, budgets, deleteBudget, deleteExpenses } = useBudget();

  const renderExpenses = getExpenses(budgetId).map((b, i) => (
    <option key={i} value={b.id}>
      {b.name}
    </option>
  ));

  const budget =
    budgetId === UNCATEGORIXED_BUDGET_ID
      ? { name: "Uncategorized", id: UNCATEGORIXED_BUDGET_ID }
      : budgets.find((b) => b.id === budgetId);

  const onDeleteBudget = () => {
    deleteBudget(budget);
    handleClose();
  };

  return (
    <Modal show={budgetId} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          <Stack direction="horizontal" gap="2" className="mt-4">
            <div>Expenses - {budget?.name}</div>
            {budgetId !== UNCATEGORIXED_BUDGET_ID && (
              <Button onClick={onDeleteBudget} variant="outline-danger">
                Delete
              </Button>
            )}
          </Stack>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {renderExpenses()}
        <div className="d-flex justify-content-end">
          <Button variant="primary" type="submit">
            Add
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ViewExpenseModal;
