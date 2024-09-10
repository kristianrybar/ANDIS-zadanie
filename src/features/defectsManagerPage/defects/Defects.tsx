import { useState } from 'react'
import { TDefect } from '../_t/TDefect'
import Defect from './defect/Defect'
import UiInput from '~/app_shared/ui_input/UiInput'
import UiDropdown from '~/app_shared/ui_dropdown/UiDropdown'
import { UiDatePickerRange } from '~/app_shared/ui_datePickerRange/UiDatePickerRange'
import { filterBySearchQuery } from '../_utils/filterBySearchQuery '
import { sortByDate } from '../_utils/sortByDate'
import { filterByDateRange } from '../_utils/filterByDateRange'
import css from './Defects.module.css'
import { filterByPersistenceStatus } from '../_utils/filterByPersistenceStatus'

type Props = {
    defects: TDefect[]
    filter: any
    onOpenDetail: () => void
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
        .filter(defect => {
            if (!defect) 
                return true

            const activeOptions = props.filter.severityLevelOptions.filter(option => option.isActive)
            if (!activeOptions.length) 
                return true
        
            if (activeOptions.length == 4) 
                return defect.defectType.defaultSeverityLevel
        
            return activeOptions.some(option => option.title == defect.defectType.defaultSeverityLevel)
        })


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