export const togglePersistenceOption = (prevState, idx) => {
    const updatedOptions = prevState.persistenceOptions.map((option, i) => {
        if (i != idx) 
            return option

        return { ...option, isActive: !option.isActive }
    })

    return { ...prevState, persistenceOptions: updatedOptions }
}