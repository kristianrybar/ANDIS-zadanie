export const filterByCruciality = (defect, filterCrucialityOptions) => {
    if (!defect || !filterCrucialityOptions || !filterCrucialityOptions.length) 
        return true

    const isCrucial = defect.technicalObject.isCrucial

    const activeOptions = filterCrucialityOptions.filter(option => option.isActive)
    if (!activeOptions.length)
        return true
    

    if (activeOptions.length == 3)
        return defect.technicalObject.isCrucial || !defect.technicalObject.isCrucial

    const titles = activeOptions.map(option => option.title);

    // Ak sú dve možnosti aktívne, kontroluje sa podľa aktívnych hodnôt
    if (titles.includes('Áno') && isCrucial)
        return true
    if (titles.includes('Nie') && isCrucial == false)
        return true
    if (titles.includes('Bez určenia') && isCrucial == null) 
        return true
    
    return false
}