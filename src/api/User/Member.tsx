import { fetcher } from "../Fetcher";
import http, { Http } from "../Http";


export interface IMember {
    fullname: string
}

const path = {
    member: '/member'
}


function getMember(): Promise<{ data: { member: IMember } }> {
    return fetcher({
        url: path.member,
        method: "get"
    })
}

export default {
    getMember
}
