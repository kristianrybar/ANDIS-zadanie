import { useState, useEffect } from 'react'
import UiInput from '~/app_shared/ui_input/UiInput'
import { updateFiltersOptionsCountDefects } from '~/defectsManagerPage/_utils/updateFiltersOptionsCountDefects'
import css from './FilterGroup.module.css'

type Props = {
    filterName: string
    options: any[]
    onCheckbox: (e, idx) => void
}
const maxCountVisibleOptions = 5

const FilterGroup = (props: Props) => {
    const [visibleOptions, set_visibleOptions] = useState<any[]>([])
    const [showAll, setShowAll] = useState(false)

    const showOtherOptionsTextWithCount = () => {
        const result: number = props.options?.length - maxCountVisibleOptions
        if (result <= 0)
            return ''

        return showAll ? 'Zobraziť menej' : 'Ďalších ' + result
    }

    useEffect(() => {
        //console.log(props.options)
        let _visibleOptions = showAll ? props.options : props.options?.slice(0, maxCountVisibleOptions)
        //console.log(_visibleOptions)
        set_visibleOptions(_visibleOptions)
        //console.log(props.filterName)
        //console.log(props.options)
        //set_visibleOptions(props.options)
        //console.log('updated data')
    }, [props.options, showAll, props.onCheckbox])

    //console.log(visibleOptions)
    return (
        <div className={css.filterGroupWrapper}>
            <span>{props.filterName}</span>

            <div className={css.options}>
                {visibleOptions?.map((option, index) =>
                    <UiInput
                        key={index}
                        type='checkbox'
                        label={<>
                            {option.name}
                            <span className={`${css.count} ${!option.countDefects && '!text-gray-400'}`}>
                                {`(${option.countDefects})`}
                            </span>
                        </>} 
                        value={option.name}
                        onChange={(e) => props.onCheckbox(e, index)}
                        checked={option.isActive}
                        disabled={!option.countDefects}
                    />
                )}
                <div 
                    className={css.otherOptionsTextWithCount}
                    onClick={() => setShowAll(prev => !prev)}
                >
                    {showOtherOptionsTextWithCount()}
                </div>
            </div>      
        </div>
    )
}

export default FilterGroup