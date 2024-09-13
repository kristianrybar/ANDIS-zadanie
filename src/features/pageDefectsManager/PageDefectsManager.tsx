import { useEffect, useState } from 'react'
import { TFilter } from './_t/TFilter'
import { mock_GET_ZADANIE_DATA } from './_mockApi/mock_GET_ZADANIE_DATA'
import { TDefect } from './_t/TDefect'
import { resetAllFilters } from './_utils/resetAllFilters'
import { toggleOffOnFilterOption } from './_utils/toggleOffOnFilterOption'
import { createFilters } from './_utils/createFilters'
import { updateFiltersOptionsCountDefects } from './_utils/updateFiltersOptionsCountDefects'
import FiltersSidebar from './filtersSidebar/FiltersSidebar'
import Defects from './defects/Defects'
import DefectDetail from './defectDetail/DefectDetail'
import Test from './Test'
import css from './PageDefectsManager.module.css'


const PageDefectsManager = () => {
  const [defects, set_defects] = useState<TDefect[]>([])
  const [mode, set_mode] = useState<'list' | 'detail'>('list')
  const [filters, set_filters] = useState<TFilter[]>([])

  const getMockCoreData = async () => {
    //await new Promise(resolve => setTimeout(resolve, 1000))
    const resp = await mock_GET_ZADANIE_DATA()
    if (resp.error)
      return alert(resp.error)
    
    set_defects(resp.finalDefects)
  }

  useEffect(() => {
    getMockCoreData()
  }, [])

  useEffect(() => {
    if (!defects.length)
      return
    const initialFilters = createFilters(defects)
    if (!initialFilters) 
      return
    console.log(initialFilters)
    set_filters(initialFilters)
  }, [defects])

  return (<>
    <div className={css.homePageContainer}>
      {mode == 'list' &&
        <>
          <div className='border border-r-0 w-2/12'>
            <FiltersSidebar
              filters={filters}
              onCheckbox={(optionIndex, filterName) => set_filters((prev) => toggleOffOnFilterOption(prev, filterName, optionIndex))}
              onResetFilters={() => set_filters(resetAllFilters())}
            />
          </div>
          
          <div className='border w-10/12'>
            <Defects
              defects={defects}
              onOpenDetail={() => set_mode('detail')}
              filters={filters}
              onFilterDefects={(filteredDefects) => set_filters(updateFiltersOptionsCountDefects(filteredDefects))}
            />
          </div>
        </>
      }
      {mode == 'detail' &&
        <div className='border w-full'>
          <DefectDetail
            onGoBack={() => set_mode('list')}
          />
        </div>
      }
    </div><Test /></>
  )
}

export default PageDefectsManager