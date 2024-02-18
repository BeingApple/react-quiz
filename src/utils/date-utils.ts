import moment from "moment"
import { Moment, unitOfTime } from "moment"

type Unit = {
  unit: unitOfTime.Base
  string: string
}

const units: Array<Unit> = [
  {unit: "years", string: "년"},
  {unit: "months", string: "개월"}, 
  {unit: "days", string: "일"}, 
  {unit: "hours", string: "시간"}, 
  {unit: "minutes", string: "분"},
  {unit: "seconds", string: "초"},
]

export const durationToString = (duration: moment.Duration) => {
  let string = ""

  for (const unit of units) {
    const unitTime = duration.get(unit.unit)
    if (unitTime > 0) {
      string += unitTime + unit.string + " "
    }
  }

  return string.trim();
}

export const dateToString = (date?: Moment) => {
  date = (typeof date === 'string' || date instanceof String) ? moment(date) : date

  return date?.format("yyyy-MM-DD HH:mm:ss") ?? ""
}