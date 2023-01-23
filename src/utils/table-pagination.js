const calculateRange = (data, rowsPerPage) => {
    const range = [];
    const num = Math.ceil(data.length / rowsPerPage);
    console.log("number: ",data)
    for (let i = 1; i <= num; i++) {
        range.push(i);
    }
    return range;
}

const sliceData = (data, page, rowsPerPage) => {
    console.log("data ",data)
    console.log("page ",page)
    console.log("data: ",rowsPerPage)
    let a = data.slice((page-1) * rowsPerPage, page * rowsPerPage);
    console.log("a: ",a)
    return a
}  

export {
    calculateRange,
    sliceData
}