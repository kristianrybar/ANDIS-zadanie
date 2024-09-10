import UiInput from '~/app_shared/ui_input/UiInput'
import css from './FilterGroup.module.css'
import { TDefect } from '~/defectsManagerPage/_t/TDefect'

type Props = {
    filterName: string
    options: any[]
    onCheckbox: (e, idx) => void
}

const FilterGroup = (props: Props) => {

    return (
        <div className={css.filterGroupWrapper}>
            <span>{props.filterName}</span>

            <div className={css.options}>
                {props.options?.map((option, index) =>
                    <UiInput
                        key={index}
                        type='checkbox'
                        label={<>{option.title}<span className={css.count}>{`(${option.countDefects})`}</span></>} 
                        value={option.title}
                        onChange={(e) => props.onCheckbox(e, index)}
                        checked={option.isActive}
                    />
                )}
            </div>
        </div>
    )
}

export default FilterGroup