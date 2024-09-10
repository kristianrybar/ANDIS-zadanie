import { TDefect } from '../_t/TDefect'
import { TVoltageLevel } from '../_t/TVoltageLevel'
import { togglePersistenceOption } from './_utils/togglePersistenceOption'
import { toggleSeverityLevelOption } from './_utils/toggleSeverityLevelOption'
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
                onCheckbox={(e, idx) => props.set_filter(prev => togglePersistenceOption(prev, idx))}
            />
            <FilterGroup
                filterName='Úroveň&nbsp;závažnosti'
                options={props.filter.severityLevelOptions}
                onCheckbox={(e, idx) => props.set_filter(prev => toggleSeverityLevelOption(prev, idx))} 
            />
            <FilterGroup
                filterName='Napäťová&nbsp;úroveň'
                options={[...volatgeLevelNames]}
            />
        </div>
    )
}

export default FiltersSidebar