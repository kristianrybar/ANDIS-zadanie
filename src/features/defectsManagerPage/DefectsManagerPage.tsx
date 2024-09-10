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
            { title: 'Pretrváva', isActive: false },
            { title: 'Nepretrváva', isActive: false },
        ],
        defaultSeverityLevel: null,
    })
    console.log(filter.persistenceOptions)

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

    return (<>
        <div className={css.homePageContainer}>
            {mode == 'list' &&
                <>
                    <div className='border w-2/12'>
                        <FiltersSidebar
                            voltageLevels={voltageLevels}
                            filter={filter}
                            set_filter={set_filter}
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