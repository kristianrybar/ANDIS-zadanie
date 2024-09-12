import { useEffect, useState } from 'react'
import { TDefect } from '../_t/TDefect'
import { filterByPersistenceStatus } from './_utils/filterByPersistenceStatus'
import { filterBySeverityLevel } from './_utils/filterBySeverityLevel'
import { filterByVoltageLevel } from './_utils/filterByVoltageLevel'
import { filterBySearchQuery } from './_utils/filterBySearchQuery'
import { filterByDateRange } from './_utils/filterByDateRange'
import { sortByDate } from './_utils/sortByDate'
import { UiDatePickerRange } from '~/app_shared/ui_datePickerRange/UiDatePickerRange'
import Defect from './defect/Defect'
import UiInput from '~/app_shared/ui_input/UiInput'
import UiDropdown from '~/app_shared/ui_dropdown/UiDropdown'
import css from './Defects.module.css'
import { filterByConstructionYear } from './_utils/filterByConstructionYear'
import { createFilters } from '../_utils/prepareFilters'

type Props = {
    defects: TDefect[]
    filter: any
    onOpenDetail: () => void
    onFilterDefects: (filteredDefects) => void
}

const Defects = (props: Props) => {
    const [searchQuery, set_searchQuery] = useState<string>('')
    const [dropdownQuery, set_dropdownQuery] = useState<string>('')
    const [dateFilter, setDateFilter] = useState({
        startDate: '',
        endDate: '',
    })


    const filteredDefects = props.defects
        .filter((defect) => filterBySearchQuery(defect, searchQuery))
        .sort((a, b) => sortByDate(a, b, dropdownQuery))
        .filter(defect => filterByDateRange(dateFilter, defect.createdDTime))
        .filter(defect => filterByPersistenceStatus(defect, props.filter.persistenceOptions))
        .filter(defect => filterBySeverityLevel(defect, props.filter.severityLevelOptions))
        .filter(defect => filterByVoltageLevel(defect, props.filter.voltageLevelOptions))
        .filter(defect => filterByConstructionYear(defect, props.filter.constructionYearOptions))
    
    useEffect(() => {
        props.onFilterDefects(filteredDefects)
        console.log('Local defects have been updated, you should update the defectsCount. If the count is 0, then disable the checkbox.')
    }, [filteredDefects])


    return (
        <div className={css.defects}>
            <div className={css.filtersBar}>
                <div className={css.datePickerRange}>
                    <UiDatePickerRange
                        onSelectStartDate={(e) => setDateFilter(prev => ({...prev, startDate: e?.target?.value}))}
                        onSelectEndDate={(e) => setDateFilter(prev => ({...prev, endDate: e?.target?.value}))}
                    /> 
                </div>
                <div className={css.searchbar}>
                    <UiInput
                        value={searchQuery}
                        onChange={(e) => set_searchQuery(e.target.value)}
                    />
                </div>
                <div className={css.dropdown}>
                    <UiDropdown
                        options={['Najnovšie', 'Najstaršie']}
                        value={dropdownQuery}
                        onChange={(e) => set_dropdownQuery(e.value)}
                        showIcon={true}
                        onClearOption={() => set_dropdownQuery('')}
                    />
                </div>
            </div>

            <div className={css.scrollDefects}>
                <div className={css.defectsList}>
                    {filteredDefects.length
                        ? filteredDefects.map(d => 
                            <Defect
                                key={d.defectID}
                                defect={d}
                                onOpenDetail={props.onOpenDetail}
                                onCheckbox={() => console.log}
                            />
                        )
                        : <div className={css.noDefects}>Žiadne výsledky</div>
                    }
                </div>
            </div>
        </div>
    )
}

export default Defects