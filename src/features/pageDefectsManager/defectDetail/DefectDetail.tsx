import { useSearchParams } from 'react-router-dom';
import css from './DefectDetail.module.css'
import { FaArrowLeftLong } from "react-icons/fa6";
import { TDefect } from '../_t/TDefect';
import { useEffect, useState } from 'react';

type Props = {
  onGoBack: () => void
  defects: TDefect[]
}

const DefectDetail = (props: Props) => {
  const [findedDefect, set_findedDefect] = useState<TDefect>()
  const [searchParams] = useSearchParams()

  useEffect(() => {
    const defectId = searchParams.get('defectId')
    if (!defectId) 
      return
    if (!props.defects.length) 
      return
    
    const _findedDefect = props.defects.find(d => d.defectID == defectId)
    if (!_findedDefect) 
      return
    
    set_findedDefect(_findedDefect)
  })
  
  const d = findedDefect
  return (
    <div className={css.defectDetail}>
      <div className={css.header}>
        <div className={css.title}>
          Nedostatok - podrobnosti
        </div>
        <div 
          className={css.goBack}
          onClick={props.onGoBack}
        >
          <FaArrowLeftLong />
          <span>Späť</span>
        </div>
      </div>

      <div className={css.content}>
        <div>
          <h3>Nedostatok</h3>
          <div>ID: {d && d.defectID}</div>
          <div>Stav: {d && d.defectState}</div>
          <div>Vytvorený: {d && d.createdDTime.toString().replace('T', ', ')}</div>
          <div>Popis: {d && d.description || 'Bez popisu'}</div>
          <div>Pretrvávanie nedostatku: {d && d.isPersistent ? 'Pretrváva' : 'Nepretrváva'}</div>
        </div>

        <div>
          <h3>Typ nedostatku</h3>
          <div>Identifikátor: {d && d.defectType.defectTypeIdentifier}</div>
          <div>Názov: {d && d.defectType.defectTypeName}</div>
          <div>Úroveň závažnosti: {d && d.defectType.defaultSeverityLevel}</div>
        </div>

        <div>
          <h3>Technický objekt</h3>
          <div>ID: {d && d.technicalObject.technicalObjectID}</div>
          <div>Názov: {d && d.technicalObject.technicalObjectName}</div>
          <div>Rok výstavby: {d && d.technicalObject.constructionYear}</div>
          <div>Významný technický objekt: {d && d.technicalObject.isCrucial ? 'Áno' : d && d.technicalObject.isCrucial == null ? 'Bez určenia' : 'Nie'}</div>
          <div>Zodpovedná osoba: {d && d.technicalObject.supervisor}</div>
          <div>Obec: {d && d.technicalObject.municipality}</div>
        </div>

        <div>
          <h3>Typ tech. objektu</h3>
          <div>Identifikátor: {d && d.technicalObject.technicalObjectType?.technicalObjectTypeIdentifier}</div>
          <div>Názov: {d && d.technicalObject.technicalObjectType?.technicalObjectTypeName}</div>
          <div>Úroveň napätia: {d && d.technicalObject.technicalObjectType?.voltageLevel.voltageLevelName}</div>
        </div>
      </div>

      <div className={css.map}>

      </div>
    </div>
  )
}

export default DefectDetail
