import { durationToString } from "@/utils/date-utils"
import moment from "moment"
import { Moment } from "moment"
import { useEffect, useState } from "react"

type Props = {
  startAt: Moment | null
  endAt: Moment | null
}

export default function useDurationTimeString({startAt, endAt}: Props) {
  const [timeString, setTimeString] = useState('')

  useEffect(() => {
    if (startAt && endAt) {
      const duration = moment.duration(endAt.diff(startAt))
      setTimeString(durationToString(duration))
    }
  }, [startAt, endAt])

  return timeString
}