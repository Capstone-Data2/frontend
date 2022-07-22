import { loadMap }from "../../common/images";

export default function VisionWardMap({ obs, sen }) {
    return(
        <img src={loadMap()} alt="" style={{ borderRadius: 2 }} />
    )
}