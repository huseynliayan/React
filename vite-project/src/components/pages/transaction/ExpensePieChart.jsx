import React, { useMemo } from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import styled from "styled-components";

ChartJS.register(ArcElement, Tooltip, Legend);

const generateColors = (count) => {
  const colors = [];
  for (let i = 0; i < count; i++) {
    const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    colors.push(randomColor);
  }
  return colors;
};

const ExpensePieChart = ({ expenses, title }) => {
  if (!Array.isArray(expenses) || expenses.length === 0) {
    return (
      <PieChartContainer>
        <h3>{title}</h3>
        <TransparentPie>
          <p>No data available</p>
        </TransparentPie>
      </PieChartContainer>
    );
  }

  const expenseCategories = expenses.reduce((categories, expense) => {
    if (!categories[expense.category]) {
      categories[expense.category] = 0;
    }
    categories[expense.category] += Math.abs(expense.amount);
    return categories;
  }, {});

  const categoryLabels = Object.keys(expenseCategories);

  const categoryColors = useMemo(() => generateColors(categoryLabels.length), [categoryLabels.length]);

  const pieData = {
    labels: categoryLabels,
    datasets: [
      {
        label: title,
        data: Object.values(expenseCategories),
        backgroundColor: categoryColors, 
        borderWidth: 1,
      },
    ],
  };

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "right",
        labels: {
          boxWidth: 20,
          font: {
            size: 14,
          },
        },
      },
      tooltip: {
        enabled: true,
      },
    },
    layout: {
      padding: {
        left: 10,
        right: 10,
        top: 10,
        bottom: 10,
      },
    },
    radius: "90%", 
  };

  return (
    <PieChartContainer>
      <h2>{title}</h2>
      <ChartWrapper>
        <Pie data={pieData} options={pieOptions} />
      </ChartWrapper>
    </PieChartContainer>
  );
};

export default ExpensePieChart;

const PieChartContainer = styled.div`
  flex: 1;
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ChartWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const TransparentPie = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.5);
  border: 1px dashed #ddd;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  font-size: 14px;
  color: #999;
`;
