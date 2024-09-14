import { useEffect, useState } from 'react'
import { TDefect } from '../_t/TDefect'
import { TFilter } from '../_t/TFilter'
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
import UiButton from '~/app_shared/ui_button/UiButton'
import Defect from './defect/Defect'
import UiInput from '~/app_shared/ui_input/UiInput'
import UiDropdown from '~/app_shared/ui_dropdown/UiDropdown'
import { FaMapMarkedAlt } from 'react-icons/fa'
import { FaListOl } from 'react-icons/fa'
import css from './Defects.module.css'


type Props = {
    defects: TDefect[]
    filters: TFilter[]
    onOpenDetail: (defectID) => void
    onFilterDefects: (filteredDefects) => void
}

const Defects = (props: Props) => {
    const [listMode, set_listMode] = useState<'table' | 'map'>('table')
    const [filteredDefects, set_filteredDefects] = useState<TDefect[]>(props.defects || [])
    const [searchQuery, set_searchQuery] = useState<string>('')
    const [dropdownQuery, set_dropdownQuery] = useState<string>('')
    const [dateFilter, setDateFilter] = useState({
        startDate: '',
        endDate: '',
    })

    const _findAndReturnFilterByName = (filterName) => {
        return props.filters.find(f => f.filterName == filterName)
    }
    
    useEffect(() => {
        const updatedDefects = props.defects
            .sort((a, b) => sortByDate(a, b, dropdownQuery))
            .filter((defect) => filterBySearchQuery(defect, searchQuery))
            .filter(defect => filterByDateRange(dateFilter, defect.createdDTime))
            .filter(defect => filterByPersistenceStatus(defect, _findAndReturnFilterByName('Pretrvávanie nedostatku')))
            .filter(defect => filterBySeverityLevel(defect, _findAndReturnFilterByName('Úroveň závažnosti')))
            .filter(defect => filterByVoltageLevel(defect, _findAndReturnFilterByName('Úroveň napätia')))
            .filter(defect => filterByConstructionYear(defect, _findAndReturnFilterByName('Rok výstavby')))
            .filter(defect => filterByCruciality(defect, _findAndReturnFilterByName('Významný technický objekt')))
            .filter(defect => filterBySupervisor(defect, _findAndReturnFilterByName('Zodpovedná osoba')))
            .filter(defect => filterByMunicipality(defect, _findAndReturnFilterByName('Obec')))
        
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

            <div className={css.actionBar}>
                <UiButton
                    onClick={() => console.log('create investment request')}
                >
                    Vytvoriť investičnú požiadavku
                </UiButton>
                <div className={css.listModeSwitcher}>
                    <div 
                        className={`${listMode == 'table' && css.tableMode}`}
                        onClick={() => set_listMode('table')}
                    >
                        Tabuľka <FaListOl />
                    </div>
                    <div 
                        className={`${listMode == 'map' && css.mapMode}`}
                        onClick={() => set_listMode('map')}
                    >
                        Mapa <FaMapMarkedAlt />
                    </div>
                </div>
            </div>

            {listMode == 'table' && 
                <div className={css.scrollDefects}>
                    <div className={css.defectsList}>
                        <div className={css.labels}>
                            <div>typ nedostatku | stav</div>
                            <div>tech. objekt | rok vystavby</div>
                            <div>uroven napatia | uroven zavaznosti</div>
                            <div>datum vytvorenia | obec</div>
                        </div>
                        {filteredDefects.length
                            ? filteredDefects.map(d => 
                                <Defect
                                    key={d.defectID}
                                    defect={d}
                                    onOpenDetail={() => props.onOpenDetail(d.defectID)}
                                    onCheckbox={() => console.log}
                                />
                            )
                            : <div className={css.noDefects}>Žiadne výsledky</div>
                        }
                    </div>
                </div>
            }
            {listMode == 'map' &&
                <div className={css.defectsMap}>
                    TU BUDU DEFECTS ZOBRAZENE V MAPE, TBD...
                </div>
            }
        </div>
    )
}

export default Defects