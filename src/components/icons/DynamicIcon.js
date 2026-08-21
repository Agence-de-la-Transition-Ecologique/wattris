import React from 'react'
import AirFreshBoldIcon from 'components/icons/AirFreshBoldIcon'
import AirHotBoldIcon from 'components/icons/AirHotBoldIcon'
import ArrowRightIcon from 'components/icons/ArrowRightIcon'
import BikeBoldIcon from 'components/icons/BikeBoldIcon'
import BulbIcon from 'components/icons/BulbIcon'
import CarChargeBoldIcon from 'components/icons/CarChargeBoldIcon'
import ChargeIcon from 'components/icons/ChargeIcon'
import CulteryIcon from 'components/icons/CulteryIcon'
import FlushBoldIcon from 'components/icons/FlushBoldIcon'
import FreezerIcon from 'components/icons/FreezerIcon'
import HairDryerIcon from 'components/icons/HairDryerIcon'
import HomeCleaningBoldIcon from 'components/icons/HomeCleaningBoldIcon'
import IronIcon from 'components/icons/IronIcon'
import KettleIcon from 'components/icons/KettleIcon'
import SleepModeBoldIcon from 'components/icons/SleepModeBoldIcon'
import TvIcon from 'components/icons/TvIcon'
import WasherDryerIcon from 'components/icons/WasherDryerIcon'
import CheckMarkIcon from 'components/icons/CheckMarkIcon'

const iconMap = {
  AirFreshBoldIcon,
  AirHotBoldIcon,
  ArrowRightIcon,
  BikeBoldIcon,
  BulbIcon,
  CarChargeBoldIcon,
  ChargeIcon,
  CulteryIcon,
  FlushBoldIcon,
  FreezerIcon,
  HairDryerIcon,
  HomeCleaningBoldIcon,
  IronIcon,
  KettleIcon,
  SleepModeBoldIcon,
  TvIcon,
  WasherDryerIcon,
  CheckMarkIcon
}

export default function DynamicIcon({ name, ...props }) {
  const Icon = (name && iconMap[name]) || ArrowRightIcon
  return <Icon {...props} />
}
