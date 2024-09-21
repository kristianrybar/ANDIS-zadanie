export const findUniqueValues = (array, key) => {
    if (!array.length || !key) 
        return []

    const arrayAllValues = array.map(item => _getNestedValue(item, key))
    if (!arrayAllValues.length) 
        return []
    
    const uniqueArrayValues = [...new Set(arrayAllValues.filter(item => item))]
    if (!uniqueArrayValues.length)
        return []

    return uniqueArrayValues
}

const _getNestedValue = (obj, path) => {
    if (!path.includes('.'))
        return obj[path]
    
    return path.split('.').reduce((acc, part) => acc && acc[part], obj)
}