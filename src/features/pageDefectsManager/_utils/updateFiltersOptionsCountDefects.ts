import { produce } from 'immer'

export const updateFiltersOptionsCountDefects = (filteredDefects) => {
  return produce((draft) => {
    if (!filteredDefects.length)
      return

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

    // construction year
    const filter3 = draft.find(filter => filter.filterName == 'Rok výstavby')
    filter3.filterOptions.map(o => {
      o.countDefects = filteredDefects.filter(def => def.technicalObject.constructionYear == o.name).length
    })

    // volatge level
    const filter4 = draft.find(filter => filter.filterName == 'Úroveň napätia')
    filter4.filterOptions.map(o => {
      if (['NN Vedenia', 'VN Vedenia', 'VVN Vedenia', 'Trafostanice', 'Elektrické stanice'].includes(o.name))
        o.countDefects = filteredDefects.filter(defect => defect.technicalObject.technicalObjectType?.voltageLevel.voltageLevelName == o.name).length
    })

    // cruciality
    const filter5 = draft.find(filter => filter.filterName == 'Významný technický objekt')
    filter5.filterOptions.map(o => {
      if (o.name == 'Áno')
        o.countDefects = filteredDefects.filter(d => d.technicalObject.isCrucial).length
      if (o.name == 'Nie')
        o.countDefects = filteredDefects.filter(d => d.technicalObject.isCrucial == false).length
      if (o.name == 'Bez určenia')
        o.countDefects = filteredDefects.filter(d => d.technicalObject.isCrucial == null).length
    })

    // supervisor
    const filter6 = draft.find(filter => filter.filterName == 'Zodpovedná osoba')
    filter6.filterOptions.map(o => {
      o.countDefects = filteredDefects.filter(def => def.technicalObject.supervisor == o.name).length
    })

    // supervisor
    const filter7 = draft.find(filter => filter.filterName == 'Obec')
    filter7.filterOptions.map(o => {
      o.countDefects = filteredDefects.filter(def => def.technicalObject.municipality == o.name).length
    })

  })
}


