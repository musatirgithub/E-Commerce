
const dateTimeConverter = (dateTime)=>{
    // const year = dateTime.getFullYear();
    let month = (dateTime.getMonth() +1).toString();
    let date = dateTime.getDate().toString();
    if (month.length === 1){
        month = "0" + month;
    }
    if (date.length === 1){
        date = "0" + date;
    }
    // const hour = dateTime.getHours();
    // const minute = dateTime.getMinutes();
    return `${date}.${month}`
}

export default dateTimeConverter;