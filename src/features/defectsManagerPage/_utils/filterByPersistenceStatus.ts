export const filterByPersistenceStatus = (defect, filterPersistenceOptions) => {
    if (!defect || !filterPersistenceOptions.length) 
        return true

    const activeOptions = filterPersistenceOptions.filter(option => option.isActive)
    if (!activeOptions.length)
        return true

    if (activeOptions.length == 2)
        return true

    if (activeOptions[0].title == 'Pretrváva') 
        return defect.isPersistent

    if (activeOptions[0].title == 'Nepretrváva') 
        return !defect.isPersistent
    
    return false
}