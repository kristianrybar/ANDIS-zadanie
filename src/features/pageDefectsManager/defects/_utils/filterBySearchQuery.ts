import { ignoreDiacritics } from '../../_utils/ignoreDiacritics'

export const filterBySearchQuery = (defect, searchQuery) => {
    if (!defect || !searchQuery)
        return true

    if (searchQuery.length < 2) 
        return true
    //defect.defectID.toLowerCase().includes(searchQuery.toLowerCase()) ||
    //defect.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    //defect.defectState.toLowerCase().includes(searchQuery.toLowerCase()) ||

    return ignoreDiacritics?.(defect.defectType.defectTypeName?.toLowerCase())?.includes(ignoreDiacritics(searchQuery.toLowerCase()))
}