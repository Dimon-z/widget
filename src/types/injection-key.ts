import { InjectionKey, Ref } from 'vue';
import { Cities } from './City';



export const CityKey: InjectionKey<{
    locations: Ref<Cities>,
    addCity: Function,
    deleteCity: Function,
}> = Symbol();