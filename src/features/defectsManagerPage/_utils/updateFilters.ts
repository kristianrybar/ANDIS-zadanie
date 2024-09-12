export const updateFilters = (prevState, filteredDefects) => {
    //console.log(prevState)
    //console.log(filteredDefects)
    //const updatedOptions = prevState.severityLevelOptions.map


    Object.entries(prevState).forEach(([key, array]: any) => {
        array.forEach(item => {
            if (key == 'severityLevelOptions') {
                if (item.title == '1') 
                    item.countDefects = filteredDefects.filter(defect => defect.defectType.defaultSeverityLevel == item.title).length
                if (item.title == '2') 
                    item.countDefects = filteredDefects.filter(defect => defect.defectType.defaultSeverityLevel == item.title).length
                if (item.title == '3') 
                    item.countDefects = filteredDefects.filter(defect => defect.defectType.defaultSeverityLevel == item.title).length
                if (item.title == '4') 
                    item.countDefects = filteredDefects.filter(defect => defect.defectType.defaultSeverityLevel == item.title).length
                
            }
            //console.log(key)
            //console.log(item.title)
        })
    })

    return prevState
}