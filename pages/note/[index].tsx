import NoteDetail from "@/components/domain/note"
import { useRouter } from "next/router"
import { ParsedUrlQuery } from "querystring"
import { useState } from "react"

interface NoteDetailQuery extends ParsedUrlQuery {
  index?: string
}

export default function NoteDetailPage() {
  const router = useRouter()
  const query = router.query as NoteDetailQuery
  const [index, ] = useState<number>(parseInt(query.index ?? '0'))

  return <NoteDetail index={index} />
}

