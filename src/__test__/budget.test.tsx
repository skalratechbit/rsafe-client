import React from 'react';
import Budgets from "../Pages/Finances/Budget/Budgets";
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

test('renders without crashing', () => {
    render(<Budgets />);
});

test('renders the Budgets page with a GridComponent', () => {
    render(<Budgets />);
    const gridComponent = screen.getByTestId('grid');
    expect(gridComponent).toBeInTheDocument();
});

test('renders the Budgets page with a Pie graph', () => {
    render(<Budgets />);
    const pieGraph = screen.getByTestId('pie-graph');
    expect(pieGraph).toBeInTheDocument();
});

test('renders the Budgets page with Total Difference', () => {
    render(<Budgets />);
    const totalDifferenceElement = screen.getByTestId('total-difference');
    expect(totalDifferenceElement).toBeInTheDocument();
});

test('renders the Budgets page with Total Actual Amount', () => {
    render(<Budgets />);
    const totalActualAmountElement = screen.getByTestId('total-actual-amount');
    expect(totalActualAmountElement).toBeInTheDocument();
});

test('renders the Budgets page with Total Allocated Amount', () => {
    render(<Budgets />);
    const totalAllocatedAmountElement = screen.getByTestId('total-allocated-amount');
    expect(totalAllocatedAmountElement).toBeInTheDocument();
});