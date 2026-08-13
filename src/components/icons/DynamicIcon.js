import React from 'react'
import AirFreshBoldIcon from 'components/icons/AirFreshBoldIcon'
import AirHotBoldIcon from 'components/icons/AirHotBoldIcon'
import ArrowRightIcon from 'components/icons/ArrowRightIcon'
import BikeBoldIcon from 'components/icons/BikeBoldIcon'
import BulbBoldIcon from 'components/icons/BulbBoldIcon'
import CarChargeBoldIcon from 'components/icons/CarChargeBoldIcon'
import ChargeBoldIcon from 'components/icons/ChargeBoldIcon'
import CulteryBoldIcon from 'components/icons/CulteryBoldIcon'
import FlushBoldIcon from 'components/icons/FlushBoldIcon'
import FreezerBoldIcon from 'components/icons/FreezerBoldIcon'
import HairDryerBoldIcon from 'components/icons/HairDryerBoldIcon'
import HomeCleaningBoldIcon from 'components/icons/HomeCleaningBoldIcon'
import IronBoldIcon from 'components/icons/IronBoldIcon'
import KettleBoldIcon from 'components/icons/KettleBoldIcon'
import SleepModeBoldIcon from 'components/icons/SleepModeBoldIcon'
import TvBoldIcon from 'components/icons/TvBoldIcon'
import WasherDryerBoldIcon from 'components/icons/WasherDryerBoldIcon'
import CheckMarkIcon from 'components/icons/CheckMarkIcon'

const iconMap = {
  AirFreshBoldIcon,
  AirHotBoldIcon,
  ArrowRightIcon,
  BikeBoldIcon,
  BulbBoldIcon,
  CarChargeBoldIcon,
  ChargeBoldIcon,
  CulteryBoldIcon,
  FlushBoldIcon,
  FreezerBoldIcon,
  HairDryerBoldIcon,
  HomeCleaningBoldIcon,
  IronBoldIcon,
  KettleBoldIcon,
  SleepModeBoldIcon,
  TvBoldIcon,
  WasherDryerBoldIcon,
  CheckMarkIcon
}

export default function DynamicIcon({ name, ...props }) {
  const Icon = (name && iconMap[name]) || ArrowRightIcon
  return <Icon {...props} />
}
