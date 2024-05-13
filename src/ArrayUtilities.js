function sumByCategory(data, categoryCol, dataCol){

    const aggrDict = data.reduce((result, row)=>{
        if(!result.hasOwnProperty(row[categoryCol])){
            result[row[categoryCol]] = 0;
        } 
        
        result[row[categoryCol]] += row[dataCol];
        
        return result;

    }, {})

    return Object.keys(aggrDict).map((expCat)=>({category:expCat, value:aggrDict[expCat]}));

};

export {sumByCategory};