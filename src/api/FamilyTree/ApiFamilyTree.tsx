import { fetcher } from "../Fetcher";
import http, { Http } from "../Http";
import httpImg from "../HttpImg";


export interface IFamilyTree {
    id: number,
    title: string,
    address: string,
    creatAt: string,
    updateAt: string,
    creator: string,
    dynamicLink: string,
    published: string
}

export interface MainMember {
    id: number,
    fullName: string,
    dealDate: string,
    birthday: string,
    sex: number,
    generation: number,
    phone: string,
    maritalStatus: string,
    job: string,
    education: string,
    email: string,
    childPosition: number,
    photoURL: string,
    address: string,
    longevity: number,
}

export interface IMemeberGen {
    mainMember: MainMember,
    mateMember: MainMember,
    soons: MainMember[]
}

const path = {
    familyTree: '/familyTree/gets'
}

function getFamilyTree(idUser?: number) {
    console.log(idUser)
    return http.get<IFamilyTree[]>(`/familyTree/gets?idUser=${idUser}`)
}

function getMemeberbyGen(
    idTree: number,
    gen: number
) {
    return http.get<IMemeberGen[]>(`/familyTree/getTree?idTree=${idTree}&gen=${gen}`)
}

function getMaxGen(
    idTree: number
) {
    return http.get(`/familyTree/getGenTree?idTree=${idTree}`)
}

function addSon(data: {
    idMember: number,
    body: any
}) {
    return http.post(`/member/create/soon?idMember=${data.idMember}`, data.body)
}

function addMate(
    data: {
        idMember: number,
        body: any
    }
) {
    return http.post(`/member/create/mate?idMember=${data.idMember}`, data.body)
}

function updateMember(body: any) {
    console.log("body", body)

    return http.put('/member/update', body)
}

function addImage(body: any) {
    return httpImg.post<any>(`/image/addImage`, body)
}

function createAlbum(data: { idTree: number, name: string }) {
    console.log(data)
    return http.post<any>(`/image/album/create?idTree=${data.idTree}`, data.name)
}

function getAlbum(idTree: number) {
    return http.get<any>(`/image/album/gets?idTree=${idTree}`)
}

function addImageAlbum(data: { idAlbum: number, body: any }) {
    return http.post<any>(`/image/image/create?idAlbum=${data.idAlbum}`, data.body)
}
function getImageAlbum(idAlbum: number) {
    return http.get<any>(`/image/image/gets?idAlbum=${idAlbum}`)
}

export default {
    getFamilyTree,
    getMemeberbyGen,
    getMaxGen,
    addSon,
    addMate,
    updateMember,
    addImage,
    createAlbum,
    getAlbum,
    addImageAlbum,
    getImageAlbum
}
