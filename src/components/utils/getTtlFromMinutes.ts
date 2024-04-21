
const getTtlFromMinutes = (minutes : number) => {


    return Math.floor(Date.now()/1000 + minutes*60)


}

export default getTtlFromMinutes