import { useParams } from "react-router-dom"


export default function MatchOverview() {
    const { id } = useParams()
    console.log(id)
    return(
        <div>hi</div>
    )
}