import { TDefect } from '../_t/TDefect'

export const createFilters = (defects: TDefect[]) => {
  const filter = {
    constructionYearOptions: [] as any,
    persistenceOptions: [] as any,
    severityLevelOptions: [] as any,
    voltageLevelOptions: [] as any,
  }
  
  defects.forEach(d => {
    // construction year
    if (d.technicalObject.constructionYear) {
      const objectWithSameValue = _findObjectWithSameValue(filter.constructionYearOptions, d.technicalObject.constructionYear)
      if (objectWithSameValue) 
          return
  
      const countDefects = defects.filter(def => def.technicalObject.constructionYear == d.technicalObject.constructionYear).length

      filter.constructionYearOptions.push({
        title: d.technicalObject.constructionYear,
        isActive: false,
        countDefects: countDefects
      })
    }
  })
  filter.constructionYearOptions.sort((a, b) => b.title - a.title) // construction year - sort zostupne podla roka

  // persistence
  filter.persistenceOptions = _getCountByPersistence_andCreateOptions(defects)
  // severity level
  filter.severityLevelOptions = _getCountBySeverityLevel_andCreateOptions(defects)
  // voltage level
  filter.voltageLevelOptions = _getCountByVoltageLevel_andCreateOptions(defects)

  return filter
}


const _findObjectWithSameValue = (array, comparisonValue) => {
    if (!array || !array.length) 
        return
    if (!comparisonValue) 
        return
    
    const objectWithSameYear = array.find(obj => obj.title == comparisonValue)
    if (!objectWithSameYear) 
        return
    
    return objectWithSameYear
}

const _getCountByPersistence_andCreateOptions = (defects) => {
  return [
    {
      title: 'Pretrváva',
      isActive: false,
      countDefects: defects.filter(defect => defect.isPersistent).length
    },
    {
      title: 'Nepretrváva',
      isActive: false,
      countDefects: defects.filter(defect => !defect.isPersistent).length
    }
  ]
}

const _getCountBySeverityLevel_andCreateOptions = (defects) => {
  return [
    {
      title: '1',
      isActive: false,
      countDefects: defects.filter(defect => defect.defectType.defaultSeverityLevel == '1').length
    },
    {
      title: '2',
      isActive: false,
      countDefects: defects.filter(defect => defect.defectType.defaultSeverityLevel == '2').length
    },
    {
      title: '3',
      isActive: false,
      countDefects: defects.filter(defect => defect.defectType.defaultSeverityLevel == '3').length
    },
    {
      title: '4',
      isActive: false,
      countDefects: defects.filter(defect => defect.defectType.defaultSeverityLevel == '4').length
    },
  ]
}

const _getCountByVoltageLevel_andCreateOptions = (defects) => {
  return [
    {
      title: 'NN Vedenia',
      isActive: false,
      countDefects: defects.filter(defect => defect.technicalObject.technicalObjectType?.voltageLevel.voltageLevelIdentifier == 'NN').length
    },
    {
      title: 'VN Vedenia',
      isActive: false,
      countDefects: defects.filter(defect => defect.technicalObject.technicalObjectType?.voltageLevel.voltageLevelIdentifier == 'VN').length
    },
    {
      title: 'VVN Vedenia',
      isActive: false,
      countDefects: defects.filter(defect => defect.technicalObject.technicalObjectType?.voltageLevel.voltageLevelIdentifier == 'VVN').length
    },
    {
      title: 'Trafostanice',
      isActive: false,
      countDefects: defects.filter(defect => defect.technicalObject.technicalObjectType?.voltageLevel.voltageLevelIdentifier == 'TS').length
    },
    {
      title: 'Elektrické stanice',
      isActive: false,
      countDefects: defects.filter(defect => defect.technicalObject.technicalObjectType?.voltageLevel.voltageLevelIdentifier == 'EST').length
    },
  ]
}
