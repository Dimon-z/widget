function get(key: string) {
    localStorage.getItem(key)
}

function set(key: string, data: unknown): void {
    data = JSON.stringify(data)
    if (typeof (data) === 'string') {
        localStorage.setItem(key, data)
        return
    }
    throw new Error('Local Storage Error')
}

export { get, set }