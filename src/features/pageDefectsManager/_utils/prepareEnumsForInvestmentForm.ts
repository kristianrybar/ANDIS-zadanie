import { TDefect } from '../_t/TDefect'
import { findUniqueValues } from './findUniqueValues'

export const prepareEnumsForInvestmentForm = (defects: TDefect[], investmentRequests) => {
    if (!defects.length || !investmentRequests.length) 
        return
    
    const municipalities: string[] = findUniqueValues(defects, 'technicalObject.municipality') as string[]
    if (!municipalities) 
        return
    
    const investmentReasonCodes: string[] = findUniqueValues(investmentRequests, 'investmentReasonCode') as string[]
    if (!investmentReasonCodes) 
        return

    const planningGroups: string[] = findUniqueValues(investmentRequests, 'planningGroup') as string[]
    if (!planningGroups) 
        return
    
    const technicalJustificationCodes = findUniqueValues(investmentRequests, 'technicalJustificationCode') as string[]
    if (!technicalJustificationCodes) 
        return

    return {
        municipalities,
        investmentReasonCodes,
        planningGroups,
        technicalJustificationCodes
    }
}

