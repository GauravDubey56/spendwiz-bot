exports.generateReportHtml = (expenses) => {
    const expenseTable = `
      ${expenses
        .map(
          (expense) => `
        <tr>
          <td>${expense.Amount}</td>
          <td>${expense.Time}</td>
          <td class="category">${expense.Category}</td>
          <td>${expense.Description}</td>
        </tr>
      `
        )
        .join("")}
    `;
    const baseTemplate = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Expense Report</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                margin: 0;
                padding: 0;
            }
    
            header {
                background-color: #007BFF;
                color: #fff;
                text-align: center;
                padding: 1rem;
            }
    
            .container {
                max-width: 800px;
                margin: 20px auto;
                background-color: #fff;
                padding: 20px;
                border-radius: 5px;
                box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
            }
    
            table {
                width: 100%;
                border-collapse: collapse;
                margin-top: 20px;
            }
    
            table, th, td {
                border: 1px solid #ddd;
            }
    
            th, td {
                padding: 10px;
                text-align: left;
            }
    
            th {
                background-color: #007BFF;
                color: #fff;
            }
    
            .category {
                font-weight: bold;
                color: #007BFF;
            }
        </style>
    </head>
    <body>
        <header>
            <h1>Expense Report</h1>
        </header>
        <div class="container">
            <h2>July 2023</h2>
            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Category</th>
                        <th>Expense Description</th>
                        <th>Amount</th>
                    </tr>
                </thead>
                <tbody>
                    ${expenseTable}
                </tbody>
            </table>
        </div>
    </body>
    </html>
    `
    return baseTemplate
}
