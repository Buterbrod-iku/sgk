import {makeAutoObservable} from "mobx";

class PageStore {
    res = ""

    constructor(store) {
        makeAutoObservable(this)
    }

    setRes(store) {
        this.res = store.res
    }


    onChange (event, setFun) {
        setFun(event.target.value)
        this.res = event.target.value
    }
}

export default PageStore;