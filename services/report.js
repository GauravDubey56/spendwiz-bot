const puppeteer = require("puppeteer");
const htmlPDF = require("html-pdf");
const fs = require('fs')
const getBase64PdfFromHtml = async (htmlData) => {
  var htmlElement = htmlData;
  const fileName = `SPENDWIZ_REPORT_${Date.now().toString()}`
  var writeStream = fs.createWriteStream(`./${fileName}.html`);
  fs.writeFileSync(`./${fileName}.html`, htmlElement, (error) => {
    console.log(error);
  });
  writeStream.end();
  var readHtml = fs.readFileSync(`./${fileName}.html`, "utf8");
  var options = {
    format: "Letter",
    header: {
      height: "20mm",
    },
    footer: {
      height: "20mm",
    },
  };
  await savePdfFromHtml(readHtml, options, `./${fileName}.pdf`);
  const contents = fs.readFileSync(`./${fileName}.pdf`, {
    encoding: "base64",
  });
  fs.unlinkSync(`./${fileName}.pdf`);
  fs.unlinkSync(`./${fileName}.html`);
  return contents;
};
const savePdfFromHtml = (readHtml, options, filePath) => {
  return new Promise(async (resolve, reject) => {
    try {
      htmlPDF.create(readHtml, options).toFile(filePath, function (err, res) {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    } catch (error) {
      reject(error);
    }
  });
};
// Sample expenses data
const expenses = [
  {
    Amount: 100.5,
    Time: "2023-09-01T12:00:00",
    Category: "Food",
    Description: "Lunch with colleagues",
  },
  {
    Amount: 50.75,
    Time: "2023-09-02T15:30:00",
    Category: "Transportation",
    Description: "Taxi ride to the airport",
  }
];

// Function to generate a PDF from expenses data
async function generateExpensePDF(expenses) {
  // Create an HTML table from expenses data
  const expenseTable = `
    <table border="1">
      <tr>
        <th>Amount</th>
        <th>Date & Time</th>
        <th>Category</th>
        <th>Description</th>
      </tr>
      ${expenses
        .map(
          (expense) => `
        <tr>
          <td>${expense.Amount}</td>
          <td>${expense.Time}</td>
          <td>${expense.Category}</td>
          <td>${expense.Description}</td>
        </tr>
      `
        )
        .join("")}
    </table>
  `;

  const content = `
    <html>
      <head>
        <style>
          table {
            width: 100%;
            border-collapse: collapse;
          }
          th, td {
            border: 1px solid #ccc;
            padding: 8px;
          }
          th {
            background-color: #f2f2f2;
          }
        </style>
      </head>
      <body>
        <h1>Expense Report</h1>
        ${expenseTable}
      </body>
    </html>
  `;
  getBase64PdfFromHtml(content)
  console.log("PDF created successfully");
}

generateExpensePDF(expenses);
