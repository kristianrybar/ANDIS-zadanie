import { createSearchParams, useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { TFilter } from './_t/TFilter'
import { mock_GET_ZADANIE_DATA } from './_mockApi/mock_GET_ZADANIE_DATA'
import { TDefect } from './_t/TDefect'
import { TInvestmentRequestType } from './_t/TInvestmentRequestType'
import { resetAllFilters } from './_utils/resetAllFilters'
import { toggleOffOnFilterOption } from './_utils/toggleOffOnFilterOption'
import { createFilters } from './_utils/createFilters'
import { prepareEnumsForInvestmentForm } from './_utils/prepareEnumsForInvestmentForm'
import { updateFiltersOptionsCountDefects } from './_utils/updateFiltersOptionsCountDefects'
import LoadingCircle from '~/app_shared/loadingCircle/LoadingCircle'
import FormInvestmentRequest from './formInvestmentRequest_modal/FormInvestmentRequest_modal'
import FilterControlSideBar from './filterControlSideBar/FilterControlSideBar.module'
import Defects from './defects/Defects'
import DefectDetail from './defectDetail/DefectDetail'
import css from './PageDefectsManager.module.css'


const PageDefectsManager = () => {
  const [processing, set_processing] = useState<boolean>(false)
  const [defects, set_defects] = useState<TDefect[]>([])
  const [filters, set_filters] = useState<TFilter[]>([])
  const [selectedDefects, set_selectedDefects] = useState<TDefect[]>([])
  const [mode, set_mode] = useState<'list' | 'detail'>('list')
  const [isOpenForm, set_isOpenForm] = useState<boolean>(false)
  const [formEnums, set_formEnums] = useState({
    municipalities: [] as string[], 
    investmentRequestTypes: [] as TInvestmentRequestType[],
    technicalJustificationCodes: [] as string[],
    planningGroups: [] as string[],
    investmentReasonCodes: [] as string[],
  })

  const navigate = useNavigate()
  const location = useLocation()


  const getMockCoreData_andPrepareFormEnums = async () => {
    set_processing(true)
    await new Promise(resolve => setTimeout(resolve, 1000)) // mock loading delay

    const resp = await mock_GET_ZADANIE_DATA()
    if (resp.error) {
      set_processing(false)
      alert(resp.error)
      return 
    }

    set_defects(resp.finalDefects)
    
    const enums: any = prepareEnumsForInvestmentForm(resp.finalDefects, resp.investmentRequests)
    if (!enums) {
      set_processing(false)
      return
    }
    
    set_formEnums(prev => ({
      ...prev,
      investmentRequestTypes: resp.investmentRequestTypes,
      technicalJustificationCodes: enums.technicalJustificationCodes,
      investmentReasonCodes: enums.investmentReasonCodes,
      municipalities: enums.municipalities,
      planningGroups: enums.planningGroups,
    }))

    set_processing(false)
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
    getMockCoreData_andPrepareFormEnums()
  }, [])

  useEffect(() => {
    if (!defects.length)
      return
    const initialFilters = createFilters(defects)
    if (!initialFilters) 
      return

    set_filters(initialFilters)
  }, [defects])

  useEffect(() => {
    // prevent body scroll
    if (!isOpenForm)
      return
    
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = 'unset' }
  }, [isOpenForm])
  
  return (
    <div className={css.homePageContainer}>
      {processing && 
        <LoadingCircle
          size={5}
          loadingColor='green'
        />
      }

      {mode == 'list' && !processing &&
        <>
          <div className='w-2/12 p-3 bg-[--bg-lighter] rounded-lg border border-[--color4] h-fit'>
            <FilterControlSideBar
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
              onOpenForm={() => {
                !selectedDefects.length
                  ? alert('No defects are selected')
                  : set_isOpenForm(true)
              }}
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
      {mode == 'detail' && !processing &&
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
          formEnums={formEnums}
          onSuccessSubmit={async () => {
            set_isOpenForm(false)
            await new Promise(resolve => setTimeout(resolve, 500)) // mock loading delay
            alert('Investičná požiadavka bola úspešne vytvorená')
          }}
        />
      }
    </div>
  )
}

export default PageDefectsManager