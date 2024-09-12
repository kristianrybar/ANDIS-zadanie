export const toggleConstructionYearOption = (prevState, idx) => {
    const updatedOptions = prevState.constructionYearOptions.map((option, i) => {
        if (i != idx) 
            return option

        return { ...option, isActive: !option.isActive }
    })

    return { ...prevState, constructionYearOptions: updatedOptions }
}