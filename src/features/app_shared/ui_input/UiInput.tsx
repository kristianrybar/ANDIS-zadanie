import css from './UiInput.module.css'

type Props = {
    value: string
    onChange: (e) => void
    // OPTIONAL
    label?: any
    type?: 'text' | 'checkbox'
    placeholder?: string
    checked?: boolean
    disabled?: boolean
}

const UiInput = (props: Props) => {
    return (
        <label 
            className={`
                ${css.uiInputWrapper}
                ${props.type == 'checkbox' && css.uiCheckboxWrapper}
                ${props.disabled && css.disabled}
            `}
        >
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
            {props.label || ''}
        </label>
    )
}

export default UiInput