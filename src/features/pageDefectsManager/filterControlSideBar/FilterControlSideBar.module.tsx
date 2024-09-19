import { TFilter } from '../_t/TFilter'
import FilterGroup from './filterGroup/FilterGroup'
import css from './FilterControlSideBar.module.module.css'


type Props = {
    filters: TFilter[]
    onCheckbox: (index, filterName) => void
    onResetFilters: () => void
}

const FilterControlSideBar = (props: Props) => {
    return (
        <>  
            <div 
                className={css.resetFilters}
                onClick={props.onResetFilters}
            >
                Zrušiť vybrané parametre
            </div>
            
            <div className={css.filtersSidebar}>
                {props.filters.map(f =>
                    <FilterGroup
                        key={f.filterName}
                        filterName={f.filterName}
                        options={f.filterOptions}
                        onCheckbox={(e, idx) => props.onCheckbox(idx, f.filterName)}
                    />
                )}
            </div>
        </>
    )
}

export default FilterControlSideBar