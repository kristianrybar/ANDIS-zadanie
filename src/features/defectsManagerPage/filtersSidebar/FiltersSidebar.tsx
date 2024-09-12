import { toggleConstructionYearOption } from './_utils/toggleConstructionYearOption'
import { togglePersistenceOption } from './_utils/togglePersistenceOption'
import { toggleSeverityLevelOption } from './_utils/toggleSeverityLevelOption'
import { toggleVoltageLevelOption } from './_utils/toggleVoltageLevelOption'
import FilterGroup from './filterGroup/FilterGroup'
import css from './FiltersSidebar.module.css'


type Props = {
    filters: any
    set_filter: (...args) => void
}

const FiltersSidebar = (props: Props) => {
    return (
        <div className={css.filtersSidebar}>
            <FilterGroup
                filterName='Pretrvávanie&nbsp;nedostatku'
                options={props.filters.persistenceOptions}
                onCheckbox={(e, idx) => props.set_filter(prev => togglePersistenceOption(prev, idx))}
            />
            <FilterGroup
                filterName='Úroveň&nbsp;závažnosti'
                options={props.filters.severityLevelOptions}
                onCheckbox={(e, idx) => props.set_filter(prev => toggleSeverityLevelOption(prev, idx))} 
            />
            <FilterGroup
                filterName='Napäťová&nbsp;úroveň'
                options={props.filters.voltageLevelOptions}
                onCheckbox={(e, idx) => props.set_filter(prev => toggleVoltageLevelOption(prev, idx))} 
            />
            <FilterGroup
                filterName='Rok&nbsp;výstavby'
                options={props.filters.constructionYearOptions}
                onCheckbox={(e, idx) => props.set_filter(prev => toggleConstructionYearOption(prev, idx))} 
            />
        </div>
    )
}

export default FiltersSidebar