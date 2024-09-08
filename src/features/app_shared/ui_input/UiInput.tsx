import css from './UiInput.module.css'

type Props = {
    label?: string
    type?: 'text' | 'checkbox'
    value: string
    placeholder?: string
    onChange: (e) => void
}

const UiInput = (props: Props) => {
    return (
        <label className={css.uiInputWrapper}>
            {props.label || ''}
            <input 
                type={props.type || 'text'}
                value={props.value || ''}
                placeholder={props.placeholder || ''}
                onChange={props.onChange}
            />
        </label>
    )
}

export default UiInput