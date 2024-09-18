import css from './UiInput.module.css'

type Props = {
    value: string | number
    onChange: (e) => void
    // OPTIONAL
    label?: any
    type?: 'text' | 'checkbox' | 'date' | 'number'
    placeholder?: string
    checked?: boolean
    disabled?: boolean
    // CSS
    wrapperClassName?: string
    width?: string
}

const UiInput = (props: Props) => {
    return (
        <label 
            className={`
                ${css.uiInputWrapper}
                ${props.wrapperClassName}
                ${props.type == 'checkbox' && css.uiCheckboxWrapper}
                ${props.disabled && css.disabled}
            `}
            style={{ 
                width: props.width || '100%'
            }}
        >
            {props.label || ''}
            <input
                className={`
                    ${props.type == 'checkbox' && css.checkbox}
                `}
                type={props.type || 'text'}
                value={props.value || ''}
                placeholder={props.placeholder || 'Vyhľadať...'}
                onChange={props.onChange}
                checked={props.checked || false}
                disabled={props.disabled || false}
            />
        </label>
    )
}

export default UiInput