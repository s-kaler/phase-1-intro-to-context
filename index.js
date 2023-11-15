// Your code here

function createEmployeeRecord([firstNameArg, familyNameArg, titleArg, payrateArg]){
    let timeInArr = [];
    let timeOutArr = [];
    return {
        firstName: firstNameArg,
        familyName: familyNameArg,
        title: titleArg,
        payPerHour: payrateArg,
        timeInEvents: timeInArr,
        timeOutEvents: timeOutArr
    }
}

function createEmployeeRecords(employeeArr){
    let recordArr = [];
    for(let i = 0; i < employeeArr.length; i++){
        recordArr.push(createEmployeeRecord(employeeArr[i]));
    }
    return recordArr;
}

function createTimeInEvent(record, timestamp){
    const [splitDate, splitTime] = timestamp.split(" ");
    const splitTimeInt = parseInt(splitTime)
    let timeObj = {
        type: "TimeIn",
        hour: splitTimeInt,
        date: splitDate
    }
    record.timeInEvents.push(timeObj);
    //console.log(record.timeInEvents);
    return record;
}

function createTimeOutEvent(record, timestamp){
    const [splitDate, splitTime] = timestamp.split(" ");
    const splitTimeInt = parseInt(splitTime)
    let timeObj = {
        type: "TimeOut",
        hour: splitTimeInt,
        date: splitDate
    }
    record.timeOutEvents.push(timeObj);
    //console.log(record.timeInEvents);
    return record;
}

function hoursWorkedOnDate(record, date){
    for(let i = 0; i < record.timeInEvents.length; i++){
        if(record.timeInEvents[i].date === date){
            return (record.timeOutEvents[i].hour - record.timeInEvents[i].hour)/100;
        }
    }
}

function wagesEarnedOnDate(record, date){
    return hoursWorkedOnDate(record, date) * record.payPerHour;
}


function allWagesFor(record){
    let wages = 0;
    for(let i = 0; i < record.timeInEvents.length; i++){
        wages += wagesEarnedOnDate(record, record.timeInEvents[i].date);
        //console.log(record.timeInEvents[i].date);
    }
    return wages;
}

function calculatePayroll(recordArr){
    let payroll = 0;
    for(let i = 0; i < recordArr.length; i++){
        payroll += allWagesFor(recordArr[i]);
    }
    return payroll;
}

/*

cRecord = createEmployeeRecord(["Julius", "Caesar", "General", 27])
// Earns 324
updatedBpRecord = createTimeInEvent(cRecord, "0044-03-14 0900")
updatedBpRecord = createTimeOutEvent(cRecord, "0044-03-14 2100")
// Earns 54
updatedBpRecord = createTimeInEvent(cRecord, "0044-03-15 0900")
updatedBpRecord = createTimeOutEvent(cRecord, "0044-03-15 1100")

console.log(cRecord.timeInEvents[0].date);

console.log(wagesEarnedOnDate(cRecord, cRecord.timeInEvents[1].date))

console.log(cRecord.timeInEvents[1].date)

console.log(allWagesFor)
*/