import { TDefect } from '../_t/TDefect'
import { TFilter } from '../_t/TFilter'
import { TFilterOption } from '../_t/TFilterOption'

export const createFilters = (defects: TDefect[]) => {
  const filters: TFilter[] = [
    {
      filterName: 'Rok výstavby',
      filterOptions: [] as TFilterOption[]
    }
  ]
  
  // severity level
  filters.unshift(_getCountBySeverityLevel_andCreateOptions(defects))
  // persistence
  filters.unshift(_getCountByPersistence_andCreateOptions(defects)) 

  
  defects.forEach(d => {
    // construction year
    if (d.technicalObject.constructionYear) {
      const filterName = 'Rok výstavby'
      const objectWithSameValue = _findObjectWithSameValue(filters, filterName, d.technicalObject.constructionYear)
      if (objectWithSameValue) 
        return
    
      const countDefects = defects.filter(def => def.technicalObject.constructionYear == d.technicalObject.constructionYear).length
      const filterOption = {
        name: d.technicalObject.constructionYear,
        isActive: false,
        countDefects: countDefects,
      } 
      
      const targetFilter = filters.find(f => f.filterName == filterName)
      if (!targetFilter) 
        return
      
      targetFilter.filterOptions.push(filterOption)
    }
    //supervisor
  })


  //   //supervisor
  //   if (d.technicalObject.supervisor) {
  //     const objectWithSameValue = _findObjectWithSameValue(filter.supervisorOptions, d.technicalObject.supervisor)
  //     if (objectWithSameValue) 
  //       return
  //     const countDefects = defects.filter(def => def.technicalObject.supervisor == d.technicalObject.supervisor).length

  //     filter.supervisorOptions.push({
  //       title: d.technicalObject.supervisor,
  //       isActive: false,
  //       countDefects: countDefects
  //     })
  //   }
  // })

  //filter.constructionYearOptions.sort((a, b) => b.title - a.title) // construction year - sort zostupne podla roka



  // voltage level
  //filters.push(_getCountByVoltageLevel_andCreateOptions(defects))

  // cruciality
  //filter.crucialityOptions = _getCountByCruciality_andCreateOptions(defects)

  return filters
}


const _findObjectWithSameValue = (array, filterName, comparisonValue) => {
  if (!array || !array.length) 
    return
  if (!comparisonValue || !filterName) 
    return
  
  const findedFilter = array.find(obj => obj.filterName == filterName)
  if (!findedFilter) 
    return

  const objectWithSameValue = findedFilter.filterOptions.find(obj => obj.name == comparisonValue)
  if (!objectWithSameValue) 
    return
  
  return objectWithSameValue
}

const _getCountByPersistence_andCreateOptions = (defects) => {
  return {
    filterName: 'Pretrvávanie nedostatku',
    filterOptions:[
      {
        name: 'Pretrváva',
        isActive: false,
        countDefects: defects.filter(defect => defect.isPersistent).length
      },
      {
        name: 'Nepretrváva',
        isActive: false,
        countDefects: defects.filter(defect => !defect.isPersistent).length
      }
    ],
  }
}

const _getCountBySeverityLevel_andCreateOptions = (defects) => {
  return {
    filterName: 'Úroveň závažnosti',
    filterOptions: [
      {
        name: '1',
        isActive: false,
        countDefects: defects.filter(defect => defect.defectType.defaultSeverityLevel == '1').length
      },
      {
        name: '2',
        isActive: false,
        countDefects: defects.filter(defect => defect.defectType.defaultSeverityLevel == '2').length
      },
      {
        name: '3',
        isActive: false,
        countDefects: defects.filter(defect => defect.defectType.defaultSeverityLevel == '3').length
      },
      {
        name: '4',
        isActive: false,
        countDefects: defects.filter(defect => defect.defectType.defaultSeverityLevel == '4').length
      },
    ]
  }
}

const _getCountByVoltageLevel_andCreateOptions = (defects) => {
  return 
    
  
  [
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

const _getCountByCruciality_andCreateOptions = (defects) => {
  return [
    {
      title: 'Áno',
      isActive: false,
      countDefects: defects.filter(defect => defect.technicalObject.isCrucial).length
    },
    {
      title: 'Nie',
      isActive: false,
      countDefects: defects.filter(defect => defect.technicalObject.isCrucial == false).length
    },
    {
      title: 'Bez určenia',
      isActive: false,
      countDefects: defects.filter(defect => defect.technicalObject.isCrucial == null).length
    },
  ]
}
