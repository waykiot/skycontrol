
export class Script {
    id: string;
    name: string;
    code: string;
    parameters: ScriptParam[] = [];
    scheduling: ScriptScheduling;
    permission: number;
    mode: ScriptMode = ScriptMode.SERVER;
    constructor(_id: string) {
        this.id = _id;
    }
}

export class ScriptTest extends Script {
    test = true;
    outputId: string;           // to filter the console output sended from backend script runner

    constructor(_id: string, _name: string) {
        super(_id);
        this.name = _name;
    }
}

export class ScriptParam {
    name: string;
    type: ScriptParamType;
    value: any;

    constructor(_name: string, _type: ScriptParamType) {
        this.name = _name;
        this.type = _type;
    }
}

export enum ScriptParamType {
    tagid = 'tagid',
    value = 'value',
    chart = 'chart'
}

export const SCRIPT_PREFIX = 's_';
export const SCRIPT_PARAMS_MAP = 'params';

export interface ScriptConsoleMessage {
    msg: string;
    type: string;
    id: string;
}

export interface ScriptScheduling {
    mode: ScriptSchedulingMode;
    interval: number;
    schedules: SchedulerData[];
}

export interface SchedulerData {
    date?: Date;
    days?: any[];
    time?: string;
    hour?: number;
    minute?: number;
    type?: SchedulerType;
}

export enum ScriptSchedulingMode {
    interval = 'interval',
    start = 'start',
    scheduling = 'scheduling',
}

export enum SchedulerType {
    weekly = 0,
    date = 1,
}

export class SystemFunctions {
    functions = <SystemFunction[]>[{
        name: '$setTag', text: 'script.sys-fnc-settag-text', tooltip: 'script.sys-fnc-settag-tooltip', params: [true, false]
    },
    {
        name: '$getTag', text: 'script.sys-fnc-gettag-text', tooltip: 'script.sys-fnc-gettag-tooltip', params: [true]
    },
    {
        name: '$getTagId', text: 'script.sys-fnc-getTagId-text', tooltip: 'script.sys-fnc-getTagId-tooltip', params: [false], paramsText: 'script.sys-fnc-getTagId-params'
    },
    {
        name: '$getTagDaqSettings', text: 'script.sys-fnc-getTagDaqSettings-text', tooltip: 'script.sys-fnc-getTagDaqSettings-tooltip', params: [true], paramsText: 'script.sys-fnc-getTagDaqSettings-params'
    },
    {
        name: '$setTagDaqSettings', text: 'script.sys-fnc-setTagDaqSettings-text', tooltip: 'script.sys-fnc-setTagDaqSettings-tooltip', params: [true, false], paramsText: 'script.sys-fnc-setTagDaqSettings-params'
    },
    {
        name: '$setView', text: 'script.sys-fnc-setview-text', tooltip: 'script.sys-fnc-setview-tooltip', params: [false]
    },
    {
        name: '$enableDevice', text: 'script.sys-fnc-enableDevice-text', tooltip: 'script.sys-fnc-enableDevice-tooltip', params: [false, false], paramsText: 'script.sys-fnc-enableDevice-params'
    },
    {
        name: '$invokeObject', text: 'script.sys-fnc-invokeObject-text', tooltip: 'script.sys-fnc-invokeObject-tooltip', params: [false, false, false], paramsText: 'script.sys-fnc-invokeObject-params'
    },
    {
        name: '$runServerScript', text: 'script.sys-fnc-runServerScript-text', tooltip: 'script.sys-fnc-runServerScript-tooltip', params: [false, false], paramsText: 'script.sys-fnc-runServerScript-params'
    }];
}

export class TemplatesCode {
    functions = <SystemFunction[]>[{
        name: 'chart-data', text: 'script.template-chart-data-text', tooltip: 'script.template-chart-data-tooltip',
        code: `if (paramLines && Array.isArray(paramLines)) {
    const count = 10;
    paramLines.forEach(line => {
        var y = [];
        var x = [];
        for (var i = 0; i < count; i++) {
            const randomNumber = Math.floor(Math.random() * 21);
            y.push(randomNumber);
            x.push(i);
        }
        line['y'] = y;
        line['x'] = x;
    });
    return paramLines;
} else {
    return 'Missing chart lines';
}`
    },
    {
        name: 'invoke-chart-update-options', text: 'script.template-invoke-chart-update-options-text', tooltip: 'script.template-invoke-chart-update-options-tooltip',
        code: `let opt = $invokeObject('chart_1', 'getOptions');
if (opt) {
    opt.scaleY1min = 100;
    opt.scaleY1max = 200;
}
$invokeObject('chart_1', 'updateOptions', opt);`
    }];
}

export interface SystemFunction {
    name: string;           // javascript function defined in backend
    text: string;           // button text
    tooltip: string;        // description
    params?: [boolean];     // array of function parameter where true is for tag and false for any (value)
    paramsText?: string;    // to add as parameter description in function
    code?: string;          // Code to paste
}

export enum ScriptMode {
    CLIENT = 'CLIENT',
    SERVER = 'SERVER',
}
