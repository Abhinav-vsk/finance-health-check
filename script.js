document.getElementById("finance-form").addEventListener("submit", function(e) {
  e.preventDefault();

  const income = parseFloat(document.getElementById("income").value);
  const expenses = parseFloat(document.getElementById("expenses").value);
  const debt = parseFloat(document.getElementById("debt").value);
  const savings = parseFloat(document.getElementById("savings").value);
  const investments = parseFloat(document.getElementById("investments").value);
  const goal = parseFloat(document.getElementById("goal").value);

  const savingsRate = Math.round((savings / income) * 100);
  const debtRatio = Math.round((debt / income) * 100);

  // Toggle screens
  document.getElementById("form-container").classList.add("hidden");
  document.getElementById("dashboard").classList.remove("hidden");

  // Savings Rate Chart
  new Chart(document.getElementById("savingsChart"), {
    type: "doughnut",
    data: {
      labels: ["Savings", "Rest"],
      datasets: [{
        data: [savingsRate, 100 - savingsRate],
        backgroundColor: ["#4CAF50", "#e0e0e0"]
      }]
    },
    options: {
      responsive: true,
      plugins: { legend: { position: "bottom" } }
    }
  });

  // Income vs Expenses Chart
  new Chart(document.getElementById("incomeExpenseChart"), {
    type: "bar",
    data: {
      labels: ["Income", "Expenses", "Debt", "Investments"],
      datasets: [{
        label: "Amount in ₹",
        data: [income, expenses, debt, investments],
        backgroundColor: ["#2196F3", "#FF9800", "#F44336", "#9C27B0"]
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: { beginAtZero: true }
      }
    }
  });

  // Recommendations
  let tips = "";
  if (savingsRate < 20) {
    tips += "<p>Try to increase your savings. Aim for at least 20% of your income 💡</p>";
  } else {
    tips += "<p>Great savings rate! 🎉</p>";
  }

  if (debtRatio > 40) {
    tips += "<p>Your debt is high. Try reducing liabilities to improve financial health ⚠️</p>";
  }

  document.getElementById("recommendations").innerHTML = tips;
});

function goBack() {
  document.getElementById("dashboard").classList.add("hidden");
  document.getElementById("form-container").classList.remove("hidden");
}
