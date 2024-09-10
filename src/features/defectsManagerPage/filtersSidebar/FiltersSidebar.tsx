import { useState } from 'react'
import { TVoltageLevel } from '../_t/TVoltageLevel'
import FilterGroup from './filterGroup/FilterGroup'
import css from './FiltersSidebar.module.css'


type Props = {
    voltageLevels: TVoltageLevel[]
    filter: any
    set_filter: (...args) => void
}
const FiltersSidebar = (props: Props) => {
    const volatgeLevelNames = props.voltageLevels.map(item => item.voltageLevelName)

    return (
        <div className={css.filtersSidebar}>
            <FilterGroup
                filterName='Pretrvávanie&nbsp;nedostatku'
                options={props.filter.persistenceOptions}
                onCheckbox={(e, idx) => props.set_filter(prev => {
                    const updatedOptions = prev.persistenceOptions.map((option, i) => {
                        if (i != idx) 
                            return option
                        
                        return { ...option, isActive: !option.isActive } 
                    })
                    return { ...prev, persistenceOptions: updatedOptions }
                })} 
            />

            <FilterGroup
                filterName='Úroveň&nbsp;závažnosti'
                options={['1', '2', '3', '4']}
            />
            <FilterGroup
                filterName='Napäťová&nbsp;úroveň'
                options={[...volatgeLevelNames]}
            />
        </div>
    )
}

export default FiltersSidebar