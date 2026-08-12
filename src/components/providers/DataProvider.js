import React, { useState } from 'react'
import appliances from 'data/appliances.json'
import initDefaultAppliances from 'data/initDefaultAppliances.json'
import dataCategoryAppliances from 'data/categoryAppliances.json'

const DataContext = React.createContext({})

export function DataProvider(props) {
  const [occurrences, setOccurrences] = useState([])

  const [hover, setHover] = useState(null)
  const [active, setActive] = useState(null)

  const [appliancesListOpen, setAppliancesListOpen] = useState(false)
  const [sortAppliancesByPower, setSortAppliancesByPower] = useState(false)

  const sortedAppliances = sortAppliancesByPower
    ? appliances.sort((a, b) => b.power - a.power)
    : appliances.sort((a, b) => a.name.localeCompare(b.name))

  const defaultOccurrences = Object.entries(initDefaultAppliances).map(([slug, occurrence]) => ({
    slug,
    name: appliances.find((a) => a.slug === slug)?.name ?? slug,
    ...occurrence,
  }))

  const mapOccurrencesListWithNames = (occurrencesList) => {
    return occurrencesList.map((occurrence) => ({
      ...occurrence,
      name: appliances.find((a) => a.slug === occurrence.slug)?.name ?? occurrence.slug,
    }))
  }

  const categoryAppliances = dataCategoryAppliances.map((category) => ({
    ...category,
    items: category.items
      .map((slug) => {
        const appliance = appliances.find((a) => a.slug === slug)
        if (!appliance) return null
        return {
          slug,
          name: appliance.name,
          icon: appliance.icon,
          start: appliance.defaultOccurrence.start,
          duration: appliance.defaultOccurrence.duration,
        }
      })
      .filter(Boolean)
      .sort((a, b) => a.name.localeCompare(b.name)),
  }))

  const addOccurrence = (occurrence) => {
    setOccurrences((prevOccurrences) => [...prevOccurrences, occurrence])
    setActive({ appliance: occurrence.slug, new: true })
  }

  const editOccurrence = ({ occurrenceIndex, newOccurrence }) => {
    setOccurrences((prevOccurrences) =>
      prevOccurrences.map((occurrence, index) =>
        index === occurrenceIndex ? newOccurrence : occurrence
      )
    )
  }

  const deleteOccurrence = ({ occurrenceIndex }) => {
    setOccurrences((prevOccurrences) =>
      prevOccurrences.filter((occurrence, index) => index !== occurrenceIndex)
    )
  }

  const deleteAllOccurrencesOfAppliance = ({ appliance }) => {
    setOccurrences((prevOccurrences) =>
      prevOccurrences.filter((occurrence) => occurrence.slug !== appliance.slug)
    )
  }

  return (
    <DataContext.Provider
      value={{
        appliances,
        categoryAppliances,
        occurrences,
        setOccurrences,
        hover,
        setHover,
        active,
        setActive,
        addOccurrence,
        editOccurrence,
        deleteOccurrence,
        deleteAllOccurrencesOfAppliance,
        appliancesListOpen,
        setAppliancesListOpen,
        sortAppliancesByPower,
        setSortAppliancesByPower,
        sortedAppliances,
        defaultOccurrences,
        mapOccurrencesListWithNames
      }}
    >
      {props.children}
    </DataContext.Provider>
  )
}

export default DataContext