import Dropdown, { Option } from 'react-dropdown'
import { TiDelete } from "react-icons/ti";
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'
import css from './UiDropdown.module.css'
import './ReactDropdownOverrides.css'

type Props = {
    value: Option | string
    options: string[]
    onChange: (option: Option) => void
    // OPTIONAL
    label?: string
    placeholder?: string
    hint?: string
    invalid?: boolean
    showIcon?: boolean
    disabled?: boolean
    onFocus?: (event) => void
    onClearOption?: () => any
    width?: string
}


const UiDropdown = (props: Props) => {
    return (
        <div 
            className={`
                ${css.wrapper}
                ${props.disabled && css.disabled}
            `}
            style={{ 
                width: props.width || '100%'
            }}
        >
            <label className={css.inputLabel}>{props.label}</label>
            <Dropdown
                className={css.dropdown}
                controlClassName={`${css.control} ${props.invalid && css.invalid}`}
                menuClassName={`${css.menu}`}
                options={props.options}
                //onFocus={props.onFocus}
                onChange={(option: Option) => props.onChange(option)}
                value={props.value || ''}
                placeholder={props.placeholder || 'Zoradiť...'}
                arrowClosed={<IoIosArrowDown />}
                arrowOpen={<IoIosArrowUp />}
                disabled={props.disabled || false}
                
            />
            {props.showIcon && props.value &&
                <TiDelete
                    className={css.actionIcon}
                    onClick={props.onClearOption}
                />
            }
            {props.hint &&
                <p className={css.hint}>{props.hint}</p>
            }
        </div>
    )
}

export default UiDropdown