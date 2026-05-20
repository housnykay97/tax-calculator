// 15. Write a program that takes input of someone's basic salary and benefits, adds them to find the gross salary then uses  
// the gross salary to find the NHIF. 
// To find the Kenya NHIF Rate using THIS LINK: 

// gross salary function
function gross_salary() {
    let basic_salary = Number(prompt("Enter your salary"))
    let benefits = Number(prompt("Enter your benefits"))
    return basic_salary + benefits
}

let gross = Number(gross_salary())
console.log(gross)


// NHIF function
function nhif_value(gross_salary) {                                 // the parameter name is just a label for whatever number passed in the function
    let nhif = 0;                                                   // starts with zero to create the variable & give it a default value so it doesn't run -ve values
    if (gross_salary <= 5999) {
        nhif = 150;
    } else if (gross_salary <= 7999) {
        nhif = 300;
    } else if (gross_salary <= 11999) {
        nhif = 400;
    } else if (gross_salary <= 14999) {
        nhif = 500;
    } else if (gross_salary <= 19999) {
        nhif = 600;
    } else if (gross_salary <= 24999) {
        nhif = 750;
    } else if (gross_salary <= 29999) {
        nhif = 850;
    } else if (gross_salary <= 34999) {
        nhif = 900;
    } else if (gross_salary <= 39999) {
        nhif = 950;
    } else if (gross_salary <= 44999) {
        nhif = 1000;
    } else if (gross_salary <= 49999) {
        nhif = 1100;
    } else if (gross_salary <= 59999) {
        nhif = 1200;
    } else if (gross_salary <= 69999) {
        nhif = 1300;
    } else if (gross_salary <= 79999) {
        nhif = 1400;
    } else if (gross_salary <= 89999) {
        nhif = 1500;
    } else if (gross_salary <= 99999) {
        nhif = 1600;
    } else {
        nhif = 1700;
    }
    return nhif
}

let nhif1 = nhif_value(gross)
console.log(nhif1)


// 16. Continue with the program above, then use the gross salary to find the NSSF.
// To find the Kenya NSSF Rate using 6% of the Gross Salary. BUT ONLY A MINIMUM OF 18,000 Gross Salary CAN BE USED IN NSSF.

// NSSF function
function nssf_value(gross_salary) {
    let nssf = 0;
    if (gross_salary >= 18000) {
        nssf = gross_salary * 0.06;
    }
    return nssf;
}

let nssf1 = nssf_value(gross)
console.log(nssf1)


// 17. Continue with the same program and calculate an individual’s NHDF using:
//  i.e NHDF = gross_salary *  0.015

//NHDF function (housing levy)
function nhdf_value(gross_salary) {
    let nhdf = gross_salary * 0.015
    return nhdf
}

let nhdf1 = nhdf_value(gross)
console.log(nhdf1)


//  18. Calculate the taxable income.
// i.e taxable_income = gross salary - (NSSF + NHDF + NHIF)

// taxable income function
function taxable_income(gross_salary,nssf,nhdf,nhif){
    let tax_income = gross_salary - (nssf + nhdf + nhif);
    return tax_income
}

let tax_inc = taxable_income(gross,nssf1,nhdf1,nhif1)
console.log(tax_inc)


// 19. Continue with the same program and find the person's PAYEE using the taxable income above.
// Find the Kenya PAYEE Tax Rate using THIS LINK

//PAYEE function

function person_payee(taxable_income) {
    let tax_paid = 0;

    if (taxable_income <= 24000) {
        tax_paid = taxable_income * 0.10;
    } 
    else if (taxable_income <= 32333) {
        tax_paid = (24000 * 0.10) + ((taxable_income - 24000) * 0.25);
    } 
    else if (taxable_income <= 500000) {
        tax_paid = (24000 * 0.10) + (8333 * 0.25) + ((taxable_income - 32333) * 0.30);
    } 
    else if (taxable_income <= 800000) {
        tax_paid = (24000 * 0.10) + (8333 * 0.25) + (467667 * 0.30) + ((taxable_income - 500000) * 0.325);
    } 
    else {
        tax_paid = (24000 * 0.10) + (8333 * 0.25) + (467667 * 0.30) + (300000 * 0.325) + ((taxable_income - 800000) * 0.35);
    }

    // Minus personal relief of 2,400 per month
    let personal_relief = 2400;
    let paye = tax_paid - personal_relief;

    // if paye is negative
    if (paye < 0) {
        paye = 0;
    }

    return paye;
}

let pay_ee = person_payee(tax_inc);
console.log(pay_ee)


// 20. Continue with the same program and calculate an individual’s Net Salary using:
//  net_salary = gross_salary - (nhif + nhdf +  nssf + payee)

//Net Salary function

function net_salary(gross_salary,nhif,nhdf,nssf,payee){
    let net = gross_salary - (nhif + nhdf +  nssf + payee);
    return net
}

let net_sal = net_salary(gross,nhif1,nhdf1,nssf1,pay_ee)
console.log(net_sal)