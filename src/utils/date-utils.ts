import { unitOfTime } from "moment"

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

  console.log(duration)
  for (const unit of units) {
    const unitTime = duration.get(unit.unit)
    if (unitTime > 0) {
      string += unitTime + unit.string + " "
    }
  }

  return string.trim();
}