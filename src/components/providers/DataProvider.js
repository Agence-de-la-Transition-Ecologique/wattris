import React, { useState } from 'react'
import appliances from 'data/appliances.json'
import initDefaultAppliances from 'data/initDefaultAppliances.json'
import dataCategoryAppliances from 'data/categoryAppliances.json'

const DataContext = React.createContext({})

export function DataProvider(props) {
  const [occurences, setOccurences] = useState([])

  const [hover, setHover] = useState(null)
  const [active, setActive] = useState(null)

  const [appliancesListOpen, setAppliancesListOpen] = useState(false)
  const [sortAppliancesByPower, setSortAppliancesByPower] = useState(false)

  const sortedAppliances = sortAppliancesByPower
    ? appliances.sort((a, b) => b.power - a.power)
    : appliances.sort((a, b) => a.name.localeCompare(b.name))

  const defaultOccurences = Object.entries(initDefaultAppliances).map(([slug, occurrence]) => ({
    slug,
    name: appliances.find((a) => a.slug === slug)?.name ?? slug,
    ...occurrence,
  }))

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
          start: appliance.defaultOccurence.start,
          duration: appliance.defaultOccurence.duration,
        }
      })
      .filter(Boolean)
      .sort((a, b) => a.name.localeCompare(b.name)),
  }))

  const addOccurence = (occurence) => {
    setOccurences((prevOccurences) => [...prevOccurences, occurence])
    setActive({ appliance: occurence.slug, new: true })
  }

  const editOccurence = ({ occurenceIndex, newOccurence }) => {
    setOccurences((prevOccurences) =>
      prevOccurences.map((occurence, index) =>
        index === occurenceIndex ? newOccurence : occurence
      )
    )
  }

  const deleteOccurence = ({ occurenceIndex }) => {
    setOccurences((prevOccurences) =>
      prevOccurences.filter((occurence, index) => index !== occurenceIndex)
    )
  }

  const deleteAllOccurencesOfAppliance = ({ appliance }) => {
    setOccurences((prevOccurences) =>
      prevOccurences.filter((occurence) => occurence.slug !== appliance.slug)
    )
  }

  return (
    <DataContext.Provider
      value={{
        appliances,
        categoryAppliances,
        occurences,
        setOccurences,
        hover,
        setHover,
        active,
        setActive,
        addOccurence,
        editOccurence,
        deleteOccurence,
        deleteAllOccurencesOfAppliance,
        appliancesListOpen,
        setAppliancesListOpen,
        sortAppliancesByPower,
        setSortAppliancesByPower,
        sortedAppliances,
        defaultOccurences,
      }}
    >
      {props.children}
    </DataContext.Provider>
  )
}

export default DataContext