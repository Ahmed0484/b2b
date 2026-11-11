import { useState } from "react";
import { useFetchBasketQuery } from "../basket/basketApi";
import type { Item } from "../../app/models/basket";
import { Box, Button, Divider, Grid, Typography } from "@mui/material";
import { currencyFormat } from "../../lib/util";
import SummaryItem from "./SummaryItem";


export default function SummaryPage() {
  const [copied, setCopied] = useState(false);
  const { data } = useFetchBasketQuery();
  const total =
    data?.items.reduce((sum: number, item: Item) => sum + item.quantity * item.price, 0) ?? 0;

  const handleCopyList = async () => {
    if (!data?.items?.length) return;

    // Match the exact date format from your print function
    const currentDate = new Date().toLocaleString([], {
      dateStyle: 'medium',
      timeStyle: 'short',
    });

    // Format each item cleanly
    const itemsText = data.items
      .map(
        (item: Item) =>
          `${item.name}\n ${item.quantity} X ${currencyFormat(item.price)} = ${currencyFormat(
            item.price * item.quantity
          )}`
      )
      .join('\n\n');

    // Combine header, items, and total with clean dividers
    const divider = '------------------------';
    const formattedText = ['B2B',
      currentDate,
      divider,
      itemsText,
      divider,
      `Total: ${currencyFormat(total)}`,
    ].join('\n');

    try {
      await navigator.clipboard.writeText(formattedText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy list:', err);
    }
  };

  const handlePrintList = () => {
    if (!data?.items?.length) return;

    const currentDate = new Date().toLocaleString([], {
      dateStyle: 'medium',
      timeStyle: 'short',
    });

    const itemsHtml = data.items
      .map(
        (item: Item) => `
      <div class="item">
        <div class="item-name">${item.name}</div>
        <div class="item-details">
          <span>${item.quantity} X ${currencyFormat(item.price)} =</span>
          <span>${currencyFormat(item.price * item.quantity)}</span>
        </div>
      </div>
    `
      )
      .join('');

    // Store the HTML as a string
    const htmlContent = `
    <html>
      <head>
        <title>printed list</title>
        <style>
          @page {
  size: A4;
  margin: 20mm;
}
body {
  font-family: Arial, sans-serif;
  width: 100%;
  max-width: 700px;
  margin: 0 auto;
  color: #000;
}
  .title {
  text-align: center;
  font-size: 20px; /* Change this to any size you want */
  font-weight: bold;
  margin-bottom: 4px;
}
.header {
  text-align: right;
  margin-bottom: 20px;
  font-size: 14px;
}
.item {
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  border-bottom: 1px solid #eee;
}
.item-name {
  font-weight: bold;
}
.item-details {
  display: flex;
  gap: 24px;
}
.divider {
  border-top: 2px solid #000;
  margin: 16px 0;
}
.total {
  font-weight: bold;
  display: flex;
  justify-content: space-between;
  font-size: 18px;
}

        </style>
      </head>
      <body>
        <div class="title">B2B</div>
        <div class="header">${currentDate}</div>
        <div class="divider"></div>
        ${itemsHtml}
        <div class="divider"></div>
        <div class="total">
          <span>Total:</span>
          <span>${currencyFormat(total)}</span>
        </div>
      </body>
    </html>
  `;

    // Create a hidden iframe and assign srcdoc
    const iframe = document.createElement('iframe');
    iframe.style.position = 'fixed';
    iframe.style.right = '0';
    iframe.style.bottom = '0';
    iframe.style.width = '0';
    iframe.style.height = '0';
    iframe.style.border = '0';
    iframe.srcdoc = htmlContent;

    // Wait for the iframe to load before printing
    iframe.onload = () => {
      iframe.contentWindow?.focus();
      iframe.contentWindow?.print();

      setTimeout(() => {
        document.body.removeChild(iframe);
      }, 1000);
    };

    document.body.appendChild(iframe);
  };

  const handleExportExcel = () => {
  if (!data?.items?.length) return;

  const currentDate = new Date().toLocaleDateString();

  // 1. Define spreadsheet column headers
  const headers = ['Name', 'Quantity', 'Unit Price', 'Total'];

  // 2. Map each item into a safe CSV row
  const rows = data.items.map((item: Item) => {
    const safeName = `"${item.name.replace(/"/g, '""')}"`; // Protects commas or quotes in item names
    const lineTotal = currencyFormat(item.price * item.quantity);
    return [safeName, item.quantity, currencyFormat(item.price), lineTotal].join(',');
  });

  // 3. Combine date, headers, rows, and grand total
  const csvContent = [
    `"B2B - ${currentDate}"`,
    '',
    headers.join(','),
    ...rows,
    '',
    `"","","Total",${currencyFormat(total)}`,
  ].join('\n');

  // 4. Add UTF-8 BOM (\uFEFF) so Excel displays Arabic/special characters and currency properly
  const blob = new Blob(['\uFEFF' + csvContent], {
    type: 'text/csv;charset=utf-8;',
  });

  // 5. Trigger file download
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `B2B-${new Date().toISOString().slice(0, 10)}.csv`;
  document.body.appendChild(link);
  link.click();

  // Cleanup
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};


return (

    <Box>
      <Typography variant="h3" component="p" sx={{ fontWeight: "bold" }}>
        Summary
      </Typography>
      <Divider />

      <Grid sx={{ mt: 1 }} container spacing={2}>
        <Grid size={9}>
          <Typography sx={{ mt: 1 }} variant="h5">Total : {currencyFormat(total)}</Typography>
        </Grid>
        <Grid size={3}>
          <Button sx={{ mb: 1, mr: 1 }} variant="contained" onClick={handleCopyList} disabled={data?.items.length === 0}>
            {copied ? 'Copied!' : 'Copy List'}
          </Button>
          <Button sx={{ mb: 1, mr: 1 }} variant="contained" onClick={handlePrintList} disabled={data?.items.length === 0}>
            Print
          </Button>
          <Button sx={{ mb: 1, mr: 1 }} variant="contained" onClick={handleExportExcel} disabled={data?.items.length === 0}>
            Ecxcel
          </Button>
        </Grid>
      </Grid>
      {data?.items.map(item => (
        <SummaryItem item={item} key={item.productId} />
      ))}


    </Box>
  );
}

