import css from './UiInput.module.css'

type Props = {
    value: string
    onChange: (e) => void
    // OPTIONAL
    label?: string
    type?: 'text' | 'checkbox'
    placeholder?: string
    checked?: boolean
}

const UiInput = (props: Props) => {
    return (
        <label 
            className={`
                ${css.uiInputWrapper}
                ${props.type == 'checkbox' && css.uiCheckboxWrapper}
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
                checked={props.checked}
            />
            {props.label || ''}
        </label>
    )
}

export default UiInput