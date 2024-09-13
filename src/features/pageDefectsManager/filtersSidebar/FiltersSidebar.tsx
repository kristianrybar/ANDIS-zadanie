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
        </div>
    )
}

export default FiltersSidebar