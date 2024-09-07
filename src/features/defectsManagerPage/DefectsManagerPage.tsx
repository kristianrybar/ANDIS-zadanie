import { useEffect, useState } from 'react'
import { mock_GET_ZADANIE_DATA } from './_mockApi/mock_GET_ZADANIE_DATA'
import { TDefect } from './_t/TDefect'
import FiltersSidebar from './filtersSidebar/FiltersSidebar'
import Defects from './defects/Defects'
import css from './DefectsManagerPage.module.css'


const DefectsManagerPage = () => {
    const [defects, set_defects] = useState<TDefect[]>([])
    console.log(defects)

    const getMockCoreData = async () => {
        //await new Promise(resolve => setTimeout(resolve, 1000))
        const resp = await mock_GET_ZADANIE_DATA()
        if (resp.error) 
            return alert(resp.error)
        
        set_defects(resp)
    }
    
    useEffect(() => {
        getMockCoreData()
    }, [])

    useEffect(() => {
        if (!defects.length) 
            return
        
        let count = 0
        const mmm = defects.forEach(d => d.defectType.voltageLevelIdentifier
            ? count++
            : console.log(d)
        )
        console.log(count)
        console.log(mmm)
    }, [defects])

    return (
        <div className={css.homePageContainer}>

            <div className='border w-3/12'>
                <FiltersSidebar />
            </div>
            

            <div className='border w-9/12'>
                <Defects
                    defects={defects}
                />
            </div>

        </div>
    )
}

export default DefectsManagerPage