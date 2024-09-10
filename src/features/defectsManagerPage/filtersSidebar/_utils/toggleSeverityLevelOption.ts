export const toggleSeverityLevelOption = (prevState, idx) => {
    const updatedOptions = prevState.severityLevelOptions.map((option, i) => {
        if (i != idx) 
            return option
        
        return { ...option, isActive: !option.isActive } 
    })
    
    return { ...prevState, severityLevelOptions: updatedOptions }
}