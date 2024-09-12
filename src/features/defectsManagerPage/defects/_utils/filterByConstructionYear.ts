export const filterByConstructionYear = (defect, filterConstructionYearOptions) => {
    if (!defect) 
        return true

    const activeOptions = filterConstructionYearOptions.filter(option => option.isActive)
    if (!activeOptions.length) 
        return true

    if (activeOptions.length == filterConstructionYearOptions.length) 
        return defect.technicalObject.constructionYear

    return activeOptions.some(option => option.title == defect.technicalObject.constructionYear)
}