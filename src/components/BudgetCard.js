import { Card, ProgressBar, Stack, Button } from "react-bootstrap";
import { currencyFormatter } from "../utils";
import { useBudget } from "../contexts/BudgetContext";

const BudgetCard = ({
  id,
  name,
  max,
  gray,
  onAddExpenseClick,
  viewExpenses,
}) => {
  const { getExpenses } = useBudget();
  const expenses = getExpenses(id);

  const amount = expenses.reduce((sum, e) => sum + e.amount, 0);

  const cardClasses = () => {
    if (amount > max) return "bg-danger bg-opacity-10";
    if (gray) return "bg-light";
  };

  const getProgressBarVariant = ({ amount, max }) => {
    const ratio = amount / max;
    if (ratio < 0.5) return "primary";
    if (ratio < 0.75) return "warning";
    return "danger";
  };

  return (
    <Card className={cardClasses()}>
      <Card.Body>
        <Card.Title className="d-flex justify-content-between align-items-baseline fw-normal mb-3">
          <div className="me-2">{name}</div>
          <div className="d-flex align-items-baseline">
            {currencyFormatter.format(amount)}
            {max && (
              <span className="text-muted fs-6 ms-1">
                / {currencyFormatter.format(max)}
              </span>
            )}
          </div>
        </Card.Title>
        {max && (
          <ProgressBar
            className="rounded-pill"
            variant={getProgressBarVariant({ amount, max })}
            min={0}
            max={max}
            now={amount}
          />
        )}
        <Stack direction="horizontal" gap="2" className="mt-4">
          <Button
            variant="outline-primary"
            onClick={() => onAddExpenseClick(id)}
          >
            Add Expense
          </Button>
          <Button variant="outline-secondary" onClick={() => viewExpenses(id)}>
            View Expenses
          </Button>
        </Stack>
      </Card.Body>
    </Card>
  );
};

export default BudgetCard;
