export const filterByPersistenceStatus = (defect, filter) => {
    if (!defect || !filter) 
        return true
    
    const activeOptions = filter.filterOptions.filter(option => option.isActive)
    if (!activeOptions.length)
        return true
    
    if (activeOptions.length == 2)
        return defect.isPersistent || !defect.isPersistent

    if (activeOptions[0].name == 'Pretrváva') 
        return defect.isPersistent

    if (activeOptions[0].name == 'Nepretrváva') 
        return !defect.isPersistent
    
    return false
}