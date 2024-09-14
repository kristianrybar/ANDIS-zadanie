import { ReactNode } from 'react'
import css from './UiButton.module.css'


type Props = {
    type?: 'button' | 'submit'
    children: string | string[] | ReactNode
    disabled?: boolean
    onClick: (...args: any[]) => any
    className?: string
}

const UiButton = (props: Props) => {
    return (
        <button
            type={props.type || 'button'}
            className={`
                ${css.uiButton}
                ${css.skin_default}
            `}
            onClick={props.onClick}
            disabled={props.disabled || false}
        >
            {props.children || 'Click me'}
        </button>
    )
}

export default UiButton