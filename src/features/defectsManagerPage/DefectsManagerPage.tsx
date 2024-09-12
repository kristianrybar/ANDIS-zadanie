import { useEffect, useState } from 'react'
import { mock_GET_ZADANIE_DATA } from './_mockApi/mock_GET_ZADANIE_DATA'
import { TDefect } from './_t/TDefect'
import { createFilters } from './_utils/prepareFilters'
import { updateFilters } from './_utils/updateFilters'
import FiltersSidebar from './filtersSidebar/FiltersSidebar'
import Defects from './defects/Defects'
import DefectDetail from './defectDetail/DefectDetail'
import Test from './Test'
import css from './DefectsManagerPage.module.css'


const DefectsManagerPage = () => {
    const [defects, set_defects] = useState<TDefect[]>([])
    const [mode, set_mode] = useState<'list' | 'detail'>('list')
    const [filters, set_filters] = useState<any>({})

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
        const _filters = createFilters(defects)
        set_filters(_filters)
    }, [defects])

    //console.log(filters)
    return (<>
        <div className={css.homePageContainer}>
            {mode == 'list' &&
                <>
                    <div className='border border-r-0 w-2/12'>
                        <FiltersSidebar
                            filters={filters}
                            set_filter={set_filters}
                        />
                    </div>
                    <div className='border w-10/12'>
                        <Defects
                            defects={defects}
                            onOpenDetail={() => set_mode('detail')}
                            filter={filters}
                            onFilterDefects={(filteredDefects) => set_filters(prev => updateFilters(prev, filteredDefects))}
                            // onFilterDefects={(filteredDefects) =>  {
                            //     const result = updateFilters(filters, filteredDefects)
                            //     console.log(result)
                            //     set_filters(result)
                            // }}
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