export const filterBySeverityLevel = (defect, filterSeverityLevelOptions) => {
    if (!defect) 
        return true

    const activeOptions = filterSeverityLevelOptions.filter(option => option.isActive)
    if (!activeOptions.length) 
        return true

    if (activeOptions.length == 4) 
        return defect.defectType.defaultSeverityLevel

    return activeOptions.some(option => option.title == defect.defectType.defaultSeverityLevel)
}