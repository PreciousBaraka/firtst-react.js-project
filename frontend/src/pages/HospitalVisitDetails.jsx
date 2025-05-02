import React from 'react'
import { useParams } from 'react-router-dom'

function HospitalVisitDetails() {
    const params = useParams()
    const hospitalVisitId = params.id
    // console.log(params)
    console.log(hospitalVisitId)
  return (
    <div>
      HospitalVisitDetails
    </div>
  )
}

export default HospitalVisitDetails
