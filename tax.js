document.getElementById("tax_form").addEventListener('submit', function (event) {
    event.preventDefault();

    let basic_salary = Number(document.getElementById("basic_salary").value) || 0;
    let benefits = Number(document.getElementById("benefits").value) || 0;

    let config_rate = Number(document.getElementById("tax_config_rate")?.value || 0.01);


    // calculations
    function calculate_gross(basic, ben) {
        return basic + ben
    }

    let gross = calculate_gross(basic_salary, benefits)


    // SHIF function 2.75% of the gross, min 300 KES
    function shif_value(gross_salary) {
        let shif = gross_salary * 0.0275;
        return shif < 300 ? 300 : shif;
    }

    let shif1 = shif_value(gross)


    // NSSF function 6% of gross salary, minimum base is 18000
    function nssf_value(gross_salary) {
        let nssf = 0;
        let nssf_base = Math.max(gross_salary, 18000)
        nssf = 0.06 * nssf_base
        return nssf
    }

    let nssf1 = nssf_value(gross)


    //NHDF function (housing levy) 1.5%
    function nhdf_value(gross_salary) {
        return gross_salary * 0.015
    }

    let nhdf1 = nhdf_value(gross)


    // taxable income function
    function taxable_income(gross_salary, nssf, nhdf, shif) {
        let tax_income = gross_salary - (nssf + nhdf + shif);
        return tax_income < 0 ? 0 : tax_income
    }

    let tax_inc = taxable_income(gross, nssf1, nhdf1, shif1)


    //PAYE function / Income tax calculation
    function person_paye(taxable_income) {
        let i_tax = 0;

        if (taxable_income <= 24000) {
            i_tax = taxable_income * 0.10;
        }
        else if (taxable_income <= 32333) {
            i_tax = (24000 * 0.10) + ((taxable_income - 24000) * 0.25);
        }
        else if (taxable_income <= 500000) {
            i_tax = (24000 * 0.10) + (8333 * 0.25) + ((taxable_income - 32333) * 0.30);
        }
        else if (taxable_income <= 800000) {
            i_tax = (24000 * 0.10) + (8333 * 0.25) + (467667 * 0.30) + ((taxable_income - 500000) * 0.325);
        }
        else {
            i_tax = (24000 * 0.10) + (8333 * 0.25) + (467667 * 0.30) + (300000 * 0.325) + ((taxable_income - 800000) * 0.35);
        }
        return i_tax
    }

    let income_tax = person_paye(tax_inc);


    //Tax Reliefs
    let personal_relief = 2400;
    let shif_relief = shif1 * 0.15;                                     // 15% insurance relief on SHIF
    let total_relief = Math.max(personal_relief + shif_relief, 0);      //picks the actual amount or 0..not -ves


    //final paye after reliefs
    let final_paye = Math.max(income_tax - total_relief, 0);


    //Net Salary function
    function net_salary(gross_salary, shif, nhdf, nssf, payee) {
        return gross_salary - (shif + nhdf + nssf + payee);

    }

    let net_sal = net_salary(gross, shif1, nhdf1, nssf1, final_paye)


    //Rounding off
    function format_amount(amount, rate) {
        rate = Number(rate);
        if (rate === 1) {
            return Math.round(amount);                                                  // Rounds to the nearest whole shilling
        } else if (rate === 0.50) {
            return (Math.round(amount * 2) / 2).toFixed(2);                             // Rounds to nearest 50 cents
        } else if (rate === 0.10) {
            return (Math.round(amount * 10) / 10).toFixed(2);                           // Rounds to nearest 10 cents
        } else {
            return amount.toFixed(2);                                                   // Keeps exact cents (.01)
        }
    }

    // Output
    document.getElementById('gross_sal').innerText = format_amount(gross, config_rate);
    document.getElementById("shif").innerText = format_amount(shif1, config_rate);
    document.getElementById("nssf").innerText = format_amount(nssf1, config_rate);
    document.getElementById("nhdf").innerText = format_amount(nhdf1, config_rate);
    document.getElementById("taxable_income").innerText = format_amount(tax_inc, config_rate);

    document.getElementById("res-income-tax").innerText = format_amount(income_tax, config_rate);
    document.getElementById("res-relief").innerText = format_amount(total_relief, config_rate);
    document.getElementById("paye").innerText = format_amount(final_paye, config_rate);
    document.getElementById("net_salary").innerText = "KES" + format_amount(net_sal, config_rate);
    document.getElementById("results").style.display = "block";
    document.getElementById("download_row").style.display = "table-row";
});


document.getElementById("download_pdf").addEventListener("click", function () {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    const getText = id => document.getElementById(id).innerText;

    // Brand color: #4CAF50
    const green = [76, 175, 80];

    // Header bar
    doc.setFillColor(...green);
    doc.rect(0, 0, 210, 30, 'F');

    // Title in white
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(20);
    doc.text("SMARTPAY", 14, 20);
    doc.setFontSize(12);
    doc.text("PAYE Breakdown", 14, 26);

    // Reset text color
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(10);
    doc.text(`Generated: ${new Date().toLocaleDateString()}`, 150, 20);

    // Table
    const data = [
        ["Gross Salary", getText("gross_sal")],
        ["SHIF (Health Insurance)", getText("shif")],
        ["NSSF", getText("nssf")],
        ["NHDF (Housing Levy)", getText("nhdf")],
        ["Taxable Income", getText("taxable_income")],
        ["Income Tax", getText("res-income-tax")],
        ["Total Relief", getText("res-relief")],
        ["PAYE Payable", getText("paye")],
        ["Net Salary", getText("net_salary")]
    ];

    let y = 45;
    doc.setFontSize(11);

    // Table header
    doc.setFillColor(240, 240, 240);
    doc.rect(14, y - 7, 182, 9, 'F');
    doc.setFont(undefined, 'bold');
    doc.text("Item", 16, y);
    doc.text("Amount (KES)", 130, y);
    doc.setFont(undefined, 'normal');
    y += 10;

    // Table rows
    data.forEach((row, i) => {
        if (i % 2 === 0) {
            doc.setFillColor(250, 250, 250);
            doc.rect(14, y - 6, 182, 9, 'F');
        }
        doc.text(row[0], 16, y);
        doc.text(row[1], 130, y);
        y += 10;
    });

    // Highlight net salary
    doc.setDrawColor(...green);
    doc.setLineWidth(0.5);
    doc.line(14, y + 2, 196, y + 2);
    doc.setFont(undefined, 'bold');
    doc.setTextColor(...green);
    doc.text("Net Salary", 16, y + 10);
    doc.text(getText("net_salary"), 130, y + 10);

    // Footer
    doc.setFont(undefined, 'normal');
    doc.setFontSize(9);
    doc.setTextColor(100, 100, 100);
    doc.text("Calculations based on Kenya Finance Act 2024/2025. For guidance only.", 14, y + 25);

    doc.save(`SMARTPAY_PAYE_${new Date().toISOString().slice(0, 10)}.pdf`);
});



