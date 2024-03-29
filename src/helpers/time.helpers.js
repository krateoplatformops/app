import moment from 'moment'
import { uiConstants } from '../constants/ui.constants'

const currentTime = () => {
  return moment().utc().unix()
}

const nanoToFormat = (input) => {
  if (input === '' || !input) return null
  const seconds = parseInt(input / 1_000_000_000.0)
  return moment.unix(seconds).format(uiConstants.dateTimeSecFormat)
}

const nanoFromNow = (input) => {
  if (input === '' || !input) return null
  const seconds = parseInt(input / 1_000_000_000.0)
  return moment.unix(seconds).fromNow()
}

const dateGenToFormat = (date) => {
  return moment(date).format(uiConstants.dateTimeSecFormat)
}

const dateToFormat = (date) => {
  return moment.unix(date).format(uiConstants.dateTimeSecFormat)
}

const dateToDayFormat = (date) => {
  return moment.unix(date).format(uiConstants.timeToDateInput)
}

const duration = (duration) => {
  const hh = Math.floor(duration / 3600)
  const mm = Math.floor(duration / 60)
  const ss = duration % 60
  let res = ''
  if (hh > 0) res += `${hh}h`
  if (mm > 0) {
    if (res !== '') res += ', '
    res += `${mm}m`
  }
  if (ss > 0) {
    if (res !== '') res += ', '
    res += `${ss}s`
  }
  if (res === '') res = '0s'

  return res
}

const daysAgo = (days) => {
  return moment()
    .utc()
    .add(days * -1, 'days')
    .startOf('day')
    .unix()
}

const dateToTimeStartDay = (input) => {
  if (input === '') return null
  const mOffset = moment().utcOffset()
  return moment(input, 'YYYY-MM-DD')
    .utc()
    .add(mOffset, 'minutes')
    .startOf('day')
    .unix()
}

const dateToTimeEndDay = (input) => {
  if (input === '') return null
  const mOffset = moment().utcOffset()
  return moment(input, 'YYYY-MM-DD')
    .utc()
    .add(mOffset, 'minutes')
    .endOf('day')
    .unix()
}

const setInputDate = (input) => {
  return moment.unix(input).format(uiConstants.timeToDateInput)
}

const dateToEpochStartDay = (input) => {
  if (input === '') return null
  return moment(input).utc().startOf('day').unix()
}

const dateToEpochEndDay = (input) => {
  if (input === '') return null
  return moment(input).utc().endOf('day').unix()
}

const fromNow = (input) => {
  if (input === '' || !input) return null
  return moment.unix(input).fromNow()
}

const fromNowGen = (input) => {
  if (input === '' || !input) return null
  return moment(input).fromNow()
}

export const timeHelper = {
  currentTime,
  dateToFormat,
  duration,
  daysAgo,
  dateToTimeStartDay,
  dateToTimeEndDay,
  setInputDate,
  dateToEpochStartDay,
  dateToEpochEndDay,
  fromNow,
  dateGenToFormat,
  fromNowGen,
  dateToDayFormat,
  nanoToFormat,
  nanoFromNow
}
