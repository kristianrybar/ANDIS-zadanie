import { useState } from 'react'
import { IoClose } from 'react-icons/io5'
import { TDefect } from '../_t/TDefect'
import UiModalContainer from '~/app_shared/ui_modalContainer/UiModalContainer'
import UiButton from '~/app_shared/ui_button/UiButton'
import UiInput from '~/app_shared/ui_input/UiInput'
import UiDropdown from '~/app_shared/ui_dropdown/UiDropdown'
import css from './FormInvestmentRequest.module.css'

type Props = {
  onClose: () => void
  onSubmitForm: () => void
  selectedDefects: TDefect[]
}

const FormInvestmentRequest = (props: Props) => {
  const [formData, set_formData] = useState({

  })

  const validateFormData = () => {

  }

  const onSubmit = (e) => {
    e.preventDefault()
    console.log('submit form')
  }

  return (
    <UiModalContainer
      maxHeight='90%'
    >
      <header className={css.header}>
        <h1>Vytvorenie investičnej požiadavky</h1>
        <p>Manage dropdowns and its values</p>
  
        <div
          className={css.iconClose}
          onClick={props.onClose}
        >
          <IoClose />
        </div>
      </header>

      <form
        className={css.formInvestmentRequest}
        onSubmit={onSubmit}
      >
        <div className={css.selectedDefects}>
          selected defects
        </div>
        <div className={css.inputs}>
          <div>
            <UiDropdown
              label='Type investičnej požiadavky'
              value='Velka IP'
              options={['1', '2']}
              onChange={() => {}}
              placeholder='Vybrať...'
            />
            <UiInput
              label='Názov investície'
              value='Cena'
              onChange={(e) => console.log(e)}
            />
          </div>
          <div>
            <UiDropdown
              label='Obec'
              value='Medvedie šarišské'
              options={['Bratislava', 'Pezinok']}
              onChange={() => {}}
              placeholder='Vybrať...'
            />
            <UiInput
              label='Predpokladaný termín realizácie'
              type='date'
              value=''
              onChange={(e) => console.log(e)}
            />
          </div>
          <UiInput
            label='Zdôvodnenie termínu realizácie'
            value='lebo medved moze hocikedy vyskocit a prekvapit nas'
            onChange={(e) => console.log(e)}
          />
          <div>
            <UiDropdown
              label='Kód technického prevedenia'
              value=''
              options={['Bratislava', 'Pezinok']}
              onChange={() => {}}
              placeholder='Vybrať...'
            />
            <UiDropdown
              label='Plánovacia skupina'
              value='tím medvedia labka'
              options={['Bratislava', 'Pezinok']}
              onChange={() => {}}
              placeholder='Vybrať...'
            />
          </div>
          <div>
            <UiDropdown
              label='Dôvod(y) investície - kód'
              value='medved'
              options={['I48', 'I44']}
              onChange={() => {}}
              placeholder='Vybrať...'
            />
            <UiInput
              label='Predpokladané investičné náklady'
              type='number'
              value={0}
              onChange={(e) => console.log(e)}
            />
          </div>

          <UiInput
            label='Dôvod(y) investície - text'
            value='lebo medved beha po dvore'
            onChange={(e) => console.log(e)}
          />
          <UiInput
            label='Navrhované riešenie'
            value='chytit medveda a strčit ho do budy'
            onChange={(e) => console.log(e)}
          />
        </div>

        <footer className={css.footer}>
          <UiButton
            onClick={props.onClose}
          >
            Zrušiť
          </UiButton>
          <UiButton
            type='submit'
          >
            Odoslať
          </UiButton>
        </footer>
      </form>
    </UiModalContainer>
  )
}

export default FormInvestmentRequest