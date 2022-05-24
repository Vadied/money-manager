import { Stack, Button } from "react-bootstrap";
import { currencyFormatter } from "../utils";
import { useBudget } from "../contexts/BudgetContext";

const ExpenseCard = ({ id, description, amount }) => {
  const { deleteExpenses } = useBudget();

  return (
    <Stack direction="horizontal" gap="2">
      <div className="me-auto fs-4">{description}</div>
      <div className="fs-5">{currencyFormatter.format(amount)}</div>
      <Button
        onClick={() => deleteExpenses(id)}
        size="sm"
        variant="outline-danger"
      >
        &times;
      </Button>
    </Stack>
  );
};

export default ExpenseCard;
