export interface MultiModal {
    id?: string,
    name: string
    description: string
    value?: string
    type:  'string' | 'select' | 'number' | 'switch' | 'checkbox' | '' | 'autocomplete' | 'Date' | 'DateTime'
    required: boolean
    mask?: string
    select?: Array<Select>
    switch?: Switch
    options?: Array<Autocomplete>
    picker?: Picker,
    execute?: Function,
    dependency?: Object
    disabled?: Boolean,
    selection?: any 
}

interface Picker {
    inputFormat? : string,
    legend      : string,
    openTo      : 'day' | 'month' | 'year',
    views       : ['day'] | ['month'] | ['year'] | Array<string>
}
interface Select {
    id: string,
    description: string,
    name: string,
    __typename?: any
    label?: string,
}

interface Autocomplete {
    id: string,
    label: string,
    property: string,
    position?: number
}
interface Switch {
    id: string,
    title: string,
    positive: string,
    negative: string
}