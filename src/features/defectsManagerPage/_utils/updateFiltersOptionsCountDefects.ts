import { produce, current } from 'immer'

export const updateFiltersOptionsCountDefects = (filteredDefects) => {
  return produce((draft) => {
    if (!filteredDefects.length)
      return
    
    //console.log(current(draft))
    console.log('FD', filteredDefects)

    // persistence
    const filter1 = draft.find(filter => filter.filterName == 'Pretrvávanie nedostatku')
    filter1.filterOptions.map(o => {
      if (o.name == 'Nepretrváva')
        o.countDefects = filteredDefects.filter(d => !d.isPersistent).length
      if (o.name == 'Pretrváva')
        o.countDefects = filteredDefects.filter(d => d.isPersistent).length
    })

    // severity level
    const filter2 = draft.find(filter => filter.filterName == 'Úroveň závažnosti')
    filter2.filterOptions.map(o => {
      if (['1', '2', '3', '4'].includes(o.name))
        o.countDefects = filteredDefects.filter(d => d.defectType.defaultSeverityLevel == o.name).length
    })

    //construction year
    const filter3 = draft.find(filter => filter.filterName == 'Rok výstavby')
    filter3.filterOptions.map(o => {
      o.countDefects = filteredDefects.filter(def => def.technicalObject.constructionYear == o.name).length
    })
    

    console.log(current(filter2))
  })

  // if (!prevState) 
  //   return prevState


  //   prevState.forEach(filter => {
  //     if (key === 'voltageLevelOptions') {
  //       if (['NN Vedenia', 'VN Vedenia', 'VVN Vedenia', 'Trafostanice', 'Elektrické stanice'].includes(option.title))
  //         option.countDefects = filteredDefects.filter(defect => defect.technicalObject.technicalObjectType?.voltageLevel.voltageLevelName == option.title).length;
  //     }
  //     if (key === 'constructionYearOptions') {
  //       const objectWithSameValue = _findObjectWithSameValue(filteredDefects, option.title);
  //       if (objectWithSameValue)
  //         return;
  //       option.countDefects = filteredDefects.filter(def => def.technicalObject.constructionYear == option.title).length;
  //     }
  //   });
  // });

  //return newState;
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


