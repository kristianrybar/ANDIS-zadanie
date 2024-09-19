import { createSearchParams, useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { TFilter } from './_t/TFilter'
import { mock_GET_ZADANIE_DATA } from './_mockApi/mock_GET_ZADANIE_DATA'
import { TDefect } from './_t/TDefect'
import { resetAllFilters } from './_utils/resetAllFilters'
import { toggleOffOnFilterOption } from './_utils/toggleOffOnFilterOption'
import { createFilters } from './_utils/createFilters'
import { updateFiltersOptionsCountDefects } from './_utils/updateFiltersOptionsCountDefects'
import FormInvestmentRequest from './formInvestmentRequest/FormInvestmentRequest'
import FilterControlSidebbar from './filterControlSidebbar/FilterControlSidebbar.module'
import Defects from './defects/Defects'
import DefectDetail from './defectDetail/DefectDetail'
import Test from './Test'
import css from './PageDefectsManager.module.css'


const PageDefectsManager = () => {
  const [defects, set_defects] = useState<TDefect[]>([])
  const [filters, set_filters] = useState<TFilter[]>([])
  const [selectedDefects, set_selectedDefects] = useState<TDefect[]>([])
  const [mode, set_mode] = useState<'list' | 'detail'>('list')
  const [isOpenForm, set_isOpenForm] = useState<boolean>(false)

  const navigate = useNavigate()
  const location = useLocation()


  const getMockCoreData = async () => {
    //await new Promise(resolve => setTimeout(resolve, 1000))
    const resp = await mock_GET_ZADANIE_DATA()
    if (resp.error)
      return alert(resp.error)
    
    set_defects(resp.finalDefects)
  }

  const openDefectDetail_andCreateUrlSearchParams = (defectId) => {
    if (!defectId)
      return
    
    navigate({
      pathname: '/defectsManager/',
      search: createSearchParams({
        defectId
      }).toString()
    })
    set_mode('detail')
  }

  const openDefectsList_andClearUrlSearchParams = () => {
    navigate(location.pathname)
    set_mode('list')
  }

  const selectDefect = (defect: TDefect) => {
    if (!defect) 
      return
    
    set_selectedDefects(prev => ([...prev, defect]))
  }

  const deselectDefect = (defectID) => {
    if (!defectID)
      return
    
    set_selectedDefects(prev => prev.filter(defect => defect.defectID != defectID))
  }


  const isDefectChecked = (defectID) => {
    if (!defectID) 
        return false
    if (!selectedDefects.length) 
        return false
    
    const checkedDefect = selectedDefects.find(d => d.defectID == defectID)
    if (!checkedDefect) 
        return false
    return true
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

    set_filters(initialFilters)
  }, [defects])

  console.log(selectedDefects)

  return (<>
    <div className={css.homePageContainer}>
      {mode == 'list' &&
        <>
          <div className='w-2/12 p-3 bg-[--bg-lighter] rounded-lg border border-[--color4] h-fit'>
            <FilterControlSidebbar
              filters={filters}
              onCheckbox={(optionIndex, filterName) => set_filters((prev) => toggleOffOnFilterOption(prev, filterName, optionIndex))}
              onResetFilters={() => set_filters(resetAllFilters())}
            />
          </div>
          
          <div className='w-10/12'>
            <Defects
              defects={defects}
              filters={filters}
              selectedDefects={selectedDefects}
              onOpenDetail={(defectID) => openDefectDetail_andCreateUrlSearchParams(defectID)}
              onFilterDefects={(filteredDefects) => set_filters(updateFiltersOptionsCountDefects(filteredDefects))}
              onOpenForm={() => set_isOpenForm(true)}
              onSelectDefect={(checked, d) => {
                checked
                  ? selectDefect(d)
                  : deselectDefect(d.defectID)
              }}
              checked={(defectID) => isDefectChecked(defectID)}
            />
          </div>
        </>
      }
      {mode == 'detail' &&
        <div className='w-full'>
          <DefectDetail
            onGoBack={openDefectsList_andClearUrlSearchParams}
            defects={defects}
            checked={(defectID) => isDefectChecked(defectID)}
            onSelectDefect={(checked, d) => {
              checked
                ? selectDefect(d)
                : deselectDefect(d.defectID)
            }}
          />
        </div>
      }
      {isOpenForm &&
        <FormInvestmentRequest
          onClose={() => set_isOpenForm(false)}
          selectedDefects={selectedDefects}
        />
      }
    </div><Test /></>
  )
}

export default PageDefectsManager