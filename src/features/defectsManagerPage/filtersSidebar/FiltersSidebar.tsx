import { TFilter } from '../_t/TFilter'
import FilterGroup from './filterGroup/FilterGroup'
import css from './FiltersSidebar.module.css'


type Props = {
    filters: TFilter[]
    onCheckbox: (index, filterName) => void
}

const FiltersSidebar = (props: Props) => {
    return (
        <div className={css.filtersSidebar}>
            {props.filters.map(f =>
                <FilterGroup
                    key={f.filterName}
                    filterName={f.filterName}
                    options={f.filterOptions}
                    onCheckbox={(e, idx) => props.onCheckbox(idx, f.filterName)}
                />
            )}

            {/* <FilterGroup
                filterName='Významný&nbsp;technický&nbsp;objekt'
                options={props.filters?.crucialityOptions}
                onCheckbox={(e, idx) => props.set_filter(prev => toggleCrucialityOption(prev, idx))} 
            />
            <FilterGroup
                filterName='Zodpovedná&nbsp;osoba'
                options={props.filters?.supervisorOptions}
                onCheckbox={(e, idx) => props.set_filter(toggleOffOnOption(idx, 'supervisorOptions'))} 
            /> */}
        </div>
    )
}

export default FiltersSidebar