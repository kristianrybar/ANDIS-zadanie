import { useEffect, useState } from 'react'
import { TDefect } from '../_t/TDefect'
import Defect from './defect/Defect'
import css from './Defects.module.css'
import { ignoreDiacritics } from '../_utils/ignoreDiacritics'
import UiInput from '~/app_shared/ui_input/UiInput'
import UiDropdown from '~/app_shared/ui_dropdown/UiDropdown'

type Props = {
    defects: TDefect[]
}

const Defects = (props: Props) => {
    const [searchQuery, set_searchQuery] = useState<string>('')
    const [dropdownQuery, set_dropdownQuery] = useState<string>('')
    console.log(dropdownQuery)
    const filteredDefects = props.defects.filter((defect) => {
        if (searchQuery.length < 2) 
            return props.defects
        //defect.defectID.toLowerCase().includes(searchQuery.toLowerCase()) ||
        //defect.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        //defect.defectState.toLowerCase().includes(searchQuery.toLowerCase()) ||
        return ignoreDiacritics?.(defect.defectType.defectTypeName?.toLowerCase())?.includes(ignoreDiacritics(searchQuery.toLowerCase()))
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
            </div>
            <h1>Nedostatky - zoznam</h1>
            <div className={css.scrollDefects}>
                <div className={css.defectsList}>
                    {filteredDefects.map(d => 
                        <Defect
                            key={d.defectID}
                            defect={d}
                        />
                    )}
                </div>
            </div>
        </div>
    )
}

export default Defects