export const toggleVoltageLevelOption = (prevState, idx) => {
    const updatedOptions = prevState.voltageLevelOptions.map((option, i) => {
        if (i != idx) 
            return option
        
        return { ...option, isActive: !option.isActive } 
    })
    
    return { ...prevState, voltageLevelOptions: updatedOptions }
}