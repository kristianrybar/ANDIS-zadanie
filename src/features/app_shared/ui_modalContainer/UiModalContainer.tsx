import css from './UiModalContainer.module.css'

type Props = {
    children: any
    maxHeight?: string
    minHeight?: string
    height?: string
    maxWidth?: string
}

const UiModalContainer = (props: Props) => {
    return (
        <div className={css.backdrop} >
            <div 
                className={css.modal_container}
                style={{
                    maxHeight: props.maxHeight || '',
                    minHeight: props.minHeight || '',
                    maxWidth: props.maxWidth || '',
                    height: props.height || '',
                }}
            >
                {props.children}
            </div>
        </div>
    )
}

export default UiModalContainer