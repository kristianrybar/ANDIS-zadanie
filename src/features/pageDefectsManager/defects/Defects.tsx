import { useEffect, useState } from 'react'
import { TDefect } from '../_t/TDefect'
import { filterByPersistenceStatus } from './_utils/filterByPersistenceStatus'
import { filterBySeverityLevel } from './_utils/filterBySeverityLevel'
import { filterByVoltageLevel } from './_utils/filterByVoltageLevel'
import { filterBySearchQuery } from './_utils/filterBySearchQuery'
import { filterByConstructionYear } from './_utils/filterByConstructionYear'
import { filterByDateRange } from './_utils/filterByDateRange'
import { filterByCruciality } from './_utils/filterByCruciality'
import { filterBySupervisor } from './_utils/filterBySupervisor'
import { filterByMunicipality } from './_utils/filterByMunicipality'
import { sortByDate } from './_utils/sortByDate'
import { UiDatePickerRange } from '~/app_shared/ui_datePickerRange/UiDatePickerRange'
import Defect from './defect/Defect'
import UiInput from '~/app_shared/ui_input/UiInput'
import UiDropdown from '~/app_shared/ui_dropdown/UiDropdown'
import css from './Defects.module.css'
import { TFilter } from '../_t/TFilter'


type Props = {
    defects: TDefect[]
    filters: TFilter[]
    onOpenDetail: () => void
    onFilterDefects: (filteredDefects) => void
}

const Defects = (props: Props) => {
    const [filteredDefects, set_filteredDefects] = useState<TDefect[]>(props.defects || [])

    const [searchQuery, set_searchQuery] = useState<string>('')
    const [dropdownQuery, set_dropdownQuery] = useState<string>('')
    const [dateFilter, setDateFilter] = useState({
        startDate: '',
        endDate: '',
    })

    const _returnFilterByName = (filterName) => {
        return props.filters.find(f => f.filterName == filterName)
    }
    
    useEffect(() => {
        const updatedDefects = props.defects
            .sort((a, b) => sortByDate(a, b, dropdownQuery))
            .filter((defect) => filterBySearchQuery(defect, searchQuery))
            .filter(defect => filterByDateRange(dateFilter, defect.createdDTime))
            .filter(defect => filterByPersistenceStatus(defect, _returnFilterByName('Pretrvávanie nedostatku')))
            .filter(defect => filterBySeverityLevel(defect, _returnFilterByName('Úroveň závažnosti')))
            .filter(defect => filterByVoltageLevel(defect, _returnFilterByName('Úroveň napätia')))
            .filter(defect => filterByConstructionYear(defect, _returnFilterByName('Rok výstavby')))
            .filter(defect => filterByCruciality(defect, _returnFilterByName('Významný technický objekt')))
            .filter(defect => filterBySupervisor(defect, _returnFilterByName('Zodpovedná osoba')))
            .filter(defect => filterByMunicipality(defect, _returnFilterByName('Obec')))
        
        set_filteredDefects(updatedDefects)
    }, [searchQuery, dropdownQuery, dateFilter, props.defects, props.filters])

    useEffect(() => {
        props.onFilterDefects(filteredDefects)
    }, [filteredDefects, props.defects])
    
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