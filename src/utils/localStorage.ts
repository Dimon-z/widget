import { Ref } from "vue"


function lsGet<T>(key: string): T {
    return JSON.parse(localStorage.getItem(key))
}

function lsSet<T>(key: string, data: T): void {
    const jsonString = JSON.stringify(data)
    if (typeof (jsonString) === 'string') {
        localStorage.setItem(key, jsonString)
        return
    }
    throw new Error('Local Storage Error')
}



function lsListeningToUpdates<T>(reactiveItemToUpdate: Ref<T>, listeningKey: string) {
    const listener = (event: StorageEvent) => {
        if (!(event.storageArea === localStorage && event.key === listeningKey)) {
            return
        }
        reactiveItemToUpdate.value = lsGet<T>(listeningKey)
    }
    window.addEventListener('storage', listener)
    return window.removeEventListener('storage', listener)
}



function lsIsExist<T>(key: string): boolean {
    if (localStorage[key] && (lsGet<T>(key))) {
        return true
    }
    return false
}


export { lsGet, lsSet, lsListeningToUpdates, lsIsExist }