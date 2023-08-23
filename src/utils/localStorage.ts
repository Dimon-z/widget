import { Ref } from "vue"

function lsGet(key: string): unknown {
    return JSON.parse(localStorage.getItem(key))
}

function lsSet(key: string, data: unknown): void {
    data = JSON.stringify(data)
    if (typeof (data) === 'string') {
        localStorage.setItem(key, data)
        return
    }
    throw new Error('Local Storage Error')
}



function lsListeningToUpdates(reactiveItemToUpdate: Ref<unknown>, listeningKey: string) {
    const listener = (event: StorageEvent) => {
        if (!(event.storageArea === localStorage && event.key === listeningKey)) {
            return
        }
        reactiveItemToUpdate.value = lsGet(listeningKey)
    }
    window.addEventListener('storage', listener)
}

function lsIsExist(key: string): boolean {
    if (localStorage[key]) {
        return true
    }
    return false
}

export { lsGet, lsSet, lsListeningToUpdates, lsIsExist }