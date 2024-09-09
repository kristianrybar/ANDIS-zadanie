import { useEffect, useState } from 'react'
import { TDefect } from '../_t/TDefect'
import Defect from './defect/Defect'
import css from './Defects.module.css'
import { ignoreDiacritics } from '../_utils/ignoreDiacritics'
import UiInput from '~/app_shared/ui_input/UiInput'
import UiDropdown from '~/app_shared/ui_dropdown/UiDropdown'
import { UiDatePickerRange } from '~/app_shared/ui_datePickerRange/UiDatePickerRange'

type Props = {
    defects: TDefect[]
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
        .filter((defect) => {
            if (searchQuery.length < 2) 
                return props.defects
            //defect.defectID.toLowerCase().includes(searchQuery.toLowerCase()) ||
            //defect.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            //defect.defectState.toLowerCase().includes(searchQuery.toLowerCase()) ||

            return ignoreDiacritics?.(defect.defectType.defectTypeName?.toLowerCase())?.includes(ignoreDiacritics(searchQuery.toLowerCase()))
        })
        .sort((a, b) => {
            if (!dropdownQuery)
                return 0
            if (!a || !b) 
                return 0
            
            const dateA: any = new Date(a.createdDTime)
            const dateB: any = new Date(b.createdDTime)

            if (dropdownQuery == 'Najnovšie') 
                return dateA - dateB
            if (dropdownQuery == 'Najstaršie') 
                return dateB - dateA

            return 0
        })

        .filter(defect => {
            if (!dateFilter.startDate && !dateFilter.endDate) 
                return true

            const comparingDate = new Date(defect.createdDTime)
            comparingDate.setHours(0,0,0,0)
            
            let isoStartDate
            let isoEndDate

            // prepare iso date
            if (dateFilter.startDate) {
                const [day, month, year] = dateFilter.startDate.split('/')
                isoStartDate = `${year}/${month}/${day}/${'00:00:00'}`
            }
            if (dateFilter.endDate) {
                const [day, month, year] = dateFilter.endDate.split('/')
                isoEndDate = `${year}/${month}/${day}/${'00:00:00'}`
            }

            let startDate = isoStartDate ? new Date(isoStartDate) : null
            let endDate = isoEndDate ? new Date(isoEndDate) : null

            // datum OD
            if (startDate && !endDate) {
                if (startDate <= comparingDate)
                    return true
            }

            // datum DO
            if (endDate && !startDate) {
                if (endDate >= comparingDate) 
                    return true
            }
            
            // datum OD - DO
            if (startDate && endDate) {
                if (startDate <= comparingDate && endDate >= comparingDate) 
                    return true
            }

            return false
        })

    return (
        <div className={css.defects}>
            <div className={css.filtersBar}>
                <div className={css.searchbar}>
                    <UiInput
                        placeholder='Hľadať...'
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
                <div className={css.datePickerRange}>
                    <UiDatePickerRange
                        onSelectStartDate={(e) => setDateFilter(prev => ({...prev, startDate: e?.target?.value}))}
                        onSelectEndDate={(e) => setDateFilter(prev => ({...prev, endDate: e?.target?.value}))}
                    /> 
                </div>
            </div>
            <h1>Nedostatky - zoznam</h1>
            <div className={css.scrollDefects}>
                <div className={css.defectsList}>
                    {filteredDefects.map(d => 
                        <Defect
                            key={d.defectID}
                            defect={d}
                            onOpenDetail={props.onOpenDetail}
                            onCheckbox={() => console.log}
                        />
                    )}
                </div>
            </div>
        </div>
    )
}

export default Defects