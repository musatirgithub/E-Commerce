
const dateTimeFormatter = (dt) => {
    if(dt && dt.length > 16){
        return dt.slice(0, 16);
    }
    return ''
}

export default dateTimeFormatter