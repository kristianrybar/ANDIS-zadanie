import { useEffect, useState } from 'react'
import { mock_GET_ZADANIE_DATA } from './_mockApi/mock_GET_ZADANIE_DATA'
import { TDefect } from './_t/TDefect'
import FiltersSidebar from './filtersSidebar/FiltersSidebar'
import Defects from './defects/Defects'
import DefectDetail from './defectDetail/DefectDetail'
import Test from './Test'
import css from './DefectsManagerPage.module.css'
import { TVoltageLevel } from './_t/TVoltageLevel'


const DefectsManagerPage = () => {
    const [defects, set_defects] = useState<TDefect[]>([])
    const [voltageLevels, set_voltageLevels] = useState<TVoltageLevel[]>([])
    const [mode, set_mode] = useState<'list' | 'detail'>('list')

    const [filter, set_filter] = useState({
        persistenceOptions: [
            { title: 'Pretrváva', isActive: false, countDefects: null },
            { title: 'Nepretrváva', isActive: false, countDefects: null },
        ],
        severityLevelOptions: [
            { title: '1', isActive: false, countDefects: null },
            { title: '2', isActive: false, countDefects: null },
            { title: '3', isActive: false, countDefects: null },
            { title: '4', isActive: false, countDefects: null },
        ]
    })
    console.log(filter.severityLevelOptions)

    const getMockCoreData = async () => {
        //await new Promise(resolve => setTimeout(resolve, 1000))
        const resp = await mock_GET_ZADANIE_DATA()
        if (resp.error) 
            return alert(resp.error)

        set_defects(resp.finalDefects)
        set_voltageLevels(resp.voltageLevels)
    }

    useEffect(() => {
        getMockCoreData()
    }, [])

    const updateCountsDefectsByFilterOptions = (defects) => {
        const countPersistent = defects.filter(defect => defect.isPersistent).length
        const countNonPersistent = defects.filter(defect => !defect.isPersistent).length
        const countSeverityLevel_1 = defects.filter(defect => defect.defectType.defaultSeverityLevel == '1').length
        const countSeverityLevel_2 = defects.filter(defect => defect.defectType.defaultSeverityLevel == '2').length
        const countSeverityLevel_3 = defects.filter(defect => defect.defectType.defaultSeverityLevel == '3').length
        const countSeverityLevel_4 = defects.filter(defect => defect.defectType.defaultSeverityLevel == '4').length
    
        set_filter(prev => ({
            ...prev,
            persistenceOptions: prev.persistenceOptions.map(option => {
                if (option.title == 'Pretrváva')
                    return { ...option, countDefects: countPersistent }
                if (option.title == 'Nepretrváva') 
                    return { ...option, countDefects: countNonPersistent }
                return option
            }),
            severityLevelOptions: prev.severityLevelOptions.map(option => {
                if (option.title == '1')
                    return { ...option, countDefects: countSeverityLevel_1 }
                if (option.title == '2') 
                    return { ...option, countDefects: countSeverityLevel_2 }
                if (option.title == '3') 
                    return { ...option, countDefects: countSeverityLevel_3 }
                if (option.title == '4') 
                    return { ...option, countDefects: countSeverityLevel_4 }
                return option
            }),

        }))
    }

    useEffect(() => {
        updateCountsDefectsByFilterOptions(defects)
    }, [defects])

    return (<>
        <div className={css.homePageContainer}>
            {mode == 'list' &&
                <>
                    <div className='border border-r-0 w-2/12'>
                        <FiltersSidebar
                            voltageLevels={voltageLevels}
                            filter={filter}
                            set_filter={set_filter}
                            defects={defects}
                        />
                    </div>
                    <div className='border w-10/12'>
                        <Defects
                            defects={defects}
                            onOpenDetail={() => set_mode('detail')}
                            filter={filter}
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

export default DefectsManagerPage