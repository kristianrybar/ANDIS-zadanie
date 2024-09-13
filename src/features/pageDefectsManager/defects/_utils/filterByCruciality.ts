export const filterByCruciality = (defect, filter) => {
    if (!defect || !filter) 
        return true

    const isCrucial = defect.technicalObject.isCrucial

    const activeOptions = filter.filterOptions.filter(option => option.isActive)
    if (!activeOptions.length)
        return true
    
    if (activeOptions.length == 3)
        return defect.technicalObject.isCrucial || !defect.technicalObject.isCrucial

    const titles = activeOptions.map(option => option.name)

    if (titles.includes('Áno') && isCrucial)
        return true
    if (titles.includes('Nie') && isCrucial == false)
        return true
    if (titles.includes('Bez určenia') && isCrucial == null) 
        return true
    
    return false
}