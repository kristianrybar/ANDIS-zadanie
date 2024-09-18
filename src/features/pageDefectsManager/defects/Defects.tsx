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
import { filterByDefectState } from './_utils/filterByDefectState'
import { sortByDate } from './_utils/sortByDate'
import { UiDatePickerRange } from '~/app_shared/ui_datePickerRange/UiDatePickerRange'
import UiButton from '~/app_shared/ui_button/UiButton'
import Defect from './defect/Defect'
import UiInput from '~/app_shared/ui_input/UiInput'
import UiDropdown from '~/app_shared/ui_dropdown/UiDropdown'
import Map from '~/app_shared/map/Map'
import { FaMapMarkedAlt } from 'react-icons/fa'
import { FaListOl } from 'react-icons/fa'
import css from './Defects.module.css'


type Props = {
    selectedDefects: TDefect[]
    defects: TDefect[]
    filters: TFilter[]
    onOpenDetail: (defectID) => void
    onFilterDefects: (filteredDefects) => void
    onOpenForm: () => void
    onSelectDefect: (defect, isChecked) => void
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

    const isDefectChecked = (defectID) => {
        if (!defectID) 
            return false
        if (!props.selectedDefects.length) 
            return false
        
        const checkedDefect = props.selectedDefects.find(d => d.defectID == defectID)
        if (!checkedDefect) 
            return false
        
        return true
    }

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
            .filter(defect => filterByDefectState(defect, _findAndReturnFilterByName('Stav nedostatku')))
        
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
                    onClick={props.onOpenForm}
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
                <div className={css.defectsList}>
                    <div className={css.labels}>
                        <div>tech. objekt (rok výstavby)<hr />typ nedostatku (úroveň závažnosti)</div>
                        <div>stav nedostatku</div>
                        <div>pretrvávanie nedostatku</div>
                        <div>významný tech. objekt</div>
                        <div>úroveň napätia<hr className='!max-w-[117px]' />zodpovedná osoba</div>
                        <div>obec<hr className='!max-w-[112px]' />datum vytvorenia</div>
                    </div>
                    {filteredDefects.length
                        ? filteredDefects.map(d => 
                            <Defect
                                key={d.defectID}
                                defect={d}
                                onOpenDetail={() => props.onOpenDetail(d.defectID)}
                                onCheckbox={(e) => props.onSelectDefect(d, e.target.checked)}
                                searchQuery={searchQuery}
                                checked={isDefectChecked(d.defectID)}
                            />
                        )
                        : <div className={css.noDefects}>Žiadne výsledky</div>
                    }
                </div>
            }
            {listMode == 'map' &&
                <div className={css.defectsMap}>
                    <Map 
                        zoom={14}
                        defects={filteredDefects.filter(d => d.defectTypeIdentifier > '0')}
                    />
                </div>
            }
        </div>
    )
}

export default Defects