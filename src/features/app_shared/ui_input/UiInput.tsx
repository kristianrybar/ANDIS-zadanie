import css from './UiInput.module.css'

type Props = {
    value: string
    onChange: (e) => void
    // OPTIONAL
    label?: string
    type?: 'text' | 'checkbox'
    placeholder?: string
}

const UiInput = (props: Props) => {
    return (
        <label className={css.uiInputWrapper}>
            {props.label || ''}
            <input
                className={`
                    ${props.type == 'checkbox' && css.checkbox}
                `}
                type={props.type || 'text'}
                value={props.value || ''}
                placeholder={props.placeholder || ''}
                onChange={props.onChange}
            />
        </label>
    )
}

export default UiInput