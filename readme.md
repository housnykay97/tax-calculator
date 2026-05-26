# SMARTPAY PAYE Calculator - Kenya

A lightweight web app that calculates Pay As You Earn (PAYE) tax, NSSF, SHIF, and Housing Levy based on Kenyan tax laws 2024/2025.

## Features
- **Instant PAYE Calculation**: Uses current KRA tax bands and personal relief.
- **Statutory Deductions**: Includes NSSF, SHIF, and optional Housing Levy.
- **Flexible Inputs**: Enter basic salary, benefits, choose NSSF rates, toggle deductions.
- **Round-Off Options**: Select 0.01, 0.10, 0.50, or 1 KES rounding.
- **Download Results**: Export breakdown to PDF with jsPDF.
- **Clean UI**: Dark-themed, responsive design built with Bootstrap 5.3.
- **Mobile Friendly**: Works on desktop, tablet, and mobile screens.

## Tech Stack
- HTML, CSS, Vanilla JavaScript
- Bootstrap 5.3.8 for layout and components
- jsPDF for PDF generation
- Font Awesome for icons

## How It Works
1. Enter monthly basic salary and benefits.
2. Select salary type, NSSF rate, and toggle SHIF/Housing Levy.
3. Choose round-off precision and click "Calculate Breakdown".
4. View detailed breakdown and download as PDF.

## Deductions Included
| Deduction | Rate | Notes |
| --- | --- | --- |
| **PAYE** | 10%, 25%, 30%, 32.5%, 35% | Progressive bands per Finance Act 2024/2025 |
| **Personal Relief** | KES 2,400/month | Fixed relief for all taxpayers |
| **NSSF** | 6% of gross | Min base KES 18,000, max per NSSF Act schedule |
| **SHA** | 2.75% of gross | Min KES 300. Replaces NHIF from Oct 2024 |
| **Housing Levy** | 1.5% of gross | Optional deduction |

## Setup
1. Clone or download the repo.
2. Open `index.html` in your browser. No build step required.
3. Can also be used offline.

## Disclaimer
SMARTPAY provides estimates for guidance only. Calculations follow Finance Act 2024/2025 but may not cover all edge cases. For official filing, use KRA iTax portal.

## License
MIT License - free to use, modify, and distribute this code for personal or commercial projects.




