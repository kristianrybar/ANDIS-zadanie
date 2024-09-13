export const filterByVoltageLevel = (defect, filterVoltageLevelOptions) => {
    if (!defect || !filterVoltageLevelOptions?.length) 
        return true

    const activeOptions = filterVoltageLevelOptions.filter(option => option.isActive)
    if (!activeOptions.length)
        return true

    if (activeOptions.length == 5)
        return defect.technicalObject.technicalObjectType?.voltageLevel.voltageLevelName

    return activeOptions.some(option => option.title == defect.technicalObject.technicalObjectType?.voltageLevel.voltageLevelName)
}