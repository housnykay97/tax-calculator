document.getElementById("tax_form").addEventListener('submit', function (event) {
    event.preventDefault();

    let basic_salary = Number(document.getElementById("basic_salary").value)
    let benefits = Number(document.getElementById("benefits").value)

    function calculate_gross(basic, ben) {
        return basic + ben
    }

    let gross = calculate_gross(basic_salary, benefits)
    document.getElementById('gross_sal').innerHTML = gross


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
    document.getElementById("nhif").innerHTML = nhif1



    // NSSF function
    function nssf_value(gross_salary) {
        let nssf = 0;
        if (gross_salary >= 18000) {
            nssf = gross_salary * 0.06;
        }
        return nssf;
    }

    let nssf1 = nssf_value(gross)
    document.getElementById("nssf").innerHTML = nssf1



    //NHDF function (housing levy)
    function nhdf_value(gross_salary) {
        let nhdf = gross_salary * 0.015
        return nhdf
    }

    let nhdf1 = nhdf_value(gross)
    document.getElementById("nhdf").innerHTML = nhdf1



    // taxable income function
    function taxable_income(gross_salary, nssf, nhdf, nhif) {
        let tax_income = gross_salary - (nssf + nhdf + nhif);
        return tax_income
    }

    let tax_inc = taxable_income(gross, nssf1, nhdf1, nhif1)
    document.getElementById("taxable_income").innerHTML = tax_inc



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
    document.getElementById("paye").innerHTML = pay_ee



    //Net Salary function

    function net_salary(gross_salary, nhif, nhdf, nssf, payee) {
        let net = gross_salary - (nhif + nhdf + nssf + payee);
        return net
    }

    let net_sal = net_salary(gross, nhif1, nhdf1, nssf1, pay_ee)
    document.getElementById("net_salary").innerHTML = net_sal


})

// *Form input*
// -> Improve user input methodology through a form
// -> take user input through a form
// -> user fills a form and submits it
// -> on submission, JS is invoked and performs tax computations
// -> JS also outputs the results in a html table


// id attribute -> unique identifier for an element to be targeted by JS
// document.getElementID() -> used by JS to access/target a html element by its unique id

// document.getElementID().value - used when targeting form elements
// document.getElementID().innerHTML - used when targeting other elements
// document.getElementID().innerText - used when targeting other elements


// JS functions
// 1.Reactivity
// 1.User Interactivity - the ability of a user to interact with an application
//     -> anything a user is able to do when using an application(event) e.g scroll, type, submit, toggle

// addEventListener() - a function that waits for an event to occur so that JS is invoked
// event.preventDefault() - a function that prevents the default behaviour of the browser after an event has occurred i.e refreshing

// Task
// Complete the rest of the tax project using form input and output all results in the tax table Style the application to reflect modern 
// tax calculators Lean towards Kenyan-based tax calculators Add some more features to your application or even an extra html with
//  possible features like paye categories , nhif / sha info , nhdf info , and even a possible link to itax or ecitizen