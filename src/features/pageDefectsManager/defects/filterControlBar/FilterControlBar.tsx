import { UiDatePickerRange } from '~/app_shared/ui_datePickerRange/UiDatePickerRange'
import UiInput from '~/app_shared/ui_input/UiInput'
import UiDropdown from '~/app_shared/ui_dropdown/UiDropdown'
import css from './FilterControlBar.module.css'

type Props = {
    // search bar
    searchQuery: string
    onSearchQuery: (e) => void
    // date from/to
    onSelectStartDate: (e) => void
    onSelectEndDate: (e) => void
    // dropdown
    dropdownQuery: string
    onChangeDropdown: (e) => void
    onClearOption: () => void
    dropdownOptions: string[]
}

const FilterControlBar = (props: Props) => {
    return (
        <div className={css.filterControlBar}>
            <div className={css.datePickerRange}>
                <UiDatePickerRange
                    onSelectStartDate={props.onSelectStartDate}
                    onSelectEndDate={props.onSelectEndDate}
                /> 
            </div>
            <div className={css.searchbar}>
                <UiInput
                    value={props.searchQuery || ''}
                    onChange={props.onSearchQuery}
                    width='300px'
                />
            </div>
            <div className={css.dropdown}>
                <UiDropdown
                    options={props.dropdownOptions}
                    value={props.dropdownQuery || ''}
                    onChange={props.onChangeDropdown}
                    showIcon={true}
                    onClearOption={props.onClearOption}
                />
            </div>
        </div>
    )
}

export default FilterControlBar