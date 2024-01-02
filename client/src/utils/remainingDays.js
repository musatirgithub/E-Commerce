
const remainingDays = (deadline) => {
    const currentDayTime = new Date(Date.now());
    const diff = ((new Date(deadline)) - currentDayTime)/ (1000 * 60 * 60)
    if(diff > 48){
        return
    }
    let color = ''
    if(diff<= 48){
        color = 'yellow';
    }
    if(diff<= 24){
        color = 'orange';
    }
    if(diff< 0){
        color = 'red';
    }
    return color
}

export default remainingDays