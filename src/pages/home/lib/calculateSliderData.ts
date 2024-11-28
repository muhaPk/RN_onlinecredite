export const calculateSliderData = (sum: number, nrMonth: number) => {
    
    var dailyPerc = 0;
    var perc = 0.5;
    
    if(nrMonth <= 3)
    {
        dailyPerc = 0.0004;
    }
    else if(nrMonth < 24)
    {
        dailyPerc = 0.0003;
    }
    else if(nrMonth == 24)
    {
        if(sum < 19000)
            dailyPerc = 0.0003;
        else if(sum == 19000)
            dailyPerc = 0.0002;
        else if(sum == 20000)
            dailyPerc = 0.0001;
    }
    else
        dailyPerc = 0;
        
    if(nrMonth == 24)
    {
        if(sum >= 21000)
            perc = 0.46;
    }
    else if(nrMonth > 24)
    {
        perc = 0.46;
    }
    
    if(nrMonth == 48)
    {
        perc = 0.4;
    }
    
    var totalComissionMonth = sum * dailyPerc * 30;
    var totalComission = totalComissionMonth * nrMonth;
    
    var dobanda = new Array();
    var soldCredit = new Array();
    var principal = 0;
    var dobandaTotal = 0;
    var tempSum = sum;
    
    var p = 6/73 * perc;
    var k = (1 - Math.pow(1+p, -nrMonth));
    var monthlyPay = tempSum * p / k;
    
    for(var i =0; i < nrMonth; i++)
    {
        dobanda[i] = tempSum * p;
        dobandaTotal += dobanda[i];
        principal = monthlyPay - dobanda[i];
        tempSum -= principal;
        soldCredit[i] = tempSum;
    }
    
    
    
    var totalPay = sum  + dobandaTotal + totalComission;
    
    var dae = 99;
    
    switch(nrMonth)
    {
        case 1:
        dae = 87.26;
        break;
        
        case 2: 
        dae = 95.53;
        break;
        
        case 3: 
        dae = 99.08;
        break;
        
        case 4: 
        dae = 91.17;
        break;
        
        case 5: 
        dae = 92;
        break;
        
        case 6: 
        dae = 92.46;
        break;
        
        case 7: 
        dae = 92.65;
        break;
        
        case 8: 
        dae = 92.71;
        break;
        
        case 9: 
        dae = 92.65;
        break;
        
        case 10: 
        dae = 92.52;
        break;
        
        case 11: 
        dae = 92.35;
        break;
        
        case 12: 
        dae = 92.15;
        break;
        
        case 13:
        dae = 91.93;
        break;
        
        case 14: 
        dae = 91.69;
        break;
    }
    
    if(nrMonth > 14 && nrMonth < 18)
        dae = 91.69;
    else if(nrMonth >= 18 && nrMonth < 24)
        dae = 89.18;
    else if(nrMonth == 24)
    {
        if(sum <= 18000)
            dae = 89.18;
        else if(sum == 19000)
            dae = 80.29;
        else if(sum == 20000)
            dae = 71.63;
        else
            dae = 57.02;
    }
    else if (nrMonth > 24 && nrMonth < 48)
    {
        dae = 57;
    }
    else if(nrMonth == 48)
        dae = 48.17;



    return {
        refound: (Math.round(totalPay*100)/ 100).toFixed(2),
        comission: (Math.round(totalComission * 100) / 100).toFixed(2),
        interestRate: (((dobandaTotal* 100) / 100).toFixed(2)),
        monthlyPayment: (Math.round((monthlyPay +totalComissionMonth) * 100) / 100).toFixed(2)
    }
}